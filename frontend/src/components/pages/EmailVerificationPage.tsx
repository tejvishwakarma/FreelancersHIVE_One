import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";

export function EmailVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { setUserFromVerification } = useAuth(); // ✅ Get from context
  
  const email = location.state?.email || "";

  // Countdown for resend button
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && value !== "") {
      handleVerifyOTP([...newOtp.slice(0, 5), value].join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
    
    if (pastedData.length === 6) {
      handleVerifyOTP(pastedData);
    }
  };

  const handleVerifyOTP = async (otpString?: string) => {
    const otpToVerify = otpString || otp.join("");
    
    if (otpToVerify.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpToVerify }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Verification failed');
      }

      // ✅ Set user in context using the method from AuthContext
      setUserFromVerification(result.data.user, result.data.token);
      
      // ✅ Determine dashboard route (declare variables only once)
      const dashboardRoute = result.data.user.userType === 'FREELANCER' 
        ? '/freelancer-dashboard' 
        : '/client-dashboard';
      
      console.log(`✅ ${result.data.user.userType} verified successfully, redirecting to ${dashboardRoute}`);
      
      // Navigate with replace to prevent going back to verification page
      navigate(dashboardRoute, { 
        replace: true,
        state: { 
          message: `Welcome to FreelancersHIVE, ${result.data.user.firstName}! Your email has been verified.`,
          isNewUser: true
        }
      });
      
    } catch (err: any) {
      setError(err.message || 'Verification failed');
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setError("");

    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to resend OTP');
      }

      setTimeLeft(60);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification code');
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>No email found. Please register first.</p>
            <Link to="/register" className="text-blue-600 hover:underline">
              Go to Registration
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto h-12 w-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Verify Your Email
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-sm font-medium text-blue-600">{email}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 text-center">
                Enter verification code
              </label>
              
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center text-lg font-bold border-2 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            <Button 
              onClick={() => handleVerifyOTP()}
              className="w-full h-12 text-base font-medium" 
              disabled={isLoading || otp.join("").length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </Button>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Didn't receive the code?
              </p>
              
              <Button
                variant="outline"
                onClick={handleResendOTP}
                disabled={timeLeft > 0 || isResending}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : timeLeft > 0 ? (
                  `Resend code in ${timeLeft}s`
                ) : (
                  'Resend verification code'
                )}
              </Button>

              <Link 
                to="/login" 
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
