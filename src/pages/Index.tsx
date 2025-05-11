import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import DemoReport from '@/components/DemoReport';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-24">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),rgba(0,0,0,0))]"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
            <Badge className="mb-4 animate-bounce-subtle">Professional Website Audits</Badge>
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
              <Button asChild size="lg" className="font-medium animate-scale-in">
                <Link to="/audit">Start Free Audit</Link>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16 sm:mt-24 rounded-xl border border-border/60 p-2 shadow-lg bg-card animate-float"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="rounded-lg overflow-hidden bg-background">
              <div className="bg-muted flex items-center gap-1.5 px-3 py-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="p-6 flex flex-col items-center">
                <DemoReport />
              </div>
            </div>
          </motion.div>
          
          {/* SEO Tips Preview Section */}
          <div className="mt-24 max-w-4xl mx-auto">
            <motion.div className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Badge className="mb-4">Value-Add Features</Badge>
              <h2 className="text-3xl font-bold sm:text-4xl mb-4">Actionable SEO Tips</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our reports provide specific, actionable SEO recommendations to improve your search rankings.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {[
                {
                  title: "Meta Tag Optimization",
                  content: "Improve your title tags and meta descriptions with AI-powered suggestions tailored to your content."
                },
                {
                  title: "Content Structure Analysis",
                  content: "Get recommendations for heading structure, keyword density, and content organization."
                },
                {
                  title: "Link Building Opportunities",
                  content: "Discover internal linking strategies and external linking opportunities to boost your authority."
                }
              ].map((tip, index) => (
                <motion.div 
                  key={index} 
                  variants={item}
                  className="relative"
                >
                  <Card className="h-full border-primary/10 bg-gradient-to-b from-card to-card/60 hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold mb-3 mt-2">{tip.title}</h3>
                      <p className="text-muted-foreground">{tip.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.08),rgba(0,0,0,0))]"></div>
        <div className="container px-4 mx-auto relative z-10">
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
                title: "White-Label Reports",
                description: "Customize reports with your own branding for a seamless client experience (Agency plan).",
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
                className="p-6 border border-border rounded-lg bg-card hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
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

      {/* Agency Section */}
      <section className="py-16 sm:py-24 bg-primary/5 border-y border-primary/10">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4">AGENCY SOLUTION</Badge>
              <h2 className="text-3xl font-bold mb-6">White-Label Reports For Your Agency</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Deliver professional, branded audit reports to your clients without them ever knowing you're using AuditSnap. Our white-label solution helps agencies maintain a consistent brand experience.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Custom branded PDF reports with your logo",
                  "Personalized email delivery to clients",
                  "Dedicated client portal with your branding",
                  "API access for seamless integration"
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    viewport={{ once: true }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Button asChild size="lg">
                <Link to="/pricing#agency">Learn About Agency Plan</Link>
              </Button>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"/>
                        <path d="M13 2.05005C13 2.05005 16 5.00005 16 12C16 19 13 21.9501 13 21.9501" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"/>
                        <path d="M11 21.9501C11 21.9501 8 19 8 12C8 5.00005 11 2.05005 11 2.05005" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"/>
                        <path d="M2.62988 15.5H21.3699" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"/>
                        <path d="M2.62988 8.5H21.3699" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"/>
                      </svg>
                    </div>
                    <span className="font-bold text-lg">YourAgency.com</span>
                  </div>
                  <Badge>White-Label Report</Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Website Audit Score</h4>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{width: '78%'}}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>0</span>
                      <span>78/100</span>
                      <span>100</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'SEO', score: '82/100' },
                      { label: 'Performance', score: '75/100' },
                      { label: 'Accessibility', score: '91/100' },
                      { label: 'Best Practices', score: '68/100' },
                    ].map((item, i) => (
                      <div key={i} className="bg-accent/50 p-3 rounded-md text-center">
                        <div className="font-semibold">{item.label}</div>
                        <div className="text-sm">{item.score}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-card p-2 rounded-full border border-border shadow-lg animate-float">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 8V21H3V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"/>
                  <path d="M1 3H23V8H1V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"/>
                  <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"/>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient py-16 sm:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0tMTUgMGg2VjBoLTZ2MzB6bTE1IDE4aC02VjMwaDZ2MTh6bS0xNSAwaDZWMzBoLTZ2MTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold sm:text-4xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to improve your website?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Get started today with a free audit and see what you can improve.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button asChild size="lg" variant="secondary" className="font-medium animate-scale-in">
                <Link to="/audit">Start Your Free Audit</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
