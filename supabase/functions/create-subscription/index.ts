
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.14.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing environment variables');
    }
    
    // Create Supabase client with service role key (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Parse request body
    const { userId, planId, auditsRemaining } = await req.json();
    
    if (!userId || !planId) {
      throw new Error('Missing required fields');
    }
    
    console.log(`Creating subscription for user ${userId} with plan ${planId} and ${auditsRemaining} audits`);
    
    // First check if user already has an active subscription
    const { data: existingSubscription, error: checkError } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('active', true)
      .limit(1);
    
    if (checkError) {
      console.error('Error checking existing subscription:', checkError);
      throw checkError;
    }
    
    if (existingSubscription && existingSubscription.length > 0) {
      console.log('User already has an active subscription:', existingSubscription[0]);
      return new Response(
        JSON.stringify({ success: true, data: existingSubscription[0] }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200
        }
      );
    }
    
    // Create subscription with service role key (bypasses RLS)
    const { data, error } = await supabase
      .from('user_subscriptions')
      .insert({
        user_id: userId,
        plan_id: planId,
        audits_remaining: auditsRemaining || 1,
        active: true
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
    
    console.log('Successfully created subscription:', data);
    
    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );
    
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400
      }
    );
  }
});
