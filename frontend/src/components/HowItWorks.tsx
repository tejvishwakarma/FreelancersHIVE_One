import { Search, MessageCircle, CreditCard, Star, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Find Freelancers",
      description: "Browse profiles, portfolios, and reviews to find the perfect match for your project needs."
    },
    {
      icon: MessageCircle,
      title: "Communicate & Hire",
      description: "Discuss project details, timeline, and budget before making your hiring decision."
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Fund your project with milestone payments that are released as work is completed."
    },
    {
      icon: Star,
      title: "Review & Rate",
      description: "Leave feedback to help build trust within our freelancing community."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started is simple. Follow these four easy steps to begin your freelancing journey.
          </p>
        </div>
        
        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/30 rounded-full"></div>
            
            {/* Steps */}
            <div className="grid grid-cols-4 gap-8 relative">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative">
                  {/* Step Circle */}
                  <div className="relative z-10 mx-auto w-20 h-20 bg-white border-4 border-primary rounded-full flex items-center justify-center shadow-lg mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-2 bg-primary text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center z-20">
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-24 -right-4 transform -translate-y-1/2 text-primary">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile/Tablet Vertical Layout */}
        <div className="lg:hidden">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 relative">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-primary/30 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <step.icon className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-16">
          <Button size="lg" className="px-8">
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}