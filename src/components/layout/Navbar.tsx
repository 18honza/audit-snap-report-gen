import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You've been successfully logged out"
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out"
      });
    }
  };

  return (
    <nav className="border-b border-border/40 backdrop-blur-sm bg-background/95 fixed top-0 left-0 right-0 z-30">
      <div className="container flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="bg-gradient rounded-md p-1.5">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5 text-white"
            >
              <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
              <path d="M7 7h.01"></path>
            </svg>
          </div>
          <span className="text-xl font-bold">AuditSnap</span>
        </Link>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 animate-slide-up-fade">
                  <span>Account</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="ml-1"
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/audit">New Audit</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" size="sm" className="animate-slide-up-fade">
              <Link to="/login">Log in</Link>
            </Button>
          )}
          
          {/* Only show Start Free Audit button if user is not logged in */}
          {!user && (
            <Button asChild size="sm" className="animate-scale-in">
              <Link to="/login">
                Start Free Audit
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button 
            className="text-muted-foreground p-2 transition-colors hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="flex flex-col space-y-4 p-4 bg-background">
            <Link 
              to="/" 
              className="text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/pricing" 
              className="text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/audit" 
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  New Audit
                </Link>
                <button 
                  className="text-sm font-medium text-destructive transition-colors py-2 text-left"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                {/* Only show Start Free Audit button if user is not logged in */}
                <Button asChild size="sm" className="mt-2">
                  <Link 
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Free Audit
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
