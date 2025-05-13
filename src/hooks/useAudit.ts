
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

type UserSubscription = Database['public']['Tables']['user_subscriptions']['Row'] & {
  plans: Database['public']['Tables']['plans']['Row']
};

export const useAudit = (subscription: UserSubscription | null) => {
  const navigate = useNavigate();

  const handleStartAudit = () => {
    if (!subscription) {
      toast.error('No active subscription found. Please refresh or contact support.');
      return;
    }
    
    if (subscription.audits_remaining <= 0) {
      toast.error('You have no audits remaining in your current plan');
      navigate('/dashboard');
      return;
    }
    
    navigate('/audit');
  };

  return { handleStartAudit };
};
