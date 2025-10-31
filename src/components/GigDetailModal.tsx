"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import MilestoneTracker from "@/components/MilestoneTracker";
import {
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle,
  FileText,
  MessageSquare,
  Loader2,
  ExternalLink,
} from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  description: string | null;
  amount: number;
  paymentPercentage: number;
  status: string;
  orderIndex: number;
  submissionUrl: string | null;
  submissionNote: string | null;
  reviewComments: string | null;
  submittedAt: string | null;
  approvedAt: string | null;
  createdAt: string;
}

interface Payment {
  id: number;
  milestoneId: number | null;
  amount: number;
  status: string;
  transactionHash: string | null;
  releasedAt: string | null;
  withdrawnAt: string | null;
  createdAt: string;
}

interface GigDetail {
  gig: {
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
    assignedWorkerRating: number | null;
  };
  milestones: Milestone[];
  payments: Payment[];
  escrowTracker: {
    totalAmount: number;
    lockedAmount: number;
    releasedAmount: number;
    withdrawnAmount: number;
    pendingReleaseAmount: number;
  };
}

interface GigDetailModalProps {
  open: boolean;
  onClose: () => void;
  gigId: number;
  userId: number;
  userType: "worker" | "employer";
  onUpdate?: () => void;
}

export default function GigDetailModal({
  open,
  onClose,
  gigId,
  userId,
  userType,
  onUpdate,
}: GigDetailModalProps) {
  const [gigDetail, setGigDetail] = useState<GigDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(
    null,
  );
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [approvalNotes, setApprovalNotes] = useState("");
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showApproveForm, setShowApproveForm] = useState(false);

  useEffect(() => {
    if (open && gigId) {
      fetchGigDetail();
    }
  }, [open, gigId]);

  const fetchGigDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/my-gigs/${gigId}?user_id=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch gig details");
      const data = await response.json();
      setGigDetail(data);
    } catch (error) {
      toast.error("Failed to load gig details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitWork = async (milestone: Milestone) => {
    if (!submissionNotes.trim()) {
      toast.error("Please add submission notes");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/my-gigs/submit-work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          gig_id: gigId,
          milestone_id: milestone.id,
          submission_notes: submissionNotes,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit work");

      toast.success("Work submitted successfully!");
      setShowSubmitForm(false);
      setSubmissionNotes("");
      setSelectedMilestone(null);
      fetchGigDetail();
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to submit work");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleApproveMilestone = async (
    milestone: Milestone,
    approved: boolean,
  ) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/my-gigs/approve-milestone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          gig_id: gigId,
          milestone_id: milestone.id,
          approval_notes: approvalNotes,
          approved,
        }),
      });

      if (!response.ok) throw new Error("Failed to approve milestone");

      toast.success(approved ? "Milestone approved!" : "Milestone rejected");
      setShowApproveForm(false);
      setApprovalNotes("");
      setSelectedMilestone(null);
      fetchGigDetail();
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to process milestone");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWithdraw = async (payment: Payment) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/my-gigs/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          payment_id: payment.id,
          wallet_address: `0x${Math.random().toString(16).substr(2, 40)}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to withdraw funds");

      const data = await response.json();
      toast.success(`Successfully withdrew $${data.withdrawn_amount}!`);
      fetchGigDetail();
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to withdraw funds");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      {
        label: string;
        variant: "default" | "secondary" | "outline" | "destructive";
      }
    > = {
      pending: { label: "Pending", variant: "secondary" },
      in_progress: { label: "In Progress", variant: "default" },
      submitted: { label: "Submitted", variant: "outline" },
      approved: { label: "Approved", variant: "default" },
      rejected: { label: "Rejected", variant: "destructive" },
      completed: { label: "Completed", variant: "default" },
    };

    const config = statusMap[status] || { label: status, variant: "secondary" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getMilestoneSteps = () => {
    if (!gigDetail) return [];

    const completedMilestones = gigDetail.milestones.filter(
      (m) => m.status === "approved",
    ).length;
    const totalMilestones = gigDetail.milestones.length;
    const hasSubmitted = gigDetail.milestones.some(
      (m) => m.status === "submitted",
    );

    return [
      {
        label: "Client Deposits",
        icon: "deposit" as const,
        status:
          gigDetail.gig.escrowStatus === "deposited"
            ? ("completed" as const)
            : ("pending" as const),
      },
      {
        label: "Worker Completes",
        icon: "complete" as const,
        status:
          completedMilestones > 0
            ? ("completed" as const)
            : hasSubmitted
              ? ("current" as const)
              : ("pending" as const),
      },
      {
        label: "Client Approves",
        icon: "approve" as const,
        status:
          completedMilestones === totalMilestones
            ? ("completed" as const)
            : completedMilestones > 0
              ? ("current" as const)
              : ("pending" as const),
      },
      {
        label: "Auto Release",
        icon: "release" as const,
        status:
          gigDetail.escrowTracker.releasedAmount > 0
            ? ("completed" as const)
            : ("pending" as const),
      },
    ];
  };

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!gigDetail) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{gigDetail.gig.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Gig Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Payment Amount
              </p>
              <p className="text-lg font-bold">
                ${gigDetail.gig.paymentAmount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Deadline</p>
              <p className="text-lg font-medium">{gigDetail.gig.deadline}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              {getStatusBadge(gigDetail.gig.status)}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Progress</p>
              <p className="text-lg font-bold text-primary">
                {gigDetail.gig.progress}%
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">
              {gigDetail.gig.description}
            </p>
          </div>

          {/* Milestone Tracker */}
          <MilestoneTracker
            steps={getMilestoneSteps()}
            escrowTracker={gigDetail.escrowTracker}
          />

          {/* Milestones List */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Milestones</h3>
            <div className="space-y-4">
              {gigDetail.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="p-4 rounded-lg glass-effect border-border/40 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{milestone.title}</h4>
                        {getStatusBadge(milestone.status)}
                      </div>
                      {milestone.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {milestone.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />$
                          {milestone.amount.toLocaleString()} (
                          {milestone.paymentPercentage}%)
                        </span>
                        {milestone.submittedAt && (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            Submitted{" "}
                            {new Date(
                              milestone.submittedAt,
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submission Details */}
                  {milestone.submissionNote && (
                    <div className="pt-3 border-t border-border/40">
                      <p className="text-xs text-muted-foreground mb-1">
                        Submission Notes:
                      </p>
                      <p className="text-sm">{milestone.submissionNote}</p>
                      {milestone.submissionUrl && (
                        <a
                          href={milestone.submissionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1 mt-2"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View Submission
                        </a>
                      )}
                    </div>
                  )}

                  {/* Review Comments */}
                  {milestone.reviewComments && (
                    <div className="pt-3 border-t border-border/40">
                      <p className="text-xs text-muted-foreground mb-1">
                        Review Comments:
                      </p>
                      <p className="text-sm">{milestone.reviewComments}</p>
                    </div>
                  )}

                  {/* Actions for Worker */}
                  {userType === "worker" &&
                    (milestone.status === "pending" ||
                      milestone.status === "in_progress") &&
                    !showSubmitForm && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedMilestone(milestone);
                          setShowSubmitForm(true);
                        }}
                        className="w-full crypto-gradient"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Submit Work
                      </Button>
                    )}

                  {/* Submit Work Form */}
                  {showSubmitForm && selectedMilestone?.id === milestone.id && (
                    <div className="pt-3 border-t border-border/40 space-y-3">
                      <div>
                        <Label htmlFor="submission-notes">
                          Submission Notes
                        </Label>
                        <Textarea
                          id="submission-notes"
                          value={submissionNotes}
                          onChange={(e) => setSubmissionNotes(e.target.value)}
                          placeholder="Describe your work and any important details..."
                          rows={4}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleSubmitWork(milestone)}
                          disabled={submitting}
                          className="flex-1 crypto-gradient"
                        >
                          {submitting ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                          )}
                          Submit
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowSubmitForm(false);
                            setSelectedMilestone(null);
                            setSubmissionNotes("");
                          }}
                          disabled={submitting}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Actions for Employer */}
                  {userType === "employer" &&
                    milestone.status === "submitted" &&
                    !showApproveForm && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedMilestone(milestone);
                            setShowApproveForm(true);
                          }}
                          className="flex-1 crypto-gradient"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Review Milestone
                        </Button>
                      </div>
                    )}

                  {/* Approve/Reject Form */}
                  {showApproveForm &&
                    selectedMilestone?.id === milestone.id && (
                      <div className="pt-3 border-t border-border/40 space-y-3">
                        <div>
                          <Label htmlFor="approval-notes">
                            Review Notes (Optional)
                          </Label>
                          <Textarea
                            id="approval-notes"
                            value={approvalNotes}
                            onChange={(e) => setApprovalNotes(e.target.value)}
                            placeholder="Add feedback or comments..."
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() =>
                              handleApproveMilestone(milestone, true)
                            }
                            disabled={submitting}
                            className="flex-1 success-gradient"
                          >
                            {submitting ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                            )}
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleApproveMilestone(milestone, false)
                            }
                            disabled={submitting}
                            className="flex-1"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowApproveForm(false);
                              setSelectedMilestone(null);
                              setApprovalNotes("");
                            }}
                            disabled={submitting}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Available Payments for Withdrawal */}
          {userType === "worker" &&
            gigDetail.payments.some((p) => p.status === "released") && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Available for Withdrawal
                </h3>
                <div className="space-y-3">
                  {gigDetail.payments
                    .filter((p) => p.status === "released")
                    .map((payment) => (
                      <div
                        key={payment.id}
                        className="p-4 rounded-lg glass-effect border-primary/30 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-lg">
                            ${payment.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Released{" "}
                            {new Date(payment.releasedAt!).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          onClick={() => handleWithdraw(payment)}
                          disabled={submitting}
                          className="crypto-gradient"
                        >
                          {submitting ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <DollarSign className="h-4 w-4 mr-2" />
                          )}
                          Withdraw
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
