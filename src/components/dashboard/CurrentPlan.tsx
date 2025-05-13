
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type UserSubscription = Database['public']['Tables']['user_subscriptions']['Row'] & {
  plans: Database['public']['Tables']['plans']['Row']
};

interface CurrentPlanProps {
  loading: boolean;
  subscription: UserSubscription | null;
  onStartAudit: () => void;
  onCreateFreeSubscription: () => void;
}

const CurrentPlan: React.FC<CurrentPlanProps> = ({ 
  loading, 
  subscription, 
  onStartAudit, 
  onCreateFreeSubscription 
}) => {
  return (
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
              <Button onClick={onStartAudit} disabled={subscription.audits_remaining <= 0}>
                {subscription.audits_remaining > 0 ? 'Start New Audit' : 'Upgrade Plan'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <h3 className="text-lg font-medium mb-2">No active subscription found</h3>
            <p className="text-muted-foreground mb-4">You don't have an active subscription yet</p>
            <Button onClick={onCreateFreeSubscription}>Get Started with Free Plan</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentPlan;
