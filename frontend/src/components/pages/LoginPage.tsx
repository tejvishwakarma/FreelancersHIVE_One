import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Eye, EyeOff, Mail, Lock, User, Building } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from "../../contexts/AuthContext";

export function LoginPage() {
  const [activeTab, setActiveTab] = useState("freelancer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Always pass the selected userType
      const selectedUserType = activeTab === 'freelancer' ? 'FREELANCER' : 'CLIENT';
      await login(formData.email, formData.password, selectedUserType);

      // Navigate to appropriate dashboard
      const dashboardPath = activeTab === 'freelancer' ? '/freelancer-dashboard' : '/client-dashboard';
      navigate(dashboardPath, { replace: true });
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setError("");
      // Pass userType for Google login as well
      await googleLogin(credentialResponse, activeTab === 'freelancer' ? 'FREELANCER' : 'CLIENT');

      const dashboardPath = activeTab === 'freelancer' ? '/freelancer-dashboard' : '/client-dashboard';
      navigate(dashboardPath, { replace: true });
    } catch (err: any) {
      setError(err.message || "Google login failed");
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFreelancer = activeTab === "freelancer";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
                Welcome back
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Sign in to your FreelancersHIVE account
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* User Type Selection Tabs */}
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
                  Access your freelancer dashboard
                </div>
              </TabsContent>

              <TabsContent value="client" className="space-y-4">
                <div className="text-center text-sm text-gray-600 mb-4">
                  Access your client dashboard
                </div>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Enter your password"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                    disabled={isLoading}
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : `Sign in as ${isFreelancer ? 'Freelancer' : 'Client'}`}
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
                containerProps={{
                  className: "w-full"
                }}
              />
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account?{" "}</span>
              <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign up for free
              </Link>
            </div>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
