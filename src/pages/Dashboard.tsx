
import React from 'react';
import Layout from '@/components/layout/Layout';
import CurrentPlan from '@/components/dashboard/CurrentPlan';
import AuditHistory from '@/components/dashboard/AuditHistory';
import { useSubscription } from '@/hooks/useSubscription';
import { useAudit } from '@/hooks/useAudit';

const Dashboard = () => {
  const { loading, subscription, handleCreateFreeSubscription } = useSubscription();
  const { handleStartAudit } = useAudit(subscription);

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
              onCreateFreeSubscription={handleCreateFreeSubscription}
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
