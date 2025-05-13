
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type UserSubscription = Database['public']['Tables']['user_subscriptions']['Row'] & {
  plans: Database['public']['Tables']['plans']['Row']
};

export const useSubscription = () => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      fetchUserData(session.user.id);
    };
    
    checkAuth();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    try {
      setLoading(true);
      
      // Get user subscription with plan details using the direct user ID
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
        throw subscriptionError;
      }
      
      console.log("Found subscription data:", subscriptionData);
      setSubscription(subscriptionData as UserSubscription);
      
      if (!subscriptionData) {
        // Auto-assign free plan for new users
        await createFreeSubscription(userId);
      }
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load your account information');
    } finally {
      setLoading(false);
    }
  };

  const createFreeSubscription = async (userId: string) => {
    try {
      // Get the Starter plan
      const { data: planData, error: planError } = await supabase
        .from('plans')
        .select('*')
        .eq('name', 'Starter')
        .single();
        
      if (planError) {
        throw planError;
      }
      
      // Create a subscription for the user with explicit user ID
      const { error: subscriptionError } = await supabase
        .from('user_subscriptions')
        .insert({
          user_id: userId,
          plan_id: planData.id,
          audits_remaining: planData.audits_allowed,
          active: true
        });
        
      if (subscriptionError) {
        throw subscriptionError;
      }
      
      // Refresh user data
      fetchUserData(userId);
      
    } catch (error) {
      console.error('Error creating free subscription:', error);
      toast.error('Failed to create your free subscription');
    }
  };

  const handleCreateFreeSubscription = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await createFreeSubscription(session.user.id);
    } else {
      toast.error('You need to be logged in to create a subscription');
      navigate('/login');
    }
  };

  return {
    loading,
    subscription,
    createFreeSubscription,
    handleCreateFreeSubscription,
    fetchUserData
  };
};
