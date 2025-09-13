import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { 
  Upload, 
  X, 
  DollarSign, 
  Clock, 
  Users, 
  FileText,
  Plus,
  Minus
} from "lucide-react";
import { useState } from "react";

const categories = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Graphic Design",
  "Content Writing",
  "Digital Marketing",
  "Data Science",
  "DevOps",
  "Project Management"
];

const skillSuggestions = [
  "React", "JavaScript", "Python", "Node.js", "PHP", "Angular", "Vue.js",
  "Figma", "Adobe Photoshop", "Sketch", "InVision", "Canva",
  "SEO", "Google Ads", "Social Media", "Content Strategy",
  "Machine Learning", "SQL", "Tableau", "R", "TensorFlow"
];

export function PostJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    requirements: "",
    budget: "",
    budgetType: "fixed",
    duration: "",
    experienceLevel: "",
    skills: [] as string[],
    attachments: [] as File[],
    isUrgent: false,
    isRemoteOnly: true
  });

  const [newSkill, setNewSkill] = useState("");
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job posting:", formData);
    // Handle job posting logic
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      handleInputChange("skills", [...formData.skills, skill.trim()]);
      setNewSkill("");
      setShowSkillSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    handleInputChange("skills", formData.skills.filter(skill => skill !== skillToRemove));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleInputChange("attachments", [...formData.attachments, ...files]);
  };

  const removeFile = (fileToRemove: File) => {
    handleInputChange("attachments", formData.attachments.filter(file => file !== fileToRemove));
  };

  const filteredSkillSuggestions = skillSuggestions.filter(skill => 
    skill.toLowerCase().includes(newSkill.toLowerCase()) && 
    !formData.skills.includes(skill)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
            <p className="text-gray-600">Find the perfect freelancer for your project</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block mb-2">Job Title *</label>
                  <Input
                    placeholder="e.g., Build a responsive e-commerce website"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Write a clear, descriptive title that explains what you need done
                  </p>
                </div>

                <div>
                  <label className="block mb-2">Category *</label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block mb-2">Project Description *</label>
                  <Textarea
                    placeholder="Describe your project in detail. Include what you want to achieve, any specific requirements, and what success looks like..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2">Requirements & Qualifications</label>
                  <Textarea
                    placeholder="List any specific requirements, qualifications, or experience needed for this project..."
                    value={formData.requirements}
                    onChange={(e) => handleInputChange("requirements", e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills & Expertise */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block mb-2">Required Skills</label>
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        placeholder="Add skills (e.g., React, JavaScript, UI Design)"
                        value={newSkill}
                        onChange={(e) => {
                          setNewSkill(e.target.value);
                          setShowSkillSuggestions(true);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill(newSkill);
                          }
                        }}
                      />
                      {showSkillSuggestions && newSkill && filteredSkillSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-48 overflow-y-auto">
                          {filteredSkillSuggestions.slice(0, 5).map((skill) => (
                            <button
                              key={skill}
                              type="button"
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => addSkill(skill)}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {formData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="px-3 py-1">
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-2 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Experience Level</label>
                  <Select value={formData.experienceLevel} onValueChange={(value) => handleInputChange("experienceLevel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Budget & Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Budget & Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block mb-2">Budget Type</label>
                  <Select value={formData.budgetType} onValueChange={(value) => handleInputChange("budgetType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Price</SelectItem>
                      <SelectItem value="hourly">Hourly Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block mb-2">
                    Budget {formData.budgetType === "hourly" ? "(per hour)" : "(total project)"}
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="number"
                      placeholder={formData.budgetType === "hourly" ? "25" : "5000"}
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Project Duration</label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-week">Less than 1 week</SelectItem>
                      <SelectItem value="1-4-weeks">1-4 weeks</SelectItem>
                      <SelectItem value="1-3-months">1-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="6-months-plus">6+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Additional Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Additional Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgent"
                      checked={formData.isUrgent}
                      onCheckedChange={(checked) => handleInputChange("isUrgent", checked)}
                    />
                    <label htmlFor="urgent" className="font-medium">
                      This is an urgent project
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remote"
                      checked={formData.isRemoteOnly}
                      onCheckedChange={(checked) => handleInputChange("isRemoteOnly", checked)}
                    />
                    <label htmlFor="remote" className="font-medium">
                      Remote work only
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Attachments (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Upload project files, mockups, or references</p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button type="button" variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </label>
                  </div>
                  
                  {formData.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-between items-center">
              <Button type="button" variant="outline" size="lg">
                Save as Draft
              </Button>
              <Button type="submit" size="lg" className="px-8">
                Post Job
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}