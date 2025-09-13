import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Plus, Users, Briefcase, DollarSign, Settings, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function ClientDashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const welcomeMessage = location.state?.message;
  const isNewUser = location.state?.isNewUser;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome message for new users */}
      {welcomeMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">🎉</span>
            <span>{welcomeMessage}</span>
          </div>
          {isNewUser && (
            <p className="text-sm mt-2">
              Start by posting your first job to find amazing freelancers!
            </p>
          )}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your projects and find the perfect freelancers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 completed this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,23,456</div>
            <p className="text-xs text-muted-foreground">Across 12 projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hired Freelancers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">Project completion</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">E-commerce Platform</h3>
                  <p className="text-sm text-gray-600">Freelancer: John Doe</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  In Progress
                </span>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Logo Design</h3>
                  <p className="text-sm text-gray-600">Freelancer: Sarah Smith</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Completed
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Post a New Job
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Find Freelancers
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Team
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
