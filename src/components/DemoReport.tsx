import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  CartesianGrid,
  ComposedChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePDF } from '@/services/pdfService';
import { AuditData } from '@/services/mockAuditService';

const scoreData = [
  { name: 'Speed', value: 83, fill: '#21abe0' },
  { name: 'SEO', value: 92, fill: '#48c7f1' },
  { name: 'Accessibility', value: 75, fill: '#84ddfb' },
  { name: 'UX', value: 88, fill: '#b8ebfd' },
  { name: 'Security', value: 70, fill: '#d8f4fe' },
];

const issuesData = [
  { name: 'Critical', value: 2, fill: '#ef4444' },
  { name: 'Major', value: 5, fill: '#f97316' },
  { name: 'Minor', value: 9, fill: '#eab308' },
  { name: 'Passed', value: 47, fill: '#22c55e' },
];

const loadTimeData = [
  { name: 'TTFB', time: 0.3 },
  { name: 'FCP', time: 1.2 },
  { name: 'LCP', time: 2.4 },
  { name: 'TTI', time: 3.1 },
];

const mockAuditData: AuditData = {
  url: 'example.com',
  date: '2023-05-11',
  overallScore: 82,
  scores: {
    performance: 83,
    seo: 92,
    accessibility: 75,
    security: 70,
  },
  summary: {
    keyFindings: [
      'Overall site health is good with a score of 82/100',
      'example.com loads in 2.4 seconds on desktop',
      'Your site has 2 critical SEO issues that need attention',
      'Mobile responsiveness score is 88/100',
    ],
    criticalIssues: [
      'Missing meta descriptions on 4 pages',
      'Render-blocking JavaScript affecting page load times',
      'Some images missing alt text',
      'Not using HTTPS for all resources',
    ],
    recommendations: [
      'Add meta descriptions to all pages',
      'Optimize images to reduce page load time',
      'Fix broken links in the navigation',
      'Implement HTTP security headers',
      'Add alt text to all images for better accessibility',
    ],
  },
  seo: [
    {
      name: 'Meta Title',
      status: 'pass',
      description: 'Your page has a meta title with optimal length.',
      details: '<title>Website Title - example.com</title>',
    },
    {
      name: 'Meta Description',
      status: 'warning',
      description: 'Meta description exists but could be improved.',
      details: '<meta name="description" content="This is your website description that could be more detailed and include keywords." />',
      recommendation: 'Make your meta description more descriptive and include relevant keywords.',
    },
    {
      name: 'Heading Structure',
      status: 'warning',
      description: 'Heading structure could be improved.',
      details: 'Your page has an H1 tag but some sections are missing proper heading hierarchy.',
      recommendation: 'Ensure proper heading hierarchy (H1, then H2, etc.) throughout your content.',
    },
    {
      name: 'Image Alt Text',
      status: 'fail',
      description: 'Multiple images are missing alt text.',
      details: '<img src="image.jpg"> - Missing alt attribute',
      recommendation: 'Add descriptive alt text to all images for better SEO and accessibility.',
    },
    {
      name: 'Mobile Friendly',
      status: 'pass',
      description: 'Your website is mobile-friendly.',
    },
    {
      name: 'SSL Certificate',
      status: 'pass',
      description: 'Your website is secured with HTTPS.',
    },
  ],
  performance: {
    metrics: [
      {
        name: 'First Contentful Paint',
        value: '0.9s',
        status: 'good',
      },
      {
        name: 'Largest Contentful Paint',
        value: '2.3s',
        status: 'needs-improvement',
      },
      {
        name: 'Total Blocking Time',
        value: '150ms',
        status: 'needs-improvement',
      },
      {
        name: 'Cumulative Layout Shift',
        value: '0.05',
        status: 'good',
      },
      {
        name: 'Speed Index',
        value: '3.5s',
        status: 'poor',
      },
      {
        name: 'Time to Interactive',
        value: '3.8s',
        status: 'poor',
      },
    ],
    issues: [
      {
        name: 'Render-Blocking Resources',
        description: 'Resources are blocking the first paint of your page.',
        details: 'main.css, external-script.js',
        impact: 'These resources are delaying page rendering by approximately 1.2s.',
      },
      {
        name: 'Unoptimized Images',
        description: 'Several images are not properly sized or compressed.',
        details: 'hero-image.jpg (2.4MB), background.png (1.8MB)',
        impact: 'These images are causing longer load times and consuming unnecessary bandwidth.',
      },
      {
        name: 'JavaScript Execution Time',
        description: 'JavaScript takes too long to execute.',
        details: 'analytics.js (430ms), slider.js (380ms)',
        impact: 'Long JavaScript execution times directly affect page interactivity.',
      },
    ],
  },
  accessibility: {
    wcag: [
      {
        level: 'WCAG 2.1 A',
        status: 'fail',
        description: 'Does not meet all Level A compliance requirements',
      },
      {
        level: 'WCAG 2.1 AA',
        status: 'fail',
        description: 'Does not meet all Level AA compliance requirements',
      },
      {
        level: 'WCAG 2.1 AAA',
        status: 'fail',
        description: 'Does not meet all Level AAA compliance requirements',
      },
    ],
    issues: [
      {
        name: 'Missing alt attributes',
        severity: 'high',
        description: 'Images must have alt attributes for screen readers.',
        element: '<img src="hero.jpg"> (missing alt attribute)',
        recommendation: 'Add descriptive alt attributes to all images.',
      },
      {
        name: 'Low contrast text',
        severity: 'medium',
        description: 'Some text has insufficient contrast with its background.',
        element: 'Text color: #777777, Background color: #F5F5F5, Contrast ratio: 2.5:1 (should be at least 4.5:1)',
        recommendation: 'Increase the contrast ratio to at least 4.5:1 for normal text.',
      },
      {
        name: 'Missing form labels',
        severity: 'high',
        description: 'Form fields must have associated labels.',
        element: '<input type="text" name="search"> (no associated label)',
        recommendation: 'Add proper labels to all form inputs.',
      },
      {
        name: 'Missing document language',
        severity: 'medium',
        description: 'The HTML element does not have a lang attribute.',
        element: '<html> (missing lang attribute)',
        recommendation: 'Add a lang attribute to the HTML element (e.g., lang="en").',
      },
    ],
  },
  security: {
    headers: [
      {
        name: 'HTTP Strict Transport Security',
        status: 'fail',
        description: 'HSTS header is missing.',
      },
      {
        name: 'Content-Security-Policy',
        status: 'fail',
        description: 'CSP header is missing.',
      },
      {
        name: 'X-Content-Type-Options',
        status: 'pass',
        description: 'Properly set to "nosniff".',
      },
      {
        name: 'X-Frame-Options',
        status: 'warning',
        description: 'Set but could be more restrictive.',
      },
      {
        name: 'X-XSS-Protection',
        status: 'pass',
        description: 'Properly configured.',
      },
      {
        name: 'Referrer-Policy',
        status: 'fail',
        description: 'Header is missing.',
      },
    ],
    findings: [
      {
        name: 'Mixed Content',
        severity: 'high',
        description: 'Your secure HTTPS site includes resources loaded over HTTP.',
        recommendation: 'Update all resource URLs to use HTTPS.',
      },
      {
        name: 'jQuery Version',
        severity: 'medium',
        description: 'Using an outdated version of jQuery (1.8.3) with known vulnerabilities.',
        recommendation: 'Update to the latest version of jQuery.',
      },
      {
        name: 'Cookie Configuration',
        severity: 'medium',
        description: 'Cookies are set without the Secure and HttpOnly flags.',
        recommendation: 'Set the Secure and HttpOnly flags for all cookies containing sensitive information.',
      },
      {
        name: 'Server Information Disclosure',
        severity: 'low',
        description: 'Server header reveals detailed version information.',
        recommendation: 'Configure your server to minimize information disclosure in headers.',
      },
    ],
  },
};

