import { CheckCircle, Target, Award, Globe } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function About() {
  const features = [
    {
      icon: Target,
      title: "Precision Matching",
      description: "Our AI-powered algorithm connects you with the perfect freelancers for your specific project needs."
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "All freelancers are vetted through our rigorous screening process to ensure top-quality work."
    },
    {
      icon: Globe,
      title: "Global Talent Pool",
      description: "Access talented professionals from around the world, working in different time zones for faster delivery."
    },
    {
      icon: CheckCircle,
      title: "Secure Payments",
      description: "Protected transactions with milestone-based payments and dispute resolution support."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative rounded-2xl overflow-hidden">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1690264459911-6d68c747d8a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NTU3NjUzMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team collaboration in modern office"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                About FreelanceHub
              </h2>
              <p className="text-lg text-gray-600">
                We're revolutionizing the way businesses and freelancers connect. Our platform makes it simple to find, hire, and work with talented professionals from around the globe.
              </p>
            </div>
            
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}