import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="text-xl font-semibold">FreelanceHub</span>
            </Link>
            <p className="text-gray-400">
              Connecting talented freelancers with businesses worldwide. Your success is our mission.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/post-job" className="hover:text-white transition-colors">Post a Job</Link></li>
              <li><Link to="/find-freelancers" className="hover:text-white transition-colors">Find Freelancers</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">My Projects</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">How It Works</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Freelancers</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/browse-jobs" className="hover:text-white transition-colors">Find Jobs</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">My Dashboard</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Create Profile</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Success Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" />
                <span>hello@freelancehub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 FreelanceHub. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}