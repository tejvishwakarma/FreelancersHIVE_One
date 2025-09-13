import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/pages/HomePage";
import { BrowseJobsPage } from "./components/pages/BrowseJobsPage";
import { FindFreelancersPage } from "./components/pages/FindFreelancersPage";
import { AboutPage } from "./components/pages/AboutPage";
import { ContactPage } from "./components/pages/ContactPage";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { DashboardPage } from "./components/pages/DashboardPage";
import { PostJobPage } from "./components/pages/PostJobPage";
import FreelancerDashboard from "./components/pages/FreelancerDashboard";
import ClientDashboard from "./components/pages/ClientDashboard";
import { ForgotPasswordPage } from "./components/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/pages/ResetPasswordPage";
import ProtectedRoute from './components/ProtectedRoute';
import { EmailVerificationPage } from "./components/pages/EmailVerificationPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/browse-jobs" element={<BrowseJobsPage />} />
            <Route path="/find-freelancers" element={<FindFreelancersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            
            {/* Protected Routes - Role-based Dashboards */}
            <Route 
              path="/freelancer-dashboard" 
              element={
                <ProtectedRoute>
                  <FreelancerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/client-dashboard" 
              element={
                <ProtectedRoute>
                  <ClientDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Legacy Routes */}
            <Route path="/dashboard" element={<Navigate to="/freelancer-dashboard" />} />
            <Route path="/post-job" element={<PostJobPage />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
