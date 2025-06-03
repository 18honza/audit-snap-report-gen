
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import CurrentPlan from '@/components/dashboard/CurrentPlan';
import AuditHistory from '@/components/dashboard/AuditHistory';
import { useSubscription } from '@/hooks/useSubscription';
import { useAudit } from '@/hooks/useAudit';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { loading, subscription, handleCreateFreeSubscription } = useSubscription();
  const { handleStartAudit } = useAudit(subscription);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Authentication Required",
            description: "Please log in to view your dashboard."
          });
          navigate('/login');
          return;
        }

        if (isMounted) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        if (isMounted) {
          setIsLoggedIn(false);
          navigate('/login');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    // Set up auth state listener
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Dashboard auth state change:", event);
        
        if (!session && event === 'SIGNED_OUT') {
          navigate('/login');
        } else if (session && isMounted) {
          setIsLoggedIn(true);
          setIsLoading(false);
        }
      }
    );
    
    checkAuth();
    
    return () => {
      isMounted = false;
      authSubscription.unsubscribe();
    };
  }, [navigate]);

  const handleCreateSubscription = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to create a subscription."
      });
      navigate('/login');
      return;
    }
    
    await handleCreateFreeSubscription();
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container px-4 mx-auto py-16 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 mx-auto py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your website audits and subscription</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <CurrentPlan 
              loading={loading} 
              subscription={subscription}
              onStartAudit={handleStartAudit}
              onCreateFreeSubscription={handleCreateSubscription}
              isLoggedIn={isLoggedIn}
            />
            
            <div className="md:col-span-3">
              <AuditHistory />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
