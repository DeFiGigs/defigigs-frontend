"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  Lock,
  CheckCircle,
  XCircle,
  DollarSign,
  Clock,
  Users,
  Eye,
  Plus,
  FileText,
  AlertCircle,
  TrendingUp,
  Shield,
  Star,
  Loader2,
  Bell,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface EmployerStats {
  activeGigs: number;
  totalSpent: number;
  escrowLocked: number;
  completedProjects: number;
}

interface Milestone {
  id: number;
  gigId: number;
  title: string;
  description: string | null;
  amount: number;
  status: string;
  orderIndex: number;
  submissionUrl: string | null;
  submissionNote: string | null;
  reviewComments: string | null;
  submittedAt: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Applicant {
  id: number;
  gigId: number;
  workerName: string;
  workerWallet: string;
  workerRating: number | null;
  proposal: string;
  proposedAmount: number;
  status: string;
  appliedAt: string;
}

interface PostedGig {
  id: number;
  employerId: number;
  title: string;
  description: string;
  category: string;
  requiredSkills: string;
  deadline: string;
  paymentAmount: number;
  escrowAmount: number;
  escrowStatus: string;
  status: string;
  assignedWorkerId: number | null;
  assignedWorkerName: string | null;
  assignedWorkerRating: number | null;
  applicantsCount: number;
  progress: number;
  createdAt: string;
  updatedAt: string;
  milestones?: Milestone[];
  applicants?: Applicant[];
}

interface Notification {
  id: number;
  employerId: number;
  eventType: string;
  gigId: number | null;
  gigTitle: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function EmployerContent() {
  const [showPostGig, setShowPostGig] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [selectedGig, setSelectedGig] = useState<PostedGig | null>(null);
  const [showApplicants, setShowApplicants] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedApplicantGig, setSelectedApplicantGig] =
    useState<PostedGig | null>(null);

  // Data states
  const [postedGigs, setPostedGigs] = useState<PostedGig[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [gigForm, setGigForm] = useState({
    title: "",
    description: "",
    category: "",
    required_skills: "",
    deadline: "",
    payment_amount: "",
    duration_days: "",
  });

  const [ratingForm, setRatingForm] = useState({
    rating: 0,
    feedback: "",
  });

  // Mock wallet address - in production this would come from wallet connection
  const employerWallet = "0x1234abcd5678ef90employer1234567890abcdef12";

  // Calculate stats from gigs
  const stats: EmployerStats = {
    activeGigs: postedGigs.filter((g) =>
      ["open", "in_progress", "under_review"].includes(g.status),
    ).length,
    totalSpent: postedGigs
      .filter((g) => g.status === "completed")
      .reduce((sum, g) => sum + g.paymentAmount, 0),
    escrowLocked: postedGigs.reduce((sum, g) => sum + g.escrowAmount, 0),
    completedProjects: postedGigs.filter((g) => g.status === "completed")
      .length,
  };

  // Fetch gigs and notifications
  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Fetch gigs
      const gigsRes = await fetch(
        `/api/employer/gig-status?employer_wallet=${employerWallet}`,
      );
      if (gigsRes.ok) {
        const gigsData = await gigsRes.json();
        setPostedGigs(gigsData.gigs || []);
      }

      // Fetch notifications
      const notifRes = await fetch(
        `/api/employer/notifications?employer_wallet=${employerWallet}&limit=20`,
      );
      if (notifRes.ok) {
        const notifData = await notifRes.json();
        setNotifications(notifData.notifications || []);
        setUnreadCount(notifData.unread_count || 0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePostGig = async () => {
    if (
      !gigForm.title ||
      !gigForm.description ||
      !gigForm.category ||
      !gigForm.required_skills ||
      !gigForm.deadline ||
      !gigForm.payment_amount
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const paymentAmount = parseFloat(gigForm.payment_amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      toast.error("Please enter a valid payment amount");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/employer/create-gig", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employer_wallet: employerWallet,
          title: gigForm.title,
          description: gigForm.description,
          category: gigForm.category,
          required_skills: gigForm.required_skills,
          deadline: new Date(gigForm.deadline).toISOString(),
          payment_amount: paymentAmount,
          duration_days: gigForm.duration_days
            ? parseInt(gigForm.duration_days)
            : null,
        }),
      });

      if (res.ok) {
        toast.success("Gig created successfully!");
        setShowPostGig(false);
        setGigForm({
          title: "",
          description: "",
          category: "",
          required_skills: "",
          deadline: "",
          payment_amount: "",
          duration_days: "",
        });
        fetchData();
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to create gig");
      }
    } catch (error) {
      console.error("Error creating gig:", error);
      toast.error("Failed to create gig");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDepositEscrow = async (gig: PostedGig) => {
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/employer/deposit-escrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gig_id: gig.id,
          employer_wallet: employerWallet,
          amount: gig.paymentAmount,
        }),
      });

