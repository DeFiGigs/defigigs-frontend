"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  MessageSquare,
  Upload,
  DollarSign,
  Calendar,
  User,
} from "lucide-react";

interface WorkStatusCardProps {
  status:
    | "pending"
    | "in-progress"
    | "submitted"
    | "revision"
    | "approved"
    | "completed";
  gigTitle: string;
  client: string;
  amount: number;
  dueDate: string;
  progress: number;
  milestone?: string;
  onSubmitWork?: () => void;
  onMessage?: () => void;
  onRequestRelease?: () => void;
}

export default function WorkStatusCard({
  status,
  gigTitle,
  client,
  amount,
  dueDate,
  progress,
  milestone = "Main Deliverable",
  onSubmitWork,
  onMessage,
  onRequestRelease,
}: WorkStatusCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          label: "Pending Start",
          color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
          icon: Clock,
          description: "Waiting for project kickoff",
        };
      case "in-progress":
        return {
          label: "In Progress",
          color: "bg-blue-500/20 text-blue-500 border-blue-500/30",
          icon: Clock,
          description: "Work is underway",
        };
      case "submitted":
        return {
          label: "Under Review",
          color: "bg-purple-500/20 text-purple-500 border-purple-500/30",
          icon: FileText,
          description: "Awaiting client review",
        };
      case "revision":
        return {
          label: "Revision Requested",
          color: "bg-orange-500/20 text-orange-500 border-orange-500/30",
          icon: AlertCircle,
          description: "Client requested changes",
        };
      case "approved":
        return {
          label: "Approved",
          color: "bg-green-500/20 text-green-500 border-green-500/30",
          icon: CheckCircle2,
          description: "Work approved, pending payment",
        };
      case "completed":
        return {
          label: "Completed",
          color: "bg-green-500/20 text-green-500 border-green-500/30",
          icon: CheckCircle2,
          description: "Payment released",
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="p-6 glass-effect border-border/40">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{gigTitle}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Client: {client}</span>
          </div>
        </div>
        <Badge className={`${statusConfig.color} border`}>
          <StatusIcon className="h-3.5 w-3.5 mr-1" />
          {statusConfig.label}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        {statusConfig.description}
      </p>

      <Separator className="my-4" />

      {/* Progress Section */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">
              Current Milestone: {milestone}
            </span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Amount</p>
              <p className="font-semibold">${amount.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Due Date</p>
              <p className="font-semibold">{dueDate}</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Action Buttons */}
      <div className="space-y-2">
        {/* In Progress - Show Submit Work */}
        {status === "in-progress" && (
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onMessage}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Client
            </Button>
            <Button
              className="flex-1 crypto-gradient text-white"
              onClick={onSubmitWork}
            >
              <Upload className="h-4 w-4 mr-2" />
              Submit Work
            </Button>
          </div>
        )}

        {/* Submitted - Waiting for review */}
        {status === "submitted" && (
          <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <p className="font-semibold text-sm">Under Review</p>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Your work has been submitted and is being reviewed by the client.
              You'll be notified once they provide feedback.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={onMessage}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Client
            </Button>
          </div>
        )}

        {/* Revision Requested */}
        {status === "revision" && (
          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <p className="font-semibold text-sm">Revision Requested</p>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              The client has requested some changes. Review their feedback and
              resubmit your work.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onMessage}
              >
                View Feedback
              </Button>
              <Button
                size="sm"
                className="flex-1 crypto-gradient text-white"
                onClick={onSubmitWork}
              >
                Resubmit Work
              </Button>
            </div>
          </div>
        )}

        {/* Approved - Request Release */}
        {status === "approved" && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <p className="font-semibold text-sm">Work Approved!</p>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Congratulations! Your work has been approved. Request payment
              release from escrow.
            </p>
            <Button
              size="sm"
              className="w-full crypto-gradient text-white"
              onClick={onRequestRelease}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Request Payment Release
            </Button>
          </div>
        )}

        {/* Completed */}
        {status === "completed" && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <p className="font-semibold text-sm">Completed!</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Payment of ${amount.toLocaleString()} has been released from
              escrow. Great job!
            </p>
          </div>
        )}

        {/* Pending Start */}
        {status === "pending" && (
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <p className="font-semibold text-sm">Ready to Start</p>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Coordinate with the client to begin work. Make sure you understand
              all requirements.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={onMessage}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Client
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
