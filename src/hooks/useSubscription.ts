
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type UserSubscription = Database['public']['Tables']['user_subscriptions']['Row'] & {
  plans: Database['public']['Tables']['plans']['Row']
};

export const useSubscription = () => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      setUserId(session.user.id);
      fetchUserData(session.user.id);
    };
    
    checkAuth();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    try {
      setLoading(true);
      console.log("Fetching subscription for user:", userId);
      
      // Get user subscription with plan details
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          plans (*)
        `)
        .eq('user_id', userId)
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
        
      if (subscriptionError) {
        console.error('Error fetching subscription:', subscriptionError);
        toast({
          variant: "destructive",
          title: "Subscription error",
          description: "We couldn't verify your subscription. Please try again."
        });
      }
      
      console.log("Found subscription data:", subscriptionData);
      
      if (subscriptionData) {
        setSubscription(subscriptionData as UserSubscription);
      } else {
        console.log("No active subscription found, creating free plan...");
        // Auto-assign free plan for new users with direct SQL for bypassing RLS
        await createFreeSubscriptionWithServiceRole(userId);
      }
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your subscription information."
      });
    } finally {
      setLoading(false);
    }
  };

  const createFreeSubscriptionWithServiceRole = async (userId: string) => {
    try {
      // Get the Starter plan
      const { data: planData, error: planError } = await supabase
        .from('plans')
        .select('*')
        .eq('name', 'Starter')
        .single();
        
      if (planError) {
        console.error('Error fetching starter plan:', planError);
        toast({
          variant: "destructive",
          title: "Plan error",
          description: "Couldn't load the starter plan. Please try again."
        });
        return;
      }
      
      console.log("Creating free subscription with plan:", planData);
      
      // Use Edge Function to bypass RLS for subscription creation
      const { error: functionError } = await supabase.functions.invoke('create-subscription', {
        body: {
          userId: userId,
          planId: planData.id,
          auditsRemaining: planData.audits_allowed
        }
      });
      
      if (functionError) {
        console.error('Error calling create-subscription function:', functionError);
        toast({
          variant: "destructive",
          title: "Subscription error",
          description: "Couldn't create your free subscription. Please try again."
        });
        return;
      }
      
      // After successful creation, fetch the new subscription
      await fetchUserData(userId);
      
      toast({
        title: "Welcome!",
        description: "Your free subscription has been activated."
      });
      
    } catch (error) {
      console.error('Error creating free subscription:', error);
      toast({
        variant: "destructive", 
        title: "Error",
        description: "Failed to create your free subscription. Please try again."
      });
    }
  };

  const handleCreateFreeSubscription = async () => {
    if (!userId) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await createFreeSubscriptionWithServiceRole(session.user.id);
      } else {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "You need to be logged in to create a subscription"
        });
        navigate('/login');
      }
    } else {
      await createFreeSubscriptionWithServiceRole(userId);
    }
  };

  const refreshSubscription = async () => {
    if (userId) {
      await fetchUserData(userId);
    }
  };

  return {
    loading,
    subscription,
    userId,
    createFreeSubscription: createFreeSubscriptionWithServiceRole,
    handleCreateFreeSubscription,
    fetchUserData: refreshSubscription
  };
};
