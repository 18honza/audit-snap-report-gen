
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Website Audits
              <span className="block text-gradient">In Seconds</span>
            </motion.h1>
            <motion.p 
              className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Get comprehensive website analysis with actionable insights. 
              Improve your site's SEO, performance, accessibility, and user experience with AuditSnap.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button asChild size="lg" className="font-medium">
                <Link to="/audit">Start Free Audit</Link>
              </Button>
              <Button variant="outline" size="lg">
                View Demo Report
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16 sm:mt-24 rounded-xl border border-border p-2 shadow-lg bg-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="rounded-lg overflow-hidden bg-background">
              <div className="bg-muted flex items-center gap-1.5 px-3 py-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="p-6 flex flex-col items-center">
                <img 
                  src="https://via.placeholder.com/800x400?text=AuditSnap+Demo+Screenshot" 
                  alt="AuditSnap Demo" 
                  className="rounded-md w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 sm:py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Comprehensive Analysis</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get detailed insights into all aspects of your website's performance and health
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "SEO Analysis",
                description: "In-depth review of your site's search engine optimization factors including meta tags, headings, and content.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path>
                    <circle cx="10" cy="10" r="7"></circle>
                  </svg>
                ),
              },
              {
                title: "Performance Metrics",
                description: "Detailed page speed analysis with insights on load times, render blocking resources, and optimization opportunities.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                ),
              },
              {
                title: "Accessibility Review",
                description: "Check if your site follows WCAG guidelines and identify opportunities to improve accessibility for all users.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m16 12-4 4-4-4m4 4v-8"></path>
                  </svg>
                ),
              },
              {
                title: "Security Scan",
                description: "Identify potential security vulnerabilities, missing headers, and outdated components.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                ),
              },
              {
                title: "Mobile Friendly",
                description: "Test how your site performs on mobile devices and get suggestions for improvement.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                    <path d="M12 18h.01"></path>
                  </svg>
                ),
              },
              {
                title: "PDF Reports",
                description: "Download comprehensive reports to share with your team or clients.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="p-6 border border-border rounded-lg bg-card shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-3 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient py-16 sm:py-24 text-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold sm:text-4xl mb-6">Ready to improve your website?</h2>
            <p className="text-xl mb-8 text-white/90">
              Get started today with a free audit and see what you can improve.
            </p>
            <Button asChild size="lg" variant="secondary" className="font-medium">
              <Link to="/audit">Start Your Free Audit</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