      if (res.ok) {
        toast.success(`$${gig.paymentAmount} deposited to escrow!`);
        fetchData();
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to deposit escrow");
      }
    } catch (error) {
      console.error("Error depositing escrow:", error);
      toast.error("Failed to deposit escrow");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssignWorker = async (gig: PostedGig, applicant: Applicant) => {
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/employer/assign-worker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gig_id: gig.id,
          applicant_id: applicant.id,
          worker_name: applicant.workerName,
          worker_rating: applicant.workerRating,
        }),
      });

      if (res.ok) {
        toast.success(`${applicant.workerName} assigned to gig!`);
        setShowApplicants(false);
        fetchData();
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to assign worker");
      }
    } catch (error) {
      console.error("Error assigning worker:", error);
      toast.error("Failed to assign worker");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveWork = async (gig: PostedGig, milestone?: Milestone) => {
    try {
      setIsSubmitting(true);

      if (milestone) {
        // Approve specific milestone
        const res = await fetch("/api/employer/approve-milestone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            milestone_id: milestone.id,
            gig_id: gig.id,
            approval_status: "approved",
            review_comments: "Work approved",
            rating: ratingForm.rating || undefined,
          }),
        });

        if (res.ok) {
          toast.success("Milestone approved! Payment processing...");
          setShowVerification(false);
          setRatingForm({ rating: 0, feedback: "" });
          fetchData();
        } else {
          const error = await res.json();
          toast.error(error.error || "Failed to approve milestone");
        }
      }
    } catch (error) {
      console.error("Error approving work:", error);
      toast.error("Failed to approve work");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectWork = async (milestone: Milestone, gigId: number) => {
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/employer/approve-milestone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          milestone_id: milestone.id,
          gig_id: gigId,
          approval_status: "revision_requested",
          review_comments: "Revision requested",
        }),
      });

      if (res.ok) {
        toast.success("Revision requested");
        fetchData();
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to request revision");
      }
    } catch (error) {
      console.error("Error requesting revision:", error);
      toast.error("Failed to request revision");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRateWorker = async (gig: PostedGig) => {
    if (!ratingForm.rating || ratingForm.rating < 1 || ratingForm.rating > 5) {
      toast.error("Please select a rating between 1 and 5");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/employer/rate-worker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gig_id: gig.id,
          employer_wallet: employerWallet,
          worker_id: gig.assignedWorkerId,
          worker_name: gig.assignedWorkerName,
          rating: ratingForm.rating,
          feedback: ratingForm.feedback || undefined,
        }),
      });

      if (res.ok) {
        toast.success("Worker rated successfully!");
        setRatingForm({ rating: 0, feedback: "" });
        fetchData();
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to rate worker");
      }
    } catch (error) {
      console.error("Error rating worker:", error);
      toast.error("Failed to rate worker");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
      case "published":
        return <Badge className="bg-primary text-white">Open</Badge>;
      case "in_progress":
        return <Badge className="bg-yellow-500 text-white">In Progress</Badge>;
      case "under_review":
        return <Badge className="bg-purple-500 text-white">Under Review</Badge>;
      case "completed":
        return <Badge className="bg-accent text-white">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-destructive text-white">Cancelled</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `${diffDays} days`;
    return date.toLocaleDateString();
  };

  const getSubmittedMilestones = (gig: PostedGig) => {
    return gig.milestones?.filter((m) => m.status === "submitted") || [];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Employer Panel
              </h1>
              <p className="text-muted-foreground">
                Post gigs, manage escrow, and verify completed work
              </p>
            </div>
            <div className="flex gap-2">
              {/* Notifications Button */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowNotifications(true)}
                  className="relative"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </div>

              {/* Post New Gig Dialog */}
              <Dialog open={showPostGig} onOpenChange={setShowPostGig}>
                <DialogTrigger asChild>
                  <Button className="crypto-gradient text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Post New Gig
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Post a New Gig</DialogTitle>
                    <DialogDescription>
                      Create a new job listing and deposit payment to escrow
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Gig Title *</Label>
                      <Input
                        placeholder="e.g., Website Development"
                        value={gigForm.title}
                        onChange={(e) =>
                          setGigForm({ ...gigForm, title: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select
                        value={gigForm.category}
                        onValueChange={(value) =>
                          setGigForm({ ...gigForm, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Development">
                            Development
                          </SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Writing">Writing</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Description *</Label>
                      <Textarea
                        placeholder="Describe your project requirements in detail..."
                        rows={4}
                        value={gigForm.description}
                        onChange={(e) =>
                          setGigForm({
                            ...gigForm,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Budget (USD) *</Label>
                        <Input
                          type="number"
                          placeholder="1000"
                          value={gigForm.payment_amount}
                          onChange={(e) =>
                            setGigForm({
                              ...gigForm,
                              payment_amount: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Deadline *</Label>
                        <Input
                          type="date"
                          value={gigForm.deadline}
                          onChange={(e) =>
                            setGigForm({ ...gigForm, deadline: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Skills Required *</Label>
                      <Input
                        placeholder="React, TypeScript, Tailwind CSS"
                        value={gigForm.required_skills}
                        onChange={(e) =>
                          setGigForm({
                            ...gigForm,
                            required_skills: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-accent mt-0.5" />
                        <div>
                          <div className="font-semibold text-sm mb-1">
                            Escrow Protection
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Your payment will be locked in smart contract escrow
                            until work is completed and verified. Workers can
                            request advance financing against this escrow.
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full crypto-gradient text-white"
                      onClick={handlePostGig}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Gig...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Post Gig (Deposit Later)
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-effect border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Gigs
              </CardTitle>
              <Briefcase className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stats.activeGigs}</div>
              <p className="text-xs text-muted-foreground">Currently posted</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Escrow Locked
              </CardTitle>
              <Lock className="w-5 h-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1 text-yellow-500">
                ${stats.escrowLocked.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                In smart contracts
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Spent
              </CardTitle>
              <DollarSign className="w-5 h-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1 text-accent">
                ${stats.totalSpent.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Projects
              </CardTitle>
              <CheckCircle className="w-5 h-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">
                {stats.completedProjects}
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully finished
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="active">Active Gigs</TabsTrigger>
            <TabsTrigger value="review">Under Review</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {/* Active Gigs Tab */}
          <TabsContent value="active" className="space-y-6">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Active & Open Gigs
                </CardTitle>
                <CardDescription>
                  Manage your posted jobs and track progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {postedGigs
                    .filter((gig) =>
                      ["open", "published", "in_progress", "draft"].includes(
                        gig.status,
                      ),
                    )
                    .map((gig) => (
                      <Card
                        key={gig.id}
                        className="border-border bg-card/50 hover:border-primary/30 transition-all"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{gig.title}</h3>
                                {getStatusBadge(gig.status)}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {gig.description}
                              </p>
                              {gig.assignedWorkerName && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Avatar className="w-6 h-6">
                                    <AvatarFallback className="bg-primary text-white text-xs">
                                      {gig.assignedWorkerName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-muted-foreground">
                                    {gig.assignedWorkerName}
                                  </span>
                                  {gig.assignedWorkerRating && (
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                      <span>{gig.assignedWorkerRating}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            <Badge variant="outline">{gig.category}</Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Budget
                              </div>
                              <div className="font-semibold">
                                ${gig.paymentAmount}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Escrow Status
                              </div>
                              {gig.escrowAmount > 0 ? (
                                <div className="flex items-center gap-1 text-accent">
                                  <Lock className="w-3 h-3" />
                                  <span className="font-semibold text-sm">
                                    ${gig.escrowAmount}
                                  </span>
                                </div>
                              ) : (
                                <Badge variant="outline" className="text-xs">
                                  Not Deposited
                                </Badge>
                              )}
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Due Date
                              </div>
                              <div className="font-semibold text-sm">
                                {formatDate(gig.deadline)}
                              </div>
                            </div>
                          </div>

                          {gig.status === "in_progress" && (
                            <div className="space-y-2 mb-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Progress
                                </span>
                                <span className="font-medium">
                                  {gig.progress}%
                                </span>
                              </div>
                              <Progress value={gig.progress} className="h-2" />
                            </div>
                          )}

                          <div className="flex gap-2 flex-wrap">
                            {gig.status === "draft" &&
                              gig.escrowAmount === 0 && (
                                <Button
                                  className="flex-1 crypto-gradient text-white"
                                  onClick={() => handleDepositEscrow(gig)}
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  ) : (
                                    <Lock className="mr-2 h-4 w-4" />
                                  )}
                                  Deposit ${gig.paymentAmount} to Escrow
                                </Button>
                              )}
                            {["open", "published"].includes(gig.status) &&
                              gig.escrowAmount === 0 && (
                                <Button
                                  className="flex-1 crypto-gradient text-white"
                                  onClick={() => handleDepositEscrow(gig)}
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  ) : (
                                    <Lock className="mr-2 h-4 w-4" />
                                  )}
                                  Deposit ${gig.paymentAmount} to Escrow
                                </Button>
                              )}
                            {["open", "published"].includes(gig.status) &&
                              gig.applicantsCount > 0 && (
                                <Button
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() => {
                                    setSelectedApplicantGig(gig);
                                    setShowApplicants(true);
                                  }}
                                >
                                  <Users className="mr-2 h-4 w-4" />
                                  View {gig.applicantsCount} Applicants
                                </Button>
                              )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {postedGigs.filter((gig) =>
                    ["open", "published", "in_progress", "draft"].includes(
                      gig.status,
                    ),
                  ).length === 0 && (
                    <div className="text-center py-12">
                      <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        No active gigs at the moment
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => setShowPostGig(true)}
                      >
                        Post Your First Gig
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Under Review Tab */}
          <TabsContent value="review" className="space-y-6">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-500" />
                  Milestones Under Review
                </CardTitle>
                <CardDescription>
                  Verify completed work and approve payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {postedGigs
                    .filter(
                      (gig) =>
                        gig.status === "in_progress" &&
                        getSubmittedMilestones(gig).length > 0,
                    )
                    .flatMap((gig) =>
                      getSubmittedMilestones(gig).map((milestone) => (
                        <Card
                          key={milestone.id}
                          className="border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50 transition-all"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">
                                    {milestone.title}
                                  </h3>
                                  <Badge className="bg-purple-500 text-white">
                                    Submitted
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">
                                  Gig: {gig.title}
                                </p>
                                {gig.assignedWorkerName && (
                                  <div className="flex items-center gap-2 text-sm mb-2">
                                    <Avatar className="w-6 h-6">
                                      <AvatarFallback className="bg-primary text-white text-xs">
                                        {gig.assignedWorkerName
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-muted-foreground">
                                      {gig.assignedWorkerName}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {milestone.submissionUrl && (
                              <div className="p-3 rounded-lg bg-card border border-border mb-3">
                                <div className="flex items-start gap-2 mb-2">
                                  <FileText className="w-4 h-4 text-primary mt-0.5" />
                                  <div className="flex-1">
                                    <div className="font-medium text-sm mb-1">
                                      Work Submitted
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      {milestone.submissionNote ||
                                        "No description provided"}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="link"
                                        className="h-auto p-0 text-primary"
                                        asChild
                                      >
                                        <a
                                          href={milestone.submissionUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {milestone.submissionUrl}
                                        </a>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">
                                  Milestone Amount
                                </div>
                                <div className="font-semibold text-accent">
                                  ${milestone.amount}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">
                                  Submitted At
                                </div>
                                <div className="font-semibold text-sm">
                                  {milestone.submittedAt
                                    ? new Date(
                                        milestone.submittedAt,
                                      ).toLocaleDateString()
                                    : "N/A"}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                className="flex-1 success-gradient text-white"
                                onClick={() =>
                                  handleApproveWork(gig, milestone)
                                }
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                )}
                                Approve & Release ${milestone.amount}
                              </Button>

                              <Button
                                variant="outline"
                                className="border-destructive/50 hover:bg-destructive/10"
                                onClick={() =>
                                  handleRejectWork(milestone, gig.id)
                                }
                                disabled={isSubmitting}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Request Revision
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )),
                    )}

                  {postedGigs.filter(
                    (gig) =>
                      gig.status === "in_progress" &&
                      getSubmittedMilestones(gig).length > 0,
                  ).length === 0 && (
                    <div className="text-center py-12">
                      <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        No milestones pending review at the moment
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Completed Tab */}
          <TabsContent value="completed" className="space-y-6">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  Completed Projects
                </CardTitle>
                <CardDescription>
                  Your successfully finished gigs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {postedGigs
                    .filter((gig) => gig.status === "completed")
                    .map((gig) => (
                      <Card
                        key={gig.id}
                        className="border-accent/30 bg-accent/5 hover:border-accent/50 transition-all"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{gig.title}</h3>
                                {getStatusBadge(gig.status)}
                              </div>
                              {gig.assignedWorkerName && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Avatar className="w-6 h-6">
                                    <AvatarFallback className="bg-primary text-white text-xs">
                                      {gig.assignedWorkerName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-muted-foreground">
                                    {gig.assignedWorkerName}
                                  </span>
                                  {gig.assignedWorkerRating && (
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                      <span>{gig.assignedWorkerRating}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            <Badge variant="outline">{gig.category}</Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Amount Paid
                              </div>
                              <div className="font-semibold text-accent">
                                ${gig.paymentAmount}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Status
                              </div>
                              <div className="flex items-center gap-1 text-accent">
                                <CheckCircle className="w-3 h-3" />
                                <span className="font-semibold text-sm">
                                  Released
                                </span>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Completed Date
                              </div>
                              <div className="font-semibold text-sm">
                                {new Date(gig.updatedAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Star className="mr-2 h-3 w-3" />
                                  Rate Worker
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Rate Worker</DialogTitle>
                                  <DialogDescription>
                                    Share your experience working with{" "}
                                    {gig.assignedWorkerName}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>Rating (1-5 stars)</Label>
                                    <div className="flex gap-1">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Button
                                          key={star}
                                          variant={
                                            ratingForm.rating >= star
                                              ? "default"
                                              : "outline"
                                          }
                                          size="sm"
                                          className="w-10 h-10 p-0"
                                          onClick={() =>
                                            setRatingForm({
                                              ...ratingForm,
                                              rating: star,
                                            })
                                          }
                                        >
                                          <Star
                                            className={`w-4 h-4 ${ratingForm.rating >= star ? "fill-current" : ""}`}
                                          />
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Feedback (Optional)</Label>
                                    <Textarea
                                      placeholder="Share your experience..."
                                      rows={4}
                                      value={ratingForm.feedback}
                                      onChange={(e) =>
                                        setRatingForm({
                                          ...ratingForm,
                                          feedback: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <Button
                                    className="w-full"
                                    onClick={() => handleRateWorker(gig)}
                                    disabled={isSubmitting}
                                  >
                                    {isSubmitting ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                      </>
                                    ) : (
                                      "Submit Rating"
                                    )}
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {postedGigs.filter((gig) => gig.status === "completed")
                    .length === 0 && (
                    <div className="text-center py-12">
                      <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        No completed projects yet
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Applicants Dialog */}
      <Dialog open={showApplicants} onOpenChange={setShowApplicants}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Gig Applicants</DialogTitle>
            <DialogDescription>
              Review applications and assign the best worker for your gig
            </DialogDescription>
          </DialogHeader>
          {selectedApplicantGig && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <h3 className="font-semibold mb-1">
                  {selectedApplicantGig.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Budget: ${selectedApplicantGig.paymentAmount}
                </p>
                <Badge>{selectedApplicantGig.category}</Badge>
              </div>

              <div className="space-y-3">
                {selectedApplicantGig.applicants?.map((applicant) => (
                  <Card key={applicant.id} className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary text-white">
                              {applicant.workerName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">
                              {applicant.workerName}
                            </h4>
                            {applicant.workerRating && (
                              <div className="flex items-center gap-1 text-sm">
                                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                <span>{applicant.workerRating} rating</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-accent">
                            ${applicant.proposedAmount}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Proposed
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {applicant.proposal}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          Applied{" "}
                          {new Date(applicant.appliedAt).toLocaleDateString()}
                        </div>
                        <Button
                          size="sm"
                          className="crypto-gradient text-white"
                          onClick={() =>
                            handleAssignWorker(selectedApplicantGig, applicant)
                          }
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                              Assigning...
                            </>
                          ) : (
                            "Assign to Gig"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Notifications Dialog */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </DialogTitle>
            <DialogDescription>
              Stay updated on your gigs and applications
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {notifications.map((notif) => (
              <Card
                key={notif.id}
                className={`border ${
                  notif.read ? "bg-card" : "bg-primary/5 border-primary/30"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        notif.eventType === "gig_completed" ||
                        notif.eventType === "milestone_approved"
                          ? "bg-accent/20"
                          : notif.eventType === "escrow_deposited"
                            ? "bg-yellow-500/20"
                            : "bg-primary/20"
                      }`}
                    >
                      {notif.eventType === "gig_completed" ||
                      notif.eventType === "milestone_approved" ? (
                        <CheckCircle className="w-4 h-4 text-accent" />
                      ) : notif.eventType === "escrow_deposited" ? (
                        <Lock className="w-4 h-4 text-yellow-500" />
                      ) : notif.eventType === "applicant_applied" ? (
                        <Users className="w-4 h-4 text-primary" />
                      ) : (
                        <Bell className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">
                        {notif.message}
                      </p>
                      {notif.gigTitle && (
                        <p className="text-xs text-muted-foreground mb-1">
                          Gig: {notif.gigTitle}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(notif.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {notifications.length === 0 && (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No notifications yet</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
