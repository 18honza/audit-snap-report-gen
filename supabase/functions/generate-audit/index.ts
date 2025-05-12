
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, reportId } = await req.json();
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') as string;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
    
    // Use the admin client to update the report status
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.33.1');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update report status to processing
    await supabase
      .from('audit_reports')
      .update({ status: 'processing' })
      .eq('id', reportId);
    
    console.log(`Starting audit for URL: ${url}`);

    const prompt = `Generate a comprehensive website audit report for the website at ${url}. 
    The audit should include detailed analysis in these areas:
    1. SEO Analysis: meta tags, headers, content structure, keywords, etc.
    2. Performance: loading speed, Core Web Vitals estimates, resource usage
    3. Accessibility: WCAG compliance, screen reader compatibility, keyboard navigation
    4. Security: SSL, headers, known vulnerabilities
    5. Mobile Responsiveness: viewport settings, media queries, touch targets
    
    For each category, provide:
    - An overall score out of 100
    - Key findings (3-5 bullet points)
    - Critical issues that need immediate attention
    - Specific recommendations for improvement
    
    Format the response as a JSON object with the following structure:
    {
      "url": "website-url",
      "date": "current-date",
      "overallScore": number,
      "scores": {
        "seo": number,
        "performance": number,
        "accessibility": number,
        "security": number
      },
      "summary": {
        "keyFindings": [array of strings],
        "criticalIssues": [array of strings],
        "recommendations": [array of strings]
      },
      "seo": [array of objects with name, status, description, details, recommendation],
      "performance": {
        "metrics": [array of objects with name, value, status],
        "issues": [array of objects with name, description, details, impact]
      },
      "accessibility": {
        "wcag": [array of objects with level, status, description],
        "issues": [array of objects with name, severity, description, element, recommendation]
      },
      "security": {
        "headers": [array of objects with name, status, description],
        "findings": [array of objects with name, severity, description, recommendation]
      }
    }`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a web auditing expert that produces JSON outputs.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 3500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      
      // Update report status to failed
      await supabase
        .from('audit_reports')
        .update({ status: 'failed' })
        .eq('id', reportId);
      
      return new Response(
        JSON.stringify({ error: 'Failed to generate audit report', details: errorData }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    let reportData;
    
    try {
      // Extract the content from OpenAI's response
      const content = data.choices[0].message.content;
      // Parse the JSON response
      reportData = JSON.parse(content);
      console.log('Successfully generated audit report');
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      console.log('Raw response:', data.choices[0].message.content);
      
      // Update report status to failed
      await supabase
        .from('audit_reports')
        .update({ status: 'failed' })
        .eq('id', reportId);
      
      return new Response(
        JSON.stringify({ error: 'Failed to parse audit report data' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update the report in the database
    const { error: updateError } = await supabase
      .from('audit_reports')
      .update({ 
        report_data: reportData,
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('Error updating report in database:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to save audit report' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, reportId }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in generate-audit function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
