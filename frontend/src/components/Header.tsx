import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="text-xl font-semibold">FreelanceHub</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/browse-jobs" className="text-gray-600 hover:text-primary transition-colors">Browse Jobs</Link>
          <Link to="/find-freelancers" className="text-gray-600 hover:text-primary transition-colors">Find Freelancers</Link>
          <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</Link>
        </nav>
        
        {/* Desktop Authentication Section */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700 text-sm">
                Welcome, {user.firstName}!
              </span>
              <Link to="/dashboard" className="text-gray-900 hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/browse-jobs" 
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Jobs
            </Link>
            <Link 
              to="/find-freelancers" 
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Freelancers
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Mobile Authentication Section */}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              {user ? (
                <>
                  <div className="text-gray-700 text-sm px-2 py-1">
                    Welcome, {user.firstName}!
                  </div>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-900 hover:text-primary transition-colors px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
