
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

type UserSubscription = Database['public']['Tables']['user_subscriptions']['Row'] & {
  plans: Database['public']['Tables']['plans']['Row']
};

export const useAudit = (subscription: UserSubscription | null) => {
  const navigate = useNavigate();

  const handleStartAudit = () => {
    if (!subscription || subscription.audits_remaining <= 0) {
      toast.error('You have no audits remaining in your current plan');
      return;
    }
    
    navigate('/audit');
  };

  return { handleStartAudit };
};
