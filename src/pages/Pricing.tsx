
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
import Layout from '@/components/layout/Layout';

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
                  <TableCell className="font-bold">{plan.name}</TableCell>
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

        <motion.div 
          className="mt-20 max-w-3xl mx-auto text-center bg-muted/30 rounded-lg p-8"
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
