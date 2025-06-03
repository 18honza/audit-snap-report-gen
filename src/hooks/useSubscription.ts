
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
    let isMounted = true;

    const checkAuthAndFetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          if (isMounted) {
            setLoading(false);
            setUserId(null);
            setSubscription(null);
          }
          return;
        }

        if (isMounted) {
          setUserId(session.user.id);
          await fetchUserSubscription(session.user.id);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change event:", event);
        
        if (event === 'SIGNED_OUT') {
          if (isMounted) {
            setSubscription(null);
            setUserId(null);
            setLoading(false);
          }
        } else if (session?.user.id && isMounted) {
          setUserId(session.user.id);
          await fetchUserSubscription(session.user.id);
        } else if (isMounted) {
          setLoading(false);
        }
      }
    );
    
    // Initial auth check
    checkAuthAndFetchData();
    
    return () => {
      isMounted = false;
      authSubscription.unsubscribe();
    };
  }, []);

  const fetchUserSubscription = async (userId: string) => {
    try {
      setLoading(true);
      console.log("Fetching subscription for user:", userId);
      
      // Get user subscription with plan details - simplified query
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
        setLoading(false);
        return;
      }
      
      console.log("Found subscription data:", subscriptionData);
      
      if (subscriptionData) {
        setSubscription(subscriptionData as UserSubscription);
      }
      
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const createFreeSubscription = async (userId: string) => {
    try {
      console.log("Creating free subscription for user:", userId);
      setLoading(true);
      
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
        setLoading(false);
        return;
      }
      
      console.log("Creating free subscription with plan:", planData);
      
      // Use Edge Function to create subscription
      const { data, error: functionError } = await supabase.functions.invoke('create-subscription', {
        body: {
          userId: userId,
          planId: planData.id,
          auditsRemaining: planData.audits_allowed
        }
      });
      
      if (functionError) {
        console.error('Error calling create-subscription function:', functionError);
        setLoading(false);
        return;
      }
      
      console.log("Successfully created subscription:", data);
      
      // Show success toast only once
      toast({
        title: "Welcome!",
        description: "Your free subscription has been activated."
      });
      
      // Refresh subscription data after successful creation
      await fetchUserSubscription(userId);
      
    } catch (error) {
      console.error('Error creating free subscription:', error);
      setLoading(false);
    }
  };

  const handleCreateFreeSubscription = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You need to be logged in to create a subscription"
      });
      navigate('/login');
      return;
    }
    
    await createFreeSubscription(session.user.id);
  };

  const refreshSubscription = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await fetchUserSubscription(session.user.id);
    }
  };

  return {
    loading,
    subscription,
    userId,
    handleCreateFreeSubscription,
    fetchUserData: refreshSubscription
  };
};
