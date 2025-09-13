import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, HelpCircle, Briefcase } from "lucide-react";
import { useState } from "react";

const contactReasons = [
  { value: "general", label: "General Inquiry", icon: MessageCircle },
  { value: "support", label: "Technical Support", icon: HelpCircle },
  { value: "business", label: "Business Partnership", icon: Briefcase },
  { value: "feedback", label: "Feedback & Suggestions", icon: MessageCircle }
];

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Innovation Drive", "San Francisco, CA 94105", "United States"]
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "Mon-Fri 9AM-6PM PST"]
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@freelancehub.com", "support@freelancehub.com"]
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 9AM - 6PM PST", "Saturday: 10AM - 4PM PST", "Sunday: Closed"]
  }
];

const faqs = [
  {
    question: "How do I get started as a freelancer?",
    answer: "Simply create an account, complete your profile with your skills and portfolio, and start applying to relevant projects."
  },
  {
    question: "What fees does FreelanceHub charge?",
    answer: "We charge a small service fee only when you successfully complete a project. There are no upfront costs or hidden charges."
  },
  {
    question: "How do I ensure quality freelancers?",
    answer: "All freelancers go through our verification process. You can also review portfolios, ratings, and past client feedback before hiring."
  },
  {
    question: "What payment methods are supported?",
    answer: "We support all major credit cards, PayPal, and bank transfers. Payments are processed securely through our platform."
  }
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      reason: "",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-600 mb-8">
              We're here to help! Reach out to us with any questions, feedback, or support needs.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2">Full Name *</label>
                      <Input
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2">How can we help? *</label>
                    <Select value={formData.reason} onValueChange={(value) => handleInputChange("reason", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason for contact" />
                      </SelectTrigger>
                      <SelectContent>
                        {contactReasons.map((reason) => (
                          <SelectItem key={reason.value} value={reason.value}>
                            {reason.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block mb-2">Subject *</label>
                    <Input
                      placeholder="Brief description of your inquiry"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Message *</label>
                    <Textarea
                      placeholder="Please provide details about your inquiry..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactReasons.map((reason) => {
                  const Icon = reason.icon;
                  return (
                    <Button
                      key={reason.value}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleInputChange("reason", reason.value)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {reason.label}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions. If you don't see what you're looking for, 
              feel free to contact us directly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Support Hours */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
          <p className="text-gray-600 mb-6">
            Our support team is available during business hours to assist you with any urgent matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Phone className="h-5 w-5 mr-2" />
              Call Support
            </Button>
            <Button variant="outline" size="lg">
              <MessageCircle className="h-5 w-5 mr-2" />
              Live Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}