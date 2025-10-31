"use client";

import { useState, useEffect } from "react";
import {
  Wallet,
  TrendingUp,
  Briefcase,
  Clock,
  Bell,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertCircle,
  Info,
  BadgeCheck,
  Zap,
  Award,
  Activity as ActivityIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { toast } from "sonner";

interface UserStats {
  totalGigsCompleted: number;
  totalEarnings: number;
  activeGigs: number;
  successRate: number;
  reputationScore: number;
}

interface ActivityItem {
  id: number;
  activityType: string;
  title: string;
  description: string;
  amount: number | null;
  relatedGigId: number | null;
  createdAt: string;
}

interface PlatformStats {
  totalGigs: number;
  totalPaid: string;
  totalFreelancers: number;
  successRate: string;
}

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: any;
  description: string;
}

interface Notification {
  id: string;
  type: "advance" | "repay" | "escrow" | "reputation" | "endorsement";
  title: string;
  message: string;
  time: string;
  status: "success" | "warning" | "info" | "error";
  icon: any;
}

export default function DashboardContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  // Mock user ID - in real app, get from auth session
  const userId = "user_1";

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activitiesRes, platformRes] = await Promise.all([
        fetch(`/api/dashboard/stats?user_id=${userId}`),
        fetch(`/api/dashboard/activities?user_id=${userId}&limit=10`),
        fetch(`/api/dashboard/platform-stats`),
      ]);

      if (statsRes.ok) {
        const data = await statsRes.json();
        setUserStats(data);
      } else {
        toast.error("Failed to load user statistics");
      }

      if (activitiesRes.ok) {
        const data = await activitiesRes.json();
        setActivities(data.activities || []);
      }

      if (platformRes.ok) {
        const data = await platformRes.json();
        setPlatformStats(data);
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "gig_completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "payment_received":
        return <DollarSign className="w-4 h-4 text-primary" />;
      case "milestone_approved":
        return <Award className="w-4 h-4 text-accent" />;
      case "gig_started":
        return <Briefcase className="w-4 h-4 text-blue-500" />;
      case "withdrawal_completed":
        return <Wallet className="w-4 h-4 text-purple-500" />;
      case "escrow_deposited":
        return <Zap className="w-4 h-4 text-yellow-500" />;
      case "review_received":
        return <BadgeCheck className="w-4 h-4 text-accent" />;
      case "profile_updated":
        return <Users className="w-4 h-4 text-muted-foreground" />;
      default:
        return <ActivityIcon className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const stats: StatCard[] = userStats
    ? [
        {
          title: "Active Gigs",
          value: userStats.activeGigs.toString(),
          change: "+2",
          changeType: "up",
          icon: Briefcase,
          description: "Currently in progress",
        },
        {
          title: "Total Earnings",
          value: `$${userStats.totalEarnings.toLocaleString()}`,
          change: "+8.2%",
          changeType: "up",
          icon: DollarSign,
          description: "Lifetime earnings",
        },
        {
          title: "Completed Gigs",
          value: userStats.totalGigsCompleted.toString(),
          change: `${userStats.successRate.toFixed(1)}%`,
          changeType: "up",
          icon: CheckCircle,
          description: "Success rate",
        },
        {
          title: "Reputation Score",
          value: `${userStats.reputationScore}`,
          change: "+12",
          changeType: "up",
          icon: BadgeCheck,
          description: `Level ${Math.floor(userStats.reputationScore / 100)}`,
        },
      ]
    : [];

  const notifications: Notification[] = [
    {
      id: "1",
      type: "advance",
      title: "Advance Approved",
      message: "$500 advance for Web Design Project has been approved",
      time: "5 min ago",
      status: "success",
      icon: CheckCircle,
    },
    {
      id: "2",
      type: "escrow",
      title: "Escrow Locked",
      message: "Client deposited $1,200 to escrow for Mobile App project",
      time: "1 hour ago",
      status: "info",
      icon: Info,
    },
    {
      id: "3",
      type: "repay",
      title: "Repayment Due Soon",
      message: "$300 repayment due in 3 days for Logo Design advance",
      time: "2 hours ago",
      status: "warning",
      icon: AlertCircle,
    },
    {
      id: "4",
      type: "reputation",
      title: "Reputation Updated",
      message: "Your rating increased after completing E-commerce project",
      time: "5 hours ago",
      status: "success",
      icon: BadgeCheck,
    },
    {
      id: "5",
      type: "endorsement",
      title: "Endorsement Received",
      message: "Senior Developer endorsed you for React Development",
      time: "1 day ago",
      status: "success",
      icon: Users,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-accent" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <Info className="w-5 h-5 text-primary" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Info className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "border-accent/50 bg-accent/10";
      case "warning":
        return "border-yellow-500/50 bg-yellow-500/10";
      case "info":
        return "border-primary/50 bg-primary/10";
      case "error":
        return "border-destructive/50 bg-destructive/10";
      default:
        return "border-border bg-card";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-card rounded w-48 mb-2" />
            <div className="h-4 bg-card rounded w-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-card rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your DeFi gig activity
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            size="lg"
            className="crypto-gradient text-white hover:opacity-90 h-auto py-4"
            onClick={() => router.push("/browse")}
          >
            <Briefcase className="mr-2 h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-semibold">Browse Gigs</span>
              <span className="text-xs opacity-90">Find new opportunities</span>
            </div>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 h-auto py-4"
            onClick={() => router.push("/investor")}
          >
            <Wallet className="mr-2 h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-semibold">Invest in Pool</span>
              <span className="text-xs text-muted-foreground">
                Earn passive income
              </span>
            </div>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-accent/50 h-auto py-4"
            onClick={() => router.push("/my-gigs")}
          >
            <Clock className="mr-2 h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-semibold">View Progress</span>
              <span className="text-xs text-muted-foreground">
                Track active gigs
              </span>
            </div>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="glass-effect border-primary/20 hover:border-primary/40 transition-all"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="flex items-center text-xs">
                  {stat.changeType === "up" ? (
                    <ArrowUpRight className="w-3 h-3 text-accent mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-destructive mr-1" />
                  )}
                  <span
                    className={
                      stat.changeType === "up"
                        ? "text-accent"
                        : "text-destructive"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {stat.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Stats */}
        {platformStats && (
          <Card className="p-6 glass-effect border-primary/20 mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Platform Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Gigs</p>
                <p className="text-2xl font-bold">
                  {platformStats.totalGigs.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold">{platformStats.totalPaid}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Freelancers</p>
                <p className="text-2xl font-bold">
                  {platformStats.totalFreelancers.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">
                  {platformStats.successRate}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
              <Badge
                variant="destructive"
                className="ml-2 px-1.5 py-0 text-[10px]"
              >
                {notifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Gigs Card */}
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Active Gigs
                  </CardTitle>
                  <CardDescription>
                    Your current work in progress
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "E-commerce Website",
                      progress: 75,
                      deadline: "3 days",
                    },
                    {
                      name: "Mobile App Design",
                      progress: 45,
                      deadline: "7 days",
                    },
                    { name: "Logo Redesign", progress: 90, deadline: "1 day" },
                  ].map((gig, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{gig.name}</span>
                        <span className="text-muted-foreground">
                          Due in {gig.deadline}
                        </span>
                      </div>
                      <Progress value={gig.progress} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {gig.progress}% complete
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Pool Status Card */}
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Pool Status
                  </CardTitle>
                  <CardDescription>
                    Your investment and financing overview
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Invested in Pool
                      </div>
                      <div className="text-xl font-bold text-accent">
                        $5,000
                      </div>
                    </div>
                    <Wallet className="w-8 h-8 text-accent" />
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Advances Received
                      </div>
                      <div className="text-xl font-bold text-primary">
                        $1,200
                      </div>
                    </div>
                    <Zap className="w-8 h-8 text-primary" />
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-card border border-border">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Pending Repayment
                      </div>
                      <div className="text-xl font-bold">$800</div>
                    </div>
                    <Clock className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  All Notifications
                </CardTitle>
                <CardDescription>
                  Stay updated on your gig activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${getStatusColor(
                        notification.status,
                      )}`}
                    >
                      <div className="flex items-start gap-3">
                        {getStatusIcon(notification.status)}
                        <div className="flex-1">
                          <div className="font-semibold mb-1">
                            {notification.title}
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {notification.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activities
                </CardTitle>
                <CardDescription>
                  Your latest transactions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <ActivityIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No activities yet</p>
                    </div>
                  ) : (
                    activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 p-4 rounded-lg bg-card/30 hover:bg-card/50 transition-all border border-border/40"
                      >
                        <div className="p-2 rounded-lg bg-background">
                          {getActivityIcon(activity.activityType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-sm">
                              {activity.title}
                            </h4>
                            {activity.amount && (
                              <Badge className="crypto-gradient text-white border-0 shrink-0">
                                ${activity.amount.toLocaleString()}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(activity.createdAt)}
                            </span>
                            {activity.relatedGigId && (
                              <span>Gig #{activity.relatedGigId}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
