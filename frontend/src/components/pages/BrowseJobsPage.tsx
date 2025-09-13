import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search, MapPin, Clock, DollarSign, Bookmark, Filter } from "lucide-react";
import { useState } from "react";

const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechStart Inc.",
    location: "Remote",
    type: "Full-time",
    salary: "$80,000 - $120,000",
    description: "We are looking for an experienced React developer to join our team and help build cutting-edge web applications.",
    skills: ["React", "TypeScript", "Node.js", "MongoDB"],
    postedAt: "2 days ago",
    category: "Development"
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "New York, NY",
    type: "Contract",
    salary: "$60 - $80/hour",
    description: "Create beautiful and intuitive user interfaces for our client projects. Experience with Figma and prototyping required.",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    postedAt: "1 day ago",
    category: "Design"
  },
  {
    id: 3,
    title: "Content Writer",
    company: "Marketing Agency",
    location: "Remote",
    type: "Part-time",
    salary: "$30 - $50/hour",
    description: "Write engaging content for various clients including blog posts, social media content, and marketing materials.",
    skills: ["Content Writing", "SEO", "Social Media", "Research"],
    postedAt: "3 days ago",
    category: "Writing"
  },
  {
    id: 4,
    title: "Mobile App Developer",
    company: "InnovateTech",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$90,000 - $140,000",
    description: "Develop native mobile applications for iOS and Android platforms. Experience with React Native preferred.",
    skills: ["React Native", "Swift", "Kotlin", "Firebase"],
    postedAt: "1 week ago",
    category: "Development"
  },
  {
    id: 5,
    title: "Digital Marketing Specialist",
    company: "Growth Co.",
    location: "Remote",
    type: "Contract",
    salary: "$40 - $65/hour",
    description: "Plan and execute digital marketing campaigns across multiple channels. Analytics and performance tracking experience required.",
    skills: ["Google Ads", "Facebook Ads", "Analytics", "SEO"],
    postedAt: "4 days ago",
    category: "Marketing"
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataFlow Systems",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$100,000 - $150,000",
    description: "Analyze complex datasets and build machine learning models to drive business insights and decision making.",
    skills: ["Python", "Machine Learning", "SQL", "Tableau"],
    postedAt: "5 days ago",
    category: "Data Science"
  }
];

export function BrowseJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || job.category.toLowerCase() === selectedCategory;
    const matchesType = selectedType === "all" || job.type.toLowerCase() === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Job</h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover thousands of opportunities from top companies worldwide
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search jobs, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg" className="h-12 px-8">
                Search Jobs
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
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block mb-2">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="data science">Data Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block mb-2">Job Type</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredJobs.length} Jobs Found
              </h2>
              <Select defaultValue="newest">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="salary-high">Highest Salary</SelectItem>
                  <SelectItem value="salary-low">Lowest Salary</SelectItem>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Posted {job.postedAt}</span>
                      <Button>Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}