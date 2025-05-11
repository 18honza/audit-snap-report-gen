
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { CheckIcon } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "",
      includedAudits: "1 audit",
      extraAudits: "—",
      bestFor: "Let users try it once, no CC required",
      buttonText: "Start Free Trial",
      popular: false,
      features: [
        "Basic audit report", 
        "PDF export", 
        "Performance metrics",
        "Mobile friendliness check"
      ],
    },
    {
      name: "Starter",
      price: "$9",
      period: "/ month",
      includedAudits: "15 audits/mo",
      extraAudits: "$1.00 each",
      bestFor: "Freelancers, side projects",
      buttonText: "Choose Starter",
      popular: false,
      features: [
        "All Free Trial features", 
        "SEO optimization tips", 
        "Accessibility audits",
        "Priority recommendations",
        "Email summary reports"
      ],
    },
    {
      name: "Pro",
      price: "$29",
      period: "/ month",
      includedAudits: "60 audits/mo",
      extraAudits: "$0.80 each",
      bestFor: "Agencies with a few clients",
      buttonText: "Choose Pro",
      popular: true,
      features: [
        "All Starter features", 
        "Competitive benchmarking", 
        "Weekly scheduled audits",
        "Customizable reports",
        "Advanced SEO insights",
        "Technical error tracking"
      ],
    },
    {
      name: "Agency",
      price: "$79",
      period: "/ month",
      includedAudits: "200 audits/mo",
      extraAudits: "$0.60 each",
      bestFor: "High-volume, white-label resellers",
      buttonText: "Choose Agency",
      popular: false,
      features: [
        "All Pro features", 
        "White-label reports", 
        "Remove AuditSnap branding",
        "Priority support",
        "API access",
        "Client management dashboard",
        "Custom domain for reports"
      ],
      highlight: "White-Label Ready",
    },
    {
      name: "Pay-as-you-go",
      price: "$3",
      period: "/ audit",
      includedAudits: "—",
      extraAudits: "—",
      bestFor: "One-time users who hate subscriptions",
      buttonText: "Pay As You Go",
      popular: false,
      features: [
        "All Starter features", 
        "No monthly commitment", 
        "Reports stored for 30 days",
        "Email delivery"
      ],
    },
  ];

  const valueAddFeatures = [
    {
      title: "SEO Optimization",
      description: "Get actionable tips to improve your search engine rankings with detailed recommendations tailored to your website.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path>
          <circle cx="10" cy="10" r="7"></circle>
        </svg>
      ),
    },
    {
      title: "Competitive Benchmarking",
      description: "Compare your site's performance against up to 3 competitors to identify opportunities and stay ahead.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 21 9-9m-9 9h8m-8 0v-8"></path>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="M13 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>
        </svg>
      ),
    },
    {
      title: "Weekly Email Reports",
      description: "Schedule automated weekly audits with results delivered directly to your inbox to track improvements over time.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="13" x="4" y="4" rx="2"></rect>
          <path d="m4 8 8 5 8-5"></path>
        </svg>
      ),
    },
  ];

  const agencyFeatures = [
    {
      title: "White-Label Reports",
      description: "Remove all AuditSnap branding and add your own logo, colors, and custom domain for a seamless client experience.",
    },
    {
      title: "Client Management",
      description: "Organize audits by client, manage permissions, and create dedicated client portals for easy communication.",
    },
    {
      title: "Bulk Audit Processing",
      description: "Audit multiple websites at once or schedule recurring audits across your entire client base.",
    },
  ];

  return (
    <Layout>
      <div className="container py-16 lg:py-24 px-4 mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-5xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the plan that works best for your needs. All plans include comprehensive website audits.
          </motion.p>
        </div>

        {/* Desktop pricing table */}
        <motion.div 
          className="hidden md:block mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="w-[150px] font-bold text-foreground text-lg">Plan</TableHead>
                <TableHead className="font-bold text-foreground text-lg">Price</TableHead>
                <TableHead className="font-bold text-foreground text-lg">Included Audits</TableHead>
                <TableHead className="font-bold text-foreground text-lg">Extra Audits</TableHead>
                <TableHead className="font-bold text-foreground text-lg">Best For</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan, index) => (
                <TableRow key={plan.name} className={plan.popular ? "bg-primary/5" : ""}>
                  <TableCell className="font-bold">
                    {plan.name}
                    {plan.highlight && (
                      <Badge variant="outline" className="ml-2 bg-primary/10 border-primary/20">
                        {plan.highlight}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-lg">{plan.price}</div>
                    <div className="text-sm text-muted-foreground">{plan.period}</div>
                  </TableCell>
                  <TableCell>{plan.includedAudits}</TableCell>
                  <TableCell>{plan.extraAudits}</TableCell>
                  <TableCell>{plan.bestFor}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      asChild
                      variant={plan.popular ? "default" : "outline"}
                      className="whitespace-nowrap"
                    >
                      <Link to="/login">{plan.buttonText}</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Mobile pricing cards */}
        <div className="grid md:hidden gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`border rounded-lg overflow-hidden shadow-sm ${
                plan.popular ? "border-primary shadow-md" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              {plan.highlight && (
                <div className="bg-primary/10 text-foreground text-center py-1 text-sm font-medium">
                  {plan.highlight}
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Included Audits</span>
                    <span className="font-medium">{plan.includedAudits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Extra Audits</span>
                    <span className="font-medium">{plan.extraAudits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best For</span>
                    <span className="font-medium">{plan.bestFor}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckIcon className="h-4 w-4 text-primary mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  asChild
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                >
                  <Link to="/login">{plan.buttonText}</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value-Add Features Section */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Value-Add Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take your website to the next level with these premium features included in our paid plans.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {valueAddFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <div className="p-3 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Agency White-Label Section */}
        <motion.div 
          className="mt-24 rounded-xl overflow-hidden border border-primary/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="bg-primary/5 p-12">
            <div className="max-w-3xl mx-auto">
              <Badge className="mb-4 animate-bounce-subtle">Agency Exclusive</Badge>
              <h2 className="text-3xl font-bold mb-4">White-Label Agency Solution</h2>
              <p className="text-lg mb-8">
                Provide professional audit reports to your clients under your own brand. Perfect for agencies, consultants, and resellers.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {agencyFeatures.map((feature, index) => (
                  <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/10 animate-float">
                    <CardHeader>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button asChild size="lg" className="animate-slide-up-fade">
                <Link to="/login">Get Agency Plan</Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mt-20 max-w-3xl mx-auto text-center bg-card rounded-lg p-8 border border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
          <p className="mb-6 text-muted-foreground">
            Contact us for custom enterprise pricing, white-label solutions, or any specific requirements.
          </p>
          <Button asChild variant="outline" size="lg">
            <a href="mailto:contact@auditsnap.com">Contact Sales</a>
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Pricing;
