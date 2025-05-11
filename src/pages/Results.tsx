
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Import mock data services
import { generateMockAuditData } from '@/services/mockAuditService';
import { generatePDF } from '@/services/pdfService';

const Results = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url') || '';
  const [loading, setLoading] = useState(true);
  const [auditData, setAuditData] = useState<any>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchAuditResults = async () => {
      try {
        // Simulate API call to get results
        setLoading(true);
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Generate mock audit data
        const data = generateMockAuditData(url);
        
        if (isMounted) {
          setAuditData(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching audit results:', error);
        toast.error('Failed to fetch audit results. Please try again.');
        if (isMounted) setLoading(false);
      }
    };

    if (url) {
      fetchAuditResults();
    } else {
      toast.error('No URL provided. Please start a new audit.');
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [url]);

  const handleDownloadPDF = async () => {
    try {
      setGenerating(true);
      toast.info('Generating PDF report...');
      
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      await generatePDF(auditData);
      
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container px-4 mx-auto py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold sm:text-4xl mb-6">Analyzing Your Website</h1>
              <p className="text-muted-foreground text-lg mb-8">
                We're currently auditing <span className="font-medium text-foreground">{url}</span>
              </p>
              
              <div className="space-y-8 max-w-md mx-auto">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analyzing SEO factors</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Checking performance metrics</span>
                    <span>41%</span>
                  </div>
                  <Progress value={41} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Scanning accessibility</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                
                <div className="text-center mt-8 animate-pulse text-muted-foreground">
                  <p>This will take 30-60 seconds...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!auditData) {
    return (
      <Layout>
        <div className="container px-4 mx-auto py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Unable to Generate Audit</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't generate an audit for the provided URL. Please try again with a different URL.
            </p>
            <Button asChild>
              <a href="/audit">Start New Audit</a>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 mx-auto py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Website Audit Results</h1>
                <p className="text-lg text-muted-foreground">
                  <span className="font-medium text-foreground">{auditData.url}</span>
                </p>
              </div>
              
              <Button 
                onClick={handleDownloadPDF} 
                disabled={generating}
                className="md:w-auto w-full"
              >
                {generating ? 'Generating PDF...' : 'Download PDF Report'}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Overall Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold flex items-end gap-1">
                    {auditData.overallScore}
                    <span className="text-sm text-muted-foreground font-normal">/100</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold flex items-end gap-1">
                    {auditData.scores.performance}
                    <span className="text-sm text-muted-foreground font-normal">/100</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">SEO</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold flex items-end gap-1">
                    {auditData.scores.seo}
                    <span className="text-sm text-muted-foreground font-normal">/100</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold flex items-end gap-1">
                    {auditData.scores.accessibility}
                    <span className="text-sm text-muted-foreground font-normal">/100</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Tabs defaultValue="summary">
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Key findings</h3>
                    <ul className="space-y-2">
                      {auditData.summary.keyFindings.map((finding: string, index: number) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="m9 12 2 2 4-4"></path>
                          </svg>
                          <span>{finding}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Critical issues</h3>
                    <ul className="space-y-2">
                      {auditData.summary.criticalIssues.map((issue: string, index: number) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive mt-1">
                            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                          <span>{issue}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Recommendations</h3>
                    <ul className="space-y-2">
                      {auditData.summary.recommendations.map((recommendation: string, index: number) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.6 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                            <path d="m9 18 6-6-6-6"></path>
                          </svg>
                          <span>{recommendation}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Audit completed at {auditData.date} • AuditSnap
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="seo" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {auditData.seo.map((item: any, index: number) => (
                      <motion.div 
                        key={index}
                        className="border-b border-border pb-6 last:pb-0 last:border-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className={`p-2 rounded-full ${
                            item.status === 'pass' ? 'bg-green-100 text-green-600' : 
                            item.status === 'warning' ? 'bg-yellow-100 text-yellow-600' : 
                            'bg-red-100 text-red-600'
                          }`}>
                            {item.status === 'pass' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5"></path>
                              </svg>
                            ) : item.status === 'warning' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                              </svg>
                            )}
                          </div>
                          <h3 className="font-medium text-lg">{item.name}</h3>
                        </div>
                        <div className="ml-11">
                          <p className="text-muted-foreground mb-3">{item.description}</p>
                          {item.details && (
                            <div className="bg-muted p-3 rounded-md text-sm font-mono">
                              {item.details}
                            </div>
                          )}
                          {item.recommendation && (
                            <div className="mt-3">
                              <strong className="text-sm">Recommendation: </strong>
                              <span className="text-sm text-muted-foreground">{item.recommendation}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {auditData.performance.metrics.map((metric: any, index: number) => (
                      <Card key={index} className="bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">{metric.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{metric.value}</div>
                          <p className={`text-xs ${
                            metric.status === 'good' ? 'text-green-600' : 
                            metric.status === 'needs-improvement' ? 'text-yellow-600' : 
                            'text-red-600'
                          }`}>
                            {metric.status === 'good' ? 'Good' : 
                             metric.status === 'needs-improvement' ? 'Needs Improvement' : 
                             'Poor'}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Performance Issues</h3>
                    <div className="space-y-4">
                      {auditData.performance.issues.map((issue: any, index: number) => (
                        <motion.div 
                          key={index}
                          className="border border-border rounded-lg p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <h4 className="font-medium mb-2">{issue.name}</h4>
                          <p className="text-muted-foreground text-sm mb-3">{issue.description}</p>
                          <div className="bg-muted p-3 rounded-md text-sm font-mono mb-3">
                            {issue.details}
                          </div>
                          <div>
                            <strong className="text-sm">Impact: </strong>
                            <span className="text-sm text-muted-foreground">{issue.impact}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="accessibility" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Accessibility Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">WCAG Compliance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {auditData.accessibility.wcag.map((item: any, index: number) => (
                        <div key={index} className="border border-border rounded-lg p-4">
                          <h4 className="font-medium">{item.level}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <div className={`h-2.5 w-2.5 rounded-full ${
                              item.status === 'pass' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span className={`text-sm ${
                              item.status === 'pass' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {item.status === 'pass' ? 'Compliant' : 'Non-compliant'}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Accessibility Issues</h3>
                    <div className="space-y-4">
                      {auditData.accessibility.issues.map((issue: any, index: number) => (
                        <motion.div 
                          key={index}
                          className="border border-border rounded-lg p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">{issue.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              issue.severity === 'high' ? 'bg-red-100 text-red-600' : 
                              issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                              'bg-green-100 text-green-600'
                            }`}>
                              {issue.severity} severity
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{issue.description}</p>
                          <div className="bg-muted p-3 rounded-md text-sm font-mono mb-3">
                            {issue.element}
                          </div>
                          <div>
                            <strong className="text-sm">How to fix: </strong>
                            <span className="text-sm text-muted-foreground">{issue.recommendation}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Security Headers</h3>
                    <div className="border rounded-md">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="text-left py-2 px-4 border-b">Header</th>
                            <th className="text-left py-2 px-4 border-b">Status</th>
                            <th className="text-left py-2 px-4 border-b">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {auditData.security.headers.map((header: any, index: number) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-3 px-4 font-mono text-sm">{header.name}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className={`h-2.5 w-2.5 rounded-full ${
                                    header.status === 'pass' ? 'bg-green-500' : 
                                    header.status === 'warning' ? 'bg-yellow-500' : 
                                    'bg-red-500'
                                  }`}></div>
                                  <span className="text-sm">{header.status === 'pass' ? 'Present' : 'Missing'}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm text-muted-foreground">{header.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Other Security Findings</h3>
                    <div className="space-y-4">
                      {auditData.security.findings.map((finding: any, index: number) => (
                        <motion.div 
                          key={index}
                          className="border border-border rounded-lg p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">{finding.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              finding.severity === 'high' ? 'bg-red-100 text-red-600' : 
                              finding.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                              'bg-green-100 text-green-600'
                            }`}>
                              {finding.severity} risk
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm">{finding.description}</p>
                          {finding.recommendation && (
                            <div className="mt-3">
                              <strong className="text-sm">Recommendation: </strong>
                              <span className="text-sm text-muted-foreground">{finding.recommendation}</span>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
