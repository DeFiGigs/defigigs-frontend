"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import GigDetailModal from "@/components/GigDetailModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Briefcase,
  Clock,
  CheckCircle2,
  DollarSign,
  Lock,
  TrendingUp,
  FileText,
  Loader2,
  Eye,
  AlertCircle,
} from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  status: string;
  amount: number;
  paymentPercentage: number;
}

interface Gig {
  id: number;
  title: string;
  description: string;
  paymentAmount: number;
  deadline: string;
  status: string;
  progress: number;
  escrowStatus: string;
  paymentStatus: string;
  category: string;
  requiredSkills: string;
  employerId: number;
  workerId: number | null;
  assignedWorkerName: string | null;
  milestones: Milestone[];
  nextMilestone: {
    id: number;
    title: string;
    status: string;
  } | null;
}

interface SummaryData {
  total_earnings: number;
  total_locked: number;
  active_gigs: number;
  pending_release: number;
  total_released: number;
}

export default function MyGigsPage() {
  // Mock user data - in real app, get from auth context
  const [userId] = useState(101); // Mock worker ID
  const [userType] = useState<"worker" | "employer">("worker");

  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [activeGigs, setActiveGigs] = useState<Gig[]>([]);
  const [pendingReleaseGigs, setPendingReleaseGigs] = useState<Gig[]>([]);
  const [historyGigs, setHistoryGigs] = useState<Gig[]>([]);
  
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingGigs, setLoadingGigs] = useState(true);
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    fetchSummaryData();
    fetchGigs("active");
  }, []);

  useEffect(() => {
    fetchGigs(activeTab);
  }, [activeTab]);

  const fetchSummaryData = async () => {
    setLoadingSummary(true);
    try {
      const response = await fetch(
        `/api/my-gigs/summary?user_id=${userId}&user_type=${userType}`
      );
      if (!response.ok) throw new Error("Failed to fetch summary");
      const data = await response.json();
      setSummaryData(data);
    } catch (error) {
      toast.error("Failed to load summary data");
      console.error(error);
    } finally {
      setLoadingSummary(false);
    }
  };

  const fetchGigs = async (tab: string) => {
    setLoadingGigs(true);
    try {
      const response = await fetch(
        `/api/my-gigs/list?user_id=${userId}&user_type=${userType}&tab=${tab}`
      );
      if (!response.ok) throw new Error("Failed to fetch gigs");
      const data = await response.json();

      if (tab === "active") {
        setActiveGigs(data.gigs);
      } else if (tab === "pending_release") {
        setPendingReleaseGigs(data.gigs);
      } else {
        setHistoryGigs(data.gigs);
      }
    } catch (error) {
      toast.error("Failed to load gigs");
      console.error(error);
    } finally {
      setLoadingGigs(false);
    }
  };

  const handleViewDetails = (gig: Gig) => {
    setSelectedGig(gig);
    setDetailModalOpen(true);
  };

  const handleModalUpdate = () => {
    fetchSummaryData();
    fetchGigs(activeTab);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      draft: { label: "Draft", className: "bg-gray-500" },
      open: { label: "Open", className: "bg-blue-500" },
      assigned: { label: "Assigned", className: "bg-cyan-500" },
      in_progress: { label: "In Progress", className: "bg-primary" },
      milestone_submitted: { label: "Submitted", className: "bg-yellow-500" },
      completed: { label: "Completed", className: "bg-accent" },
      cancelled: { label: "Cancelled", className: "bg-red-500" },
    };

    const config = statusMap[status] || { label: status, className: "bg-gray-500" };
    return (
      <Badge className={`${config.className} text-white`}>{config.label}</Badge>
    );
  };

  const GigCard = ({ gig }: { gig: Gig }) => (
    <Card className="p-6 glass-effect border-border/40 hover:border-primary/40 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">{gig.title}</h3>
            {getStatusBadge(gig.status)}
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {gig.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              ${gig.paymentAmount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {gig.deadline}
            </span>
            {userType === "worker" && gig.assignedWorkerName && (
              <span className="text-muted-foreground">
                Employer: {gig.assignedWorkerName}
              </span>
            )}
            {userType === "employer" && gig.assignedWorkerName && (
              <span className="text-muted-foreground">
                Worker: {gig.assignedWorkerName}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">{gig.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${gig.progress}%` }}
          />
        </div>
      </div>

      {/* Next Milestone */}
      {gig.nextMilestone && (
        <div className="mb-4 p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground mb-1">Next Milestone:</p>
          <p className="text-sm font-medium">{gig.nextMilestone.title}</p>
        </div>
      )}

      {/* Milestones Summary */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="h-4 w-4 text-accent" />
          {gig.milestones.filter((m) => m.status === "approved").length}/{gig.milestones.length} Approved
        </span>
        <span className="flex items-center gap-1">
          <Lock className="h-4 w-4 text-blue-500" />
          {gig.escrowStatus === "deposited" ? "Secured" : "Pending"}
        </span>
      </div>

      {/* Action Button */}
      <Button
        onClick={() => handleViewDetails(gig)}
        variant="outline"
        className="w-full"
      >
        <Eye className="h-4 w-4 mr-2" />
        View Details
      </Button>
    </Card>
  );

  return (
    <div className="min-h-screen dark">
      <Header />
      <Sidebar />

      <main className="ml-64 mt-16 p-8">
        <div className="container mx-auto max-w-[1600px]">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">My Gigs</h1>
            </div>
            <p className="text-muted-foreground">
              {userType === "worker"
                ? "Track your active projects and earnings"
                : "Monitor your posted gigs and manage workers"}
            </p>
          </div>

          {/* Stats Overview */}
          {loadingSummary ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-6 glass-effect border-border/40">
                  <div className="animate-pulse">
                    <div className="h-5 w-5 bg-muted rounded mb-2" />
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </Card>
              ))}
            </div>
          ) : summaryData ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 glass-effect border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <Lock className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold">
                  ${summaryData.total_locked.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {userType === "worker" ? "Total Locked" : "Escrow Locked"}
                </p>
              </Card>

              <Card className="p-6 glass-effect border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <Badge variant="secondary">{summaryData.active_gigs}</Badge>
                </div>
                <p className="text-2xl font-bold">{summaryData.active_gigs}</p>
                <p className="text-sm text-muted-foreground">Active Gigs</p>
              </Card>

              <Card className="p-6 glass-effect border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-2xl font-bold">
                  {userType === "worker"
                    ? summaryData.pending_release
                    : `$${summaryData.pending_release.toLocaleString()}`}
                </p>
                <p className="text-sm text-muted-foreground">Pending Release</p>
              </Card>

              <Card className="p-6 glass-effect border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                </div>
                <p className="text-2xl font-bold">
                  {userType === "worker"
                    ? `$${summaryData.total_released.toLocaleString()}`
                    : summaryData.total_released}
                </p>
                <p className="text-sm text-muted-foreground">
                  {userType === "worker" ? "Total Released" : "Completed"}
                </p>
              </Card>
            </div>
          ) : null}

          {/* Tabs for Active/Pending Release/History */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-3">
              <TabsTrigger value="active" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Active
              </TabsTrigger>
              <TabsTrigger value="pending_release" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Pending Release
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>

            {/* Active Gigs */}
            <TabsContent value="active" className="space-y-6">
              {loadingGigs ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : activeGigs.length === 0 ? (
                <Card className="p-12 glass-effect border-border/40 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Active Gigs</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any active gigs at the moment
                  </p>
                  <Button className="crypto-gradient text-white">
                    Browse Available Gigs
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {activeGigs.map((gig) => (
                    <GigCard key={gig.id} gig={gig} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Pending Release Gigs */}
            <TabsContent value="pending_release" className="space-y-6">
              {loadingGigs ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : pendingReleaseGigs.length === 0 ? (
                <Card className="p-12 glass-effect border-border/40 text-center">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Pending Releases</h3>
                  <p className="text-muted-foreground">
                    No milestones are waiting for approval
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {pendingReleaseGigs.map((gig) => (
                    <GigCard key={gig.id} gig={gig} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* History Gigs */}
            <TabsContent value="history" className="space-y-6">
              {loadingGigs ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : historyGigs.length === 0 ? (
                <Card className="p-12 glass-effect border-border/40 text-center">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Completed Gigs Yet</h3>
                  <p className="text-muted-foreground">
                    Your completed gigs will appear here
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {historyGigs.map((gig) => (
                    <GigCard key={gig.id} gig={gig} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Bottom Info Card */}
          <Card className="p-6 glass-effect border-primary/30 mt-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/20">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Build Your Reputation</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Complete gigs on time and with high quality to build your on-chain
                  reputation. Higher reputation leads to more opportunities and better rates.
                </p>
                <Button variant="outline" size="sm">
                  View My Reputation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Gig Detail Modal */}
      {selectedGig && (
        <GigDetailModal
          open={detailModalOpen}
          onClose={() => {
            setDetailModalOpen(false);
            setSelectedGig(null);
          }}
          gigId={selectedGig.id}
          userId={userId}
          userType={userType}
          onUpdate={handleModalUpdate}
        />
      )}
    </div>
  );
}