const DemoReport = () => {
  const handleGeneratePDF = () => {
    generatePDF(mockAuditData);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Website Audit Report</h1>
          <p className="text-muted-foreground">
            <span className="font-medium">example.com</span> • May 11, 2023
          </p>
        </div>
        <Button onClick={handleGeneratePDF} className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download PDF
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-lg">Overall Score</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center">
            <div className="relative w-40 h-40 flex items-center justify-center mb-4">
              <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-muted/20"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-primary"
                  strokeDasharray="339.3"
                  strokeDashoffset={339.3 * (1 - mockAuditData.overallScore / 100)}
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold">{mockAuditData.overallScore}</span>
                <span className="text-xs text-muted-foreground">out of 100</span>
              </div>
            </div>
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span>Performance</span>
                <span className="font-medium">{mockAuditData.scores.performance}/100</span>
              </div>
              <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${mockAuditData.scores.performance}%` }}
                />
              </div>
            </div>
            <div className="w-full space-y-2 mt-2">
              <div className="flex justify-between text-sm">
                <span>SEO</span>
                <span className="font-medium">{mockAuditData.scores.seo}/100</span>
              </div>
              <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${mockAuditData.scores.seo}%` }}
                />
              </div>
            </div>
            <div className="w-full space-y-2 mt-2">
              <div className="flex justify-between text-sm">
                <span>Accessibility</span>
                <span className="font-medium">{mockAuditData.scores.accessibility}/100</span>
              </div>
              <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${mockAuditData.scores.accessibility}%` }}
                />
              </div>
            </div>
            <div className="w-full space-y-2 mt-2">
              <div className="flex justify-between text-sm">
                <span>Security</span>
                <span className="font-medium">{mockAuditData.scores.security}/100</span>
              </div>
              <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${mockAuditData.scores.security}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-lg">Key Findings</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-2">
              {mockAuditData.summary.keyFindings.map((finding, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <div className="mt-1 text-primary shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                  </div>
                  <span>{finding}</span>
                </motion.li>
              ))}
            </ul>

            <h3 className="font-medium text-destructive mt-6 mb-2">Critical Issues:</h3>
            <ul className="space-y-2">
              {mockAuditData.summary.criticalIssues.map((issue, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <div className="mt-1 text-destructive shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <span>{issue}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-lg">Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[240px]">
              <ChartContainer
                config={{
                  time: { label: "Time (seconds)" },
                }}
              >
                <ComposedChart data={loadTimeData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="time" fill="#21abe0" barSize={30} />
                  <Line type="monotone" dataKey="time" stroke="#8884d8" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </ComposedChart>
              </ChartContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center text-sm">
              <div className="p-2 bg-muted/20 rounded">
                <div className="font-medium mb-1">TTFB</div>
                <div className="text-primary text-lg font-mono font-semibold">0.3s</div>
              </div>
              <div className="p-2 bg-muted/20 rounded">
                <div className="font-medium mb-1">FCP</div>
                <div className="text-primary text-lg font-mono font-semibold">1.2s</div>
              </div>
              <div className="p-2 bg-muted/20 rounded">
                <div className="font-medium mb-1">LCP</div>
                <div className="text-primary text-lg font-mono font-semibold">2.4s</div>
              </div>
              <div className="p-2 bg-muted/20 rounded">
                <div className="font-medium mb-1">TTI</div>
                <div className="text-primary text-lg font-mono font-semibold">3.1s</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-lg">Issues Found</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[240px]">
              <ChartContainer
                config={{
                  issues: { label: "Issues" },
                }}
              >
                <PieChart>
                  <Pie
                    data={issuesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {issuesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="mt-4 flex justify-center gap-4 flex-wrap">
              {issuesData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <div className="text-sm">
                    {item.name}: <span className="font-medium">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-lg">Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="font-medium text-lg mb-4">Top 3 Priority Fixes</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {mockAuditData.summary.recommendations.slice(0, 3).map((recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-border rounded-lg bg-muted/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h4 className="font-medium">Priority Fix</h4>
                </div>
                <p className="text-muted-foreground">{recommendation}</p>
              </motion.div>
            ))}
          </div>
          
          <h3 className="font-medium mb-2">Additional Recommendations</h3>
          <ul className="space-y-2">
            {mockAuditData.summary.recommendations.slice(3).map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-1 text-primary shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                </div>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="text-center p-6 mb-8 border border-border rounded-lg bg-muted/10">
        <h3 className="text-xl font-medium mb-4">Want to improve your website?</h3>
        <p className="mb-6 text-muted-foreground">
          Run a full audit on your website to get detailed insights and recommendations.
        </p>
        <Button asChild size="lg">
          <Link to="/audit">Run Your Own Audit</Link>
        </Button>
      </div>
    </div>
  );
};

export default DemoReport;
