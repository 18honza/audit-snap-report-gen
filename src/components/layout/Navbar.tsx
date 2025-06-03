
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Navbar auth state change event:", event);
        setIsLoggedIn(!!session);
        setUsername(session?.user?.email || null);
        setIsLoading(false);
        
        // Clear logging out state when auth state changes
        if (event === 'SIGNED_OUT') {
          setIsLoggingOut(false);
        }
      }
    );
    
    // THEN check for existing session
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        setIsLoggedIn(!!session);
        if (session?.user) {
          setUsername(session.user.email);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    if (isLoggingOut) return; // Prevent multiple logout attempts
    
    try {
      setIsLoggingOut(true);
      console.log("Starting logout process...");
      
      // Clear local state first
      setIsLoggedIn(false);
      setUsername(null);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
      
      console.log("Logout successful");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out"
      });
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      // Reset state on error
      setIsLoggedIn(true);
      if (username) setUsername(username);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again."
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="font-bold text-xl">WebAudit</Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm hover:text-primary">Home</Link>
          <Link to="/pricing" className="text-sm hover:text-primary">Pricing</Link>
          {isLoggedIn && (
            <Link to="/dashboard" className="text-sm hover:text-primary">Dashboard</Link>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {!isLoading && (
            isLoggedIn ? (
              <>
                <div className="hidden md:flex items-center">
                  <span className="text-sm mr-2">{username}</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? 'Logging out...' : 'Log out'}
                </Button>
                <Button asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/audit">Start Free Audit</Link>
                </Button>
              </>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
