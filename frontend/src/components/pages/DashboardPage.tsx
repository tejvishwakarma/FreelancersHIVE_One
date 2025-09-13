import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Star, 
  MessageSquare, 
  Calendar,
  FileText,
  Users,
  Plus,
  Settings
} from "lucide-react";

const stats = [
  {
    title: "Total Earnings",
    value: "$12,450",
    change: "+12%",
    icon: DollarSign,
    positive: true
  },
  {
    title: "Active Projects",
    value: "8",
    change: "+2",
    icon: Clock,
    positive: true
  },
  {
    title: "Completed Projects",
    value: "24",
    change: "+4",
    icon: CheckCircle,
    positive: true
  },
  {
    title: "Client Rating",
    value: "4.9",
    change: "+0.1",
    icon: Star,
    positive: true
  }
];

const recentProjects = [
  {
    id: 1,
    title: "E-commerce Website Development",
    client: "TechStart Inc.",
    status: "In Progress",
    progress: 75,
    dueDate: "2024-09-15",
    amount: "$3,500"
  },
  {
    id: 2,
    title: "Mobile App UI Design",
    client: "Design Studio",
    status: "Review",
    progress: 100,
    dueDate: "2024-09-10",
    amount: "$2,200"
  },
  {
    id: 3,
    title: "Content Marketing Strategy",
    client: "Marketing Agency",
    status: "In Progress",
    progress: 40,
    dueDate: "2024-09-20",
    amount: "$1,800"
  }
];

const messages = [
  {
    id: 1,
    client: "Sarah Johnson",
    avatar: "/api/placeholder/40/40",
    message: "Great progress on the website! Could we schedule a call to discuss the next phase?",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    client: "Mike Chen",
    avatar: "/api/placeholder/40/40",
    message: "The designs look perfect. Please proceed with the development.",
    time: "1 day ago",
    unread: false
  },
  {
    id: 3,
    client: "Emily Rodriguez",
    avatar: "/api/placeholder/40/40",
    message: "Thank you for the quick turnaround. The content strategy is exactly what we needed.",
    time: "2 days ago",
    unread: false
  }
];

const upcomingTasks = [
  {
    id: 1,
    title: "Complete homepage design",
    project: "E-commerce Website",
    dueDate: "Today, 5:00 PM",
    priority: "high"
  },
  {
    id: 2,
    title: "Client presentation",
    project: "Mobile App UI",
    dueDate: "Tomorrow, 2:00 PM",
    priority: "medium"
  },
  {
    id: 3,
    title: "Content calendar review",
    project: "Marketing Strategy",
    dueDate: "Sep 12, 10:00 AM",
    priority: "low"
  }
];

export function DashboardPage() {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your overview</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Projects */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Projects</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-gray-600">{project.client}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                          <p className="text-sm font-semibold mt-1">{project.amount}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="w-full" />
                        <p className="text-sm text-gray-500">Due: {project.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.project}</p>
                        <p className="text-xs text-gray-500">{task.dueDate}</p>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Messages */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Messages</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar} alt={message.client} />
                        <AvatarFallback>{message.client.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium">{message.client}</h4>
                          {message.unread && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{message.message}</p>
                        <p className="text-xs text-gray-500">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Create Proposal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Invite Team Member
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}