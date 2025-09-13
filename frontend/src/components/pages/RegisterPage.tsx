import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Eye, EyeOff, Mail, Lock, User, Building, Github } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from "../../contexts/AuthContext";

export function RegisterPage() {
  const [activeTab, setActiveTab] = useState("freelancer");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // company: "",
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          userType: activeTab === 'freelancer' ? 'FREELANCER' : 'CLIENT'
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      // 🎯 Redirect to email verification page
      navigate('/verify-email', {
        state: { email: formData.email },
        replace: true
      });
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setError("");
      await googleLogin(credentialResponse);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || "Google registration failed");
    }
  };

  const handleGoogleError = () => {
    setError("Google registration failed. Please try again.");
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFreelancer = activeTab === "freelancer";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg shadow-2xl border-0">
        <CardHeader className="space-y-1 pb-6">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
              Join FreelancersHIVE
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Join thousands of professionals worldwide
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="freelancer" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Freelancer
              </TabsTrigger>
              <TabsTrigger value="client" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Client
              </TabsTrigger>
            </TabsList>

            <TabsContent value="freelancer" className="space-y-4">
              <div className="text-center text-sm text-gray-600 mb-4">
                Find great projects and build your freelance career
              </div>
            </TabsContent>

            <TabsContent value="client" className="space-y-4">
              <div className="text-center text-sm text-gray-600 mb-4">
                Hire talented freelancers for your projects
              </div>
            </TabsContent>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="h-12"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="h-12"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* {!isFreelancer && (
              <div className="space-y-2">
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="pl-10 h-12"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            )} */}

            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 h-12"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                className="mt-1"
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={isLoading || !formData.agreeToTerms}
            >
              {isLoading ? 'Creating account...' : `Create ${isFreelancer ? 'freelancer' : 'client'} account`}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="signin_with"
              shape="rectangular"
              width="100%"
            />
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account?{" "}</span>
            <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
