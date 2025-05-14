
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Database } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';

type UserSubscription = Database['public']['Tables']['user_subscriptions']['Row'] & {
  plans?: Database['public']['Tables']['plans']['Row']
};

export const useAudit = (subscription: UserSubscription | null) => {
  const navigate = useNavigate();

  const handleStartAudit = async () => {
    // First, check if the user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You need to be logged in to start an audit."
      });
      navigate('/login');
      return;
    }
    
    if (!subscription) {
      toast({
        variant: "destructive",
        title: "No subscription found",
        description: "Please refresh or contact support if this persists."
      });
      return;
    }
    
    if (subscription.audits_remaining <= 0) {
      toast({
        variant: "destructive",
        title: "No audits remaining",
        description: "You have no audits remaining in your current plan."
      });
      return;
    }
    
    navigate('/audit');
  };

  return { handleStartAudit };
};
