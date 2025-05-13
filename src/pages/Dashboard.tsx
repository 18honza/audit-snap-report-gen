
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import AuditHistory from '@/components/dashboard/AuditHistory';

type UserSubscription = Database['public']['Tables']['user_subscriptions']['Row'] & {
  plans: Database['public']['Tables']['plans']['Row']
};

const Dashboard = () => {
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

  const handleStartAudit = () => {
    if (!subscription || subscription.audits_remaining <= 0) {
      toast.error('You have no audits remaining in your current plan');
      return;
    }
    
    navigate('/audit');
  };

  // Fix for the type error: Create a button click handler that doesn't require parameters
  const handleCreateFreeSubscription = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await createFreeSubscription(session.user.id);
    } else {
      toast.error('You need to be logged in to create a subscription');
      navigate('/login');
    }
  };

  return (
    <Layout>
      <div className="container px-4 mx-auto py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your website audits and subscription</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your current subscription details</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-24 flex items-center justify-center">
                    <div className="animate-pulse text-muted-foreground">Loading subscription...</div>
                  </div>
                ) : subscription ? (
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold">{subscription.plans?.name} Plan</h3>
                        <p className="text-muted-foreground">{subscription.plans?.description}</p>
                      </div>
                      <div className="bg-primary/10 text-primary rounded-lg p-3 text-center">
                        <span className="block text-2xl font-bold">{subscription.audits_remaining}</span>
                        <span className="text-sm">Audits Remaining</span>
                      </div>
                    </div>
                    
                    {subscription.plans?.features && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Plan Features</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {JSON.parse(subscription.plans.features as string).map((feature: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <Button onClick={handleStartAudit} disabled={subscription.audits_remaining <= 0}>
                        {subscription.audits_remaining > 0 ? 'Start New Audit' : 'Upgrade Plan'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <h3 className="text-lg font-medium mb-2">No active subscription found</h3>
                    <p className="text-muted-foreground mb-4">You don't have an active subscription yet</p>
                    <Button onClick={handleCreateFreeSubscription}>Get Started with Free Plan</Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Audit History</CardTitle>
                <CardDescription>View and manage your website audit reports</CardDescription>
              </CardHeader>
              <CardContent>
                <AuditHistory />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
