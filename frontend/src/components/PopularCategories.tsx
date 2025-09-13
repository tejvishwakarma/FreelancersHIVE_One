import { Code, Palette, PenTool, Megaphone, Camera, BarChart, Globe, Music } from "lucide-react";
import { Button } from "./ui/button";

export function PopularCategories() {
  const categories = [
    {
      icon: Code,
      title: "Web Development",
      description: "Frontend, Backend, Full-stack developers",
      jobs: "2,500+ jobs",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-500"
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Logo, UI/UX, Print design specialists",
      jobs: "1,800+ jobs",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-500"
    },
    {
      icon: PenTool,
      title: "Content Writing",
      description: "Copywriting, Blog posts, Technical writing",
      jobs: "1,200+ jobs",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-500"
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description: "SEO, Social media, Advertising campaigns",
      jobs: "950+ jobs",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-500"
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Product, Portrait, Event photography",
      jobs: "650+ jobs",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      iconBg: "bg-pink-500"
    },
    {
      icon: BarChart,
      title: "Data Analysis",
      description: "Business intelligence, Analytics, Research",
      jobs: "800+ jobs",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      iconBg: "bg-indigo-500"
    },
    {
      icon: Globe,
      title: "Translation",
      description: "Document, Website, Audio translation",
      jobs: "450+ jobs",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      iconBg: "bg-teal-500"
    },
    {
      icon: Music,
      title: "Audio & Video",
      description: "Video editing, Voice-over, Music production",
      jobs: "550+ jobs",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconBg: "bg-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore thousands of opportunities across various skill categories and find the perfect match for your expertise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-2xl p-1 group cursor-pointer transform hover:scale-105 transition-all duration-300`}
              style={{
                background: `linear-gradient(135deg, ${category.color.includes('blue') ? '#3b82f6' : 
                  category.color.includes('purple') ? '#8b5cf6' : 
                  category.color.includes('green') ? '#10b981' : 
                  category.color.includes('orange') ? '#f59e0b' : 
                  category.color.includes('pink') ? '#ec4899' : 
                  category.color.includes('indigo') ? '#6366f1' : 
                  category.color.includes('teal') ? '#14b8a6' : '#ef4444'}, ${category.color.includes('blue') ? '#2563eb' : 
                  category.color.includes('purple') ? '#7c3aed' : 
                  category.color.includes('green') ? '#059669' : 
                  category.color.includes('orange') ? '#d97706' : 
                  category.color.includes('pink') ? '#db2777' : 
                  category.color.includes('indigo') ? '#4f46e5' : 
                  category.color.includes('teal') ? '#0d9488' : '#dc2626'})`
              }}
            >
              <div className="bg-white rounded-xl p-6 h-full">
                <div className={`w-16 h-16 ${category.iconBg} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
                    {category.jobs}
                  </span>
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8 hover:bg-primary hover:text-white transition-colors">
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
}