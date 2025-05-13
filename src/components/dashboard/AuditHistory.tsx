
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type AuditReport = Database['public']['Tables']['audit_reports']['Row'];

const AuditHistory = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<AuditReport[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      
      // Get current user's ID
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Handle not logged in state
        toast.error('You need to be logged in to view audit history');
        navigate('/login');
        return;
      }
      
      const { data, error } = await supabase
        .from('audit_reports')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching audit reports:', error);
      toast.error('Failed to load audit history');
    } finally {
      setLoading(false);
    }
  };

  const handleViewReport = (reportId: string) => {
    navigate(`/results?report=${reportId}`);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-500">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge className="bg-blue-500">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="h-24 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading audit history...</div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-1">No audit reports yet</h3>
        <p className="text-muted-foreground mb-4">Run your first website audit to see results here</p>
        <Button asChild>
          <a href="/audit">Start Your First Audit</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Website</th>
            <th className="text-left py-3 px-4 font-medium">Date</th>
            <th className="text-left py-3 px-4 font-medium">Status</th>
            <th className="text-left py-3 px-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-b">
              <td className="py-3 px-4">
                <div className="font-medium">{report.url}</div>
              </td>
              <td className="py-3 px-4 text-muted-foreground">
                {report.created_at && format(new Date(report.created_at), 'MMM d, yyyy')}
              </td>
              <td className="py-3 px-4">
                {getStatusBadge(report.status)}
              </td>
              <td className="py-3 px-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewReport(report.id)}
                  disabled={report.status !== 'completed'}
                >
                  View Report
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditHistory;
