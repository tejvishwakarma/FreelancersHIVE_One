import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search, Star, MapPin, DollarSign, Filter, Heart } from "lucide-react";
import { useState } from "react";

const mockFreelancers = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Full-Stack Developer",
    avatar: "/api/placeholder/100/100",
    rating: 4.9,
    reviewCount: 127,
    location: "San Francisco, CA",
    hourlyRate: "$85/hr",
    description: "Experienced full-stack developer specializing in React, Node.js, and cloud architecture. I help startups and enterprises build scalable web applications.",
    skills: ["React", "Node.js", "AWS", "TypeScript", "MongoDB"],
    completedProjects: 156,
    availability: "Available"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "UI/UX Designer",
    avatar: "/api/placeholder/100/100",
    rating: 4.8,
    reviewCount: 89,
    location: "Remote",
    hourlyRate: "$70/hr",
    description: "Creative UI/UX designer with 6+ years of experience creating beautiful and intuitive digital experiences for web and mobile applications.",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Sketch"],
    completedProjects: 92,
    availability: "Available"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Content Marketing Specialist",
    avatar: "/api/placeholder/100/100",
    rating: 4.7,
    reviewCount: 64,
    location: "Austin, TX",
    hourlyRate: "$45/hr",
    description: "Strategic content marketer helping businesses grow through compelling storytelling and data-driven content strategies.",
    skills: ["Content Strategy", "SEO", "Social Media", "Analytics", "Copywriting"],
    completedProjects: 78,
    availability: "Busy"
  },
  {
    id: 4,
    name: "David Kim",
    title: "Mobile App Developer",
    avatar: "/api/placeholder/100/100",
    rating: 4.9,
    reviewCount: 143,
    location: "Seattle, WA",
    hourlyRate: "$90/hr",
    description: "Expert mobile developer specializing in cross-platform applications using React Native and Flutter. Published 20+ apps on app stores.",
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
    completedProjects: 201,
    availability: "Available"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    title: "Data Scientist",
    avatar: "/api/placeholder/100/100",
    rating: 4.8,
    reviewCount: 76,
    location: "Remote",
    hourlyRate: "$95/hr",
    description: "Data scientist with expertise in machine learning, statistical analysis, and business intelligence. PhD in Statistics from Stanford.",
    skills: ["Python", "Machine Learning", "SQL", "Tableau", "R"],
    completedProjects: 67,
    availability: "Available"
  },
  {
    id: 6,
    name: "James Wilson",
    title: "DevOps Engineer",
    avatar: "/api/placeholder/100/100",
    rating: 4.6,
    reviewCount: 52,
    location: "New York, NY",
    hourlyRate: "$80/hr",
    description: "DevOps engineer with extensive experience in cloud infrastructure, CI/CD pipelines, and containerization technologies.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
    completedProjects: 89,
    availability: "Available"
  }
];

export function FindFreelancersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredFreelancers = mockFreelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = selectedSkill === "all" || 
                        freelancer.skills.some(skill => skill.toLowerCase().includes(selectedSkill.toLowerCase()));
    
    const matchesAvailability = selectedAvailability === "all" || 
                               freelancer.availability.toLowerCase() === selectedAvailability;
    
    return matchesSearch && matchesSkill && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Top Freelancers</h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with skilled professionals ready to bring your projects to life
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search freelancers by name, skill, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg" className="h-12 px-8">
                Search Freelancers
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            
            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <label className="block mb-2">Skills</label>
                    <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select skill" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Skills</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="node">Node.js</SelectItem>
                        <SelectItem value="figma">Figma</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="aws">AWS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block mb-2">Availability</label>
                    <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="busy">Busy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Freelancer Listings */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredFreelancers.length} Freelancers Found
              </h2>
              <Select defaultValue="rating">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Lowest Rate</SelectItem>
                  <SelectItem value="price-high">Highest Rate</SelectItem>
                  <SelectItem value="projects">Most Projects</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFreelancers.map((freelancer) => (
                <Card key={freelancer.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                          <AvatarFallback>{freelancer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{freelancer.name}</h3>
                          <p className="text-gray-600">{freelancer.title}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{freelancer.rating}</span>
                            <span className="text-sm text-gray-500">({freelancer.reviewCount} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {freelancer.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {freelancer.hourlyRate}
                      </span>
                      <Badge 
                        variant={freelancer.availability === "Available" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {freelancer.availability}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      {freelancer.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {freelancer.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {freelancer.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{freelancer.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {freelancer.completedProjects} projects completed
                      </span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button size="sm">Contact</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFreelancers.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No freelancers found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}