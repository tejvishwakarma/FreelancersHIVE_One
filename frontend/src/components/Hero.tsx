import { Button } from "./ui/button";
import { ArrowRight, Users, Briefcase, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section id="home" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Connect with Top 
                <span className="text-primary"> Freelancers</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Find skilled professionals for your projects or showcase your talents to thousands of businesses worldwide.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-4">
                Find Freelancers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Start Freelancing
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center text-2xl font-bold text-gray-900">
                  <Users className="h-6 w-6 mr-2 text-primary" />
                  50K+
                </div>
                <p className="text-sm text-gray-600">Active Freelancers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center text-2xl font-bold text-gray-900">
                  <Briefcase className="h-6 w-6 mr-2 text-primary" />
                  10K+
                </div>
                <p className="text-sm text-gray-600">Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center text-2xl font-bold text-gray-900">
                  <Star className="h-6 w-6 mr-2 text-primary" />
                  4.9
                </div>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1542641532-6a4c78e5f701?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmcmVlbGFuY2VyJTIwd29ya2luZyUyMGxhcHRvcHxlbnwxfHx8fDE3NTU3NzYzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional freelancer working on laptop"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}