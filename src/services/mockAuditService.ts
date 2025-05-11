
export interface AuditData {
  url: string;
  date: string;
  overallScore: number;
  scores: {
    performance: number;
    seo: number;
    accessibility: number;
    security: number;
  };
  summary: {
    keyFindings: string[];
    criticalIssues: string[];
    recommendations: string[];
  };
  seo: {
    name: string;
    status: 'pass' | 'warning' | 'fail';
    description: string;
    details?: string;
    recommendation?: string;
  }[];
  performance: {
    metrics: {
      name: string;
      value: string;
      status: 'good' | 'needs-improvement' | 'poor';
    }[];
    issues: {
      name: string;
      description: string;
      details: string;
      impact: string;
    }[];
  };
  accessibility: {
    wcag: {
      level: string;
      status: 'pass' | 'fail';
      description: string;
    }[];
    issues: {
      name: string;
      severity: 'high' | 'medium' | 'low';
      description: string;
      element: string;
      recommendation: string;
    }[];
  };
  security: {
    headers: {
      name: string;
      status: 'pass' | 'fail' | 'warning';
      description: string;
    }[];
    findings: {
      name: string;
      severity: 'high' | 'medium' | 'low';
      description: string;
      recommendation?: string;
    }[];
  };
}

export function generateMockAuditData(url: string): AuditData {
  // Format the URL for display
  const formattedUrl = url.replace(/^https?:\/\//, '');
  
  // Generate random scores
  const performanceScore = Math.floor(Math.random() * 40) + 60;
  const seoScore = Math.floor(Math.random() * 30) + 70;
  const accessibilityScore = Math.floor(Math.random() * 35) + 65;
  const securityScore = Math.floor(Math.random() * 30) + 60;
  
  // Calculate overall score
  const overallScore = Math.floor(
    (performanceScore + seoScore + accessibilityScore + securityScore) / 4
  );
  
  // Format current date
  const date = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  
  return {
    url: url,
    date,
    overallScore,
    scores: {
      performance: performanceScore,
      seo: seoScore,
      accessibility: accessibilityScore,
      security: securityScore,
    },
    summary: {
      keyFindings: [
        `Overall site health is ${overallScore > 80 ? 'good' : 'moderate'} with a score of ${overallScore}/100`,
        `${formattedUrl} loads in ${(Math.random() * 2 + 1.5).toFixed(1)} seconds on desktop`,
        `Your site has ${Math.floor(Math.random() * 3) + 1} critical SEO issues that need attention`,
        `Mobile responsiveness score is ${Math.floor(Math.random() * 20) + 80}/100`,
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
        details: `<title>Website Title - ${formattedUrl}</title>`,
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
          value: `${(Math.random() * 0.5 + 0.8).toFixed(1)}s`,
          status: 'good',
        },
        {
          name: 'Largest Contentful Paint',
          value: `${(Math.random() * 1 + 2.1).toFixed(1)}s`,
          status: 'needs-improvement',
        },
        {
          name: 'Total Blocking Time',
          value: `${(Math.random() * 200 + 100).toFixed(0)}ms`,
          status: 'needs-improvement',
        },
        {
          name: 'Cumulative Layout Shift',
          value: `${(Math.random() * 0.1 + 0.01).toFixed(2)}`,
          status: 'good',
        },
        {
          name: 'Speed Index',
          value: `${(Math.random() * 2 + 3).toFixed(1)}s`,
          status: 'poor',
        },
        {
          name: 'Time to Interactive',
          value: `${(Math.random() * 2 + 3.5).toFixed(1)}s`,
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
}
