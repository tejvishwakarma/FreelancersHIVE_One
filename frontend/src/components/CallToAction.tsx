import { Button } from "./ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export function CallToAction() {
  const benefits = [
    "Access to thousands of verified freelancers",
    "Secure payment protection",
    "24/7 customer support",
    "Project management tools"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and freelancers who trust FreelanceHub to build successful working relationships.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold mb-4">For Businesses</h3>
              <p className="text-white/80 mb-6">
                Find talented freelancers for your next project. Post jobs and get proposals from qualified professionals.
              </p>
              <Button size="lg" variant="secondary" className="w-full">
                Hire Freelancers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold mb-4">For Freelancers</h3>
              <p className="text-white/80 mb-6">
                Showcase your skills and connect with clients worldwide. Build your reputation and grow your business.
              </p>
              <Button size="lg" variant="secondary" className="w-full">
                Start Freelancing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h4 className="text-lg font-semibold mb-4">Why FreelanceHub?</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 text-white/70">
            <p>No setup fees • Cancel anytime • 100% satisfaction guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
}