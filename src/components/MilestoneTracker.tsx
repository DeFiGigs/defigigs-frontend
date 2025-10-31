import {
  CheckCircle2,
  Circle,
  Clock,
  DollarSign,
  FileCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface Step {
  label: string;
  icon: "deposit" | "complete" | "approve" | "release";
  status: "completed" | "current" | "pending";
}

interface MilestoneTrackerProps {
  steps: Step[];
  escrowTracker?: {
    totalAmount: number;
    lockedAmount: number;
    releasedAmount: number;
    withdrawnAmount: number;
    pendingReleaseAmount: number;
  };
}

const StepIcon = ({
  icon,
  status,
}: {
  icon: Step["icon"];
  status: Step["status"];
}) => {
  const iconMap = {
    deposit: DollarSign,
    complete: FileCheck,
    approve: CheckCircle2,
    release: Clock,
  };

  const Icon = iconMap[icon];

  if (status === "completed") {
    return (
      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
        <CheckCircle2 className="h-5 w-5 text-white" />
      </div>
    );
  }

  if (status === "current") {
    return (
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center animate-pulse">
        <Icon className="h-5 w-5 text-white" />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
      <Circle className="h-5 w-5 text-muted-foreground" />
    </div>
  );
};

export default function MilestoneTracker({
  steps,
  escrowTracker,
}: MilestoneTrackerProps) {
  return (
    <Card className="p-6 glass-effect border-border/40">
      <h3 className="text-lg font-semibold mb-6">Milestone Progress</h3>

      {/* Progress Steps */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted">
          <div
            className="h-full bg-accent transition-all duration-500"
            style={{
              width: `${(steps.filter((s) => s.status === "completed").length / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <StepIcon icon={step.icon} status={step.status} />
              <p
                className={`text-sm text-center font-medium ${
                  step.status === "completed"
                    ? "text-accent"
                    : step.status === "current"
                      ? "text-primary"
                      : "text-muted-foreground"
                }`}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Escrow Summary */}
      {escrowTracker && (
        <div className="mt-6 pt-6 border-t border-border/40 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
            <p className="text-lg font-bold">
              ${escrowTracker.totalAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Locked</p>
            <p className="text-lg font-bold text-blue-500">
              ${escrowTracker.lockedAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Pending Release
            </p>
            <p className="text-lg font-bold text-yellow-500">
              ${escrowTracker.pendingReleaseAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Released</p>
            <p className="text-lg font-bold text-accent">
              $
              {(
                escrowTracker.releasedAmount + escrowTracker.withdrawnAmount
              ).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
