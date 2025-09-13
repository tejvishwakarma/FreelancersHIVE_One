import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Users, Target, Award, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Active Freelancers", value: "50,000+", icon: Users },
  { label: "Projects Completed", value: "1M+", icon: Target },
  { label: "Client Satisfaction", value: "98%", icon: Award },
  { label: "Countries Served", value: "150+", icon: Globe }
];

const teamMembers = [
  {
    name: "Alex Johnson",
    position: "CEO & Founder",
    avatar: "/api/placeholder/150/150",
    bio: "Former tech executive with 15+ years building scalable platforms"
  },
  {
    name: "Sarah Martinez",
    position: "Head of Product",
    avatar: "/api/placeholder/150/150",
    bio: "Product strategist passionate about connecting talent with opportunity"
  },
  {
    name: "Michael Zhang",
    position: "CTO",
    avatar: "/api/placeholder/150/150",
    bio: "Engineering leader focused on building robust, secure platforms"
  },
  {
    name: "Emma Wilson",
    position: "Head of Community",
    avatar: "/api/placeholder/150/150",
    bio: "Community advocate dedicated to supporting freelancer success"
  }
];

const values = [
  {
    title: "Trust & Transparency",
    description: "We believe in building trust through clear communication, fair practices, and transparent processes."
  },
  {
    title: "Quality First",
    description: "We maintain high standards by carefully vetting freelancers and ensuring quality deliverables."
  },
  {
    title: "Global Community",
    description: "We're building a worldwide community where talent and opportunity can connect regardless of location."
  },
  {
    title: "Continuous Innovation",
    description: "We constantly evolve our platform to better serve the changing needs of the freelance economy."
  }
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connecting Talent with <span className="text-blue-600">Opportunity</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              FreelanceHub is the world's leading platform for connecting businesses with 
              top-tier freelance talent. We're building the future of work, one project at a time.
            </p>
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-3">
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  We believe that great work can happen anywhere, at any time, by anyone with the right skills 
                  and passion. Our mission is to create a world where talent and opportunity can find each other 
                  seamlessly, regardless of geographical boundaries.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Since our founding in 2020, we've helped thousands of businesses scale their teams with 
                  expert freelancers, while empowering independent professionals to build thriving careers 
                  on their own terms.
                </p>
                <Link to="/browse-jobs">
                  <Button variant="outline" size="lg">
                    Explore Opportunities
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">By the Numbers</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Average project success rate</span>
                      <span className="font-bold">97%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Repeat client rate</span>
                      <span className="font-bold">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average freelancer rating</span>
                      <span className="font-bold">4.8/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform growth (YoY)</span>
                      <span className="font-bold">250%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-lg text-gray-600">
              These core principles guide everything we do and help us create a platform 
              that works for everyone in the freelance ecosystem.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              We're a diverse team of builders, dreamers, and problem-solvers united by our 
              passion for empowering the future of work.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're looking to hire top talent or showcase your skills, 
              FreelanceHub is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="text-lg px-8">
                  Join as Freelancer
                </Button>
              </Link>
              <Link to="/post-job">
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}