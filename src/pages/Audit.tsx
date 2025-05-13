
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" })
    .refine((url) => {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    }, {
      message: "Please enter a valid URL including the protocol (http:// or https://)",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const Audit = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [auditsRemaining, setAuditsRemaining] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      setUserId(session.user.id);
      checkUserSubscription(session.user.id);
    };
    
    checkAuth();
  }, [navigate]);

  const checkUserSubscription = async (userId: string) => {
    try {
      setLoading(true);
      
      console.log("Checking subscription for user:", userId);
      
      // Use the direct user ID in the query instead of relying on auth.uid() in RLS
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*, plans(*)')
        .eq('user_id', userId)
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
        
      if (error) {
        console.error('Error checking subscription:', error);
        throw error;
      }
      
      console.log('Subscription found:', data);
      
      if (!data) {
        console.log('No active subscription found, redirecting to dashboard');
        toast.error('You need an active subscription to run audits');
        navigate('/dashboard');
        return;
      }
      
      setAuditsRemaining(data.audits_remaining);
      
      if (data.audits_remaining <= 0) {
        toast.error('You have no audits remaining in your current plan');
        navigate('/dashboard');
      }
      
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast.error('Failed to verify your subscription');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (auditsRemaining === null || auditsRemaining <= 0) {
      toast.error('You have no audits remaining in your current plan');
      return;
    }
    
    setSubmitting(true);
    
    try {
      if (!userId) {
        toast.error('Please log in to create an audit');
        navigate('/login');
        return;
      }
      
      // Create a new audit report in the database with the user_id
      const { data: reportData, error: reportError } = await supabase
        .from('audit_reports')
        .insert({
          url: data.url,
          status: 'pending',
          user_id: userId
        })
        .select()
        .single();
        
      if (reportError) {
        throw reportError;
      }
      
      // Update the audits_remaining count
      const { error: updateError } = await supabase
        .from('user_subscriptions')
        .update({ audits_remaining: auditsRemaining - 1 })
        .eq('user_id', userId)
        .eq('active', true);
        
      if (updateError) {
        console.error('Error updating audits remaining:', updateError);
        // Don't throw here, continue with the audit
      } else {
        // Update local state
        setAuditsRemaining(prev => prev !== null ? prev - 1 : null);
      }
      
      // Call the Edge function to generate the audit
      const { error: functionError } = await supabase.functions.invoke('generate-audit', {
        body: {
          url: data.url,
          reportId: reportData.id
        }
      });
      
      if (functionError) {
        throw functionError;
      }

      toast.success('Audit started successfully!');
      
      // Navigate to results page with the report ID
      navigate(`/results?report=${reportData.id}`);
      
    } catch (error) {
      console.error('Error submitting audit:', error);
      toast.error('Failed to start audit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container px-4 mx-auto py-16 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Checking your subscription...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 mx-auto py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold sm:text-4xl mb-3">Start Your Website Audit</h1>
            <p className="text-muted-foreground text-lg">
              Enter your website URL below to begin a comprehensive analysis.
            </p>
            {auditsRemaining !== null && (
              <p className="mt-2 inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <span className="mr-1">Audits remaining:</span>
                <span className="font-bold">{auditsRemaining}</span>
              </p>
            )}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Website URL</CardTitle>
              <CardDescription>
                Enter the full URL of the website you want to audit. Make sure to include the protocol (http:// or https://).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com" 
                            {...field} 
                            disabled={submitting}
                            className="text-base"
                          />
                        </FormControl>
                        <FormDescription>
                          We'll analyze this URL and generate a comprehensive report.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={submitting}
                  >
                    {submitting ? 'Starting Audit...' : 'Start Audit'}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col text-sm text-muted-foreground">
              <p>Audits typically take 30-60 seconds to complete.</p>
            </CardFooter>
          </Card>
          
          <div className="mt-12 space-y-6">
            <h2 className="text-xl font-medium text-center">What to expect from your audit</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Fast Results</h3>
                    <p className="text-sm text-muted-foreground">
                      Our advanced scanning technology delivers results in under a minute.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Downloadable PDF</h3>
                    <p className="text-sm text-muted-foreground">
                      Get a professional PDF report you can share with your team or clients.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Actionable Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      We provide clear recommendations on how to improve your site.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Secure Process</h3>
                    <p className="text-sm text-muted-foreground">
                      We never store your data or share it with third parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Audit;
