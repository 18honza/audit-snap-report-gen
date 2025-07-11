
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yuqqexlqizgzhrjydnen.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1cXFleGxxaXpnemhyanlkbmVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MjA3NzEsImV4cCI6MjA2MjM5Njc3MX0.whRQGcG0vHCv3Q2mdieR9N5f9h3F16dXgERd7DQxsH0";

// Create a Supabase client with auth configuration
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Try to create admin user on initial load (this would be better in a server-side setup)
(async function createAdminIfNeeded() {
  try {
    // Check if admin exists before trying to create it
    const { data: { user: existingUser }, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'honzajirak18@gmail.com',
      password: 'cigani',
    });

    if (signInError && signInError.message.includes('Invalid login credentials')) {
      // Admin doesn't exist, create it
      const { error: signUpError } = await supabase.auth.signUp({
        email: 'honzajirak18@gmail.com',
        password: 'cigani',
      });
      
      if (signUpError) {
        console.error('Failed to create admin account:', signUpError);
      } else {
        console.log('Admin account created');
      }
    }
    
    // Sign out after checking
    if (existingUser) {
      await supabase.auth.signOut();
    }
  } catch (err) {
    console.error('Error during admin account check:', err);
  }
})();
