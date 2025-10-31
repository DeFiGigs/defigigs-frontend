"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Calendar, TrendingDown, CheckCircle } from "lucide-react";

interface RepaymentItem {
  id: string;
  gigTitle: string;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  status: "current" | "upcoming" | "paid";
}

const repaymentData: RepaymentItem[] = [
  {
    id: "1",
    gigTitle: "Smart Contract Development",
    totalAmount: 2800,
    paidAmount: 2100,
    dueDate: "Jan 15, 2024",
    status: "current",
  },
  {
    id: "2",
    gigTitle: "UI/UX Design Project",
    totalAmount: 1500,
    paidAmount: 1500,
    dueDate: "Jan 5, 2024",
    status: "paid",
  },
];

export default function RepaymentCard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-yellow-500/20 text-yellow-500";
      case "upcoming":
        return "bg-blue-500/20 text-blue-500";
      case "paid":
        return "bg-green-500/20 text-green-500";
      default:
        return "bg-secondary";
    }
  };

  return (
    <Card className="p-6 glass-effect border-border/40">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Repayment Schedule</h3>
        </div>
        <Badge variant="secondary">1 Active</Badge>
      </div>

      <div className="space-y-4">
        {repaymentData.map((item) => {
          const progress = (item.paidAmount / item.totalAmount) * 100;
          const remaining = item.totalAmount - item.paidAmount;

          return (
            <div
              key={item.id}
              className="p-4 bg-secondary/20 rounded-lg border border-border/40"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{item.gigTitle}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Due: {item.dueDate}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {item.status === "paid" && (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  )}
                  <span className="capitalize">{item.status}</span>
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      Payment Progress
                    </span>
                    <span className="font-semibold">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.status === "paid" ? "Total Paid" : "Remaining"}
                    </p>
                    <p className="text-xl font-bold text-primary">
                      $
                      {item.status === "paid"
                        ? item.paidAmount.toLocaleString()
                        : remaining.toLocaleString()}
                    </p>
                  </div>
                  {item.status === "current" && (
                    <Button size="sm" className="crypto-gradient text-white">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Pay Now
                    </Button>
                  )}
                  {item.status === "paid" && (
                    <Button size="sm" variant="outline" disabled>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Completed
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
          <div className="flex items-start gap-3">
            <DollarSign className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Auto-Repayment</h4>
              <p className="text-xs text-muted-foreground">
                Advances are automatically repaid from your gig earnings. No
                manual payments required!
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/40">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Total Borrowed</p>
            <p className="text-lg font-bold">$4,300</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Total Repaid</p>
            <p className="text-lg font-bold text-green-500">$3,600</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Outstanding</p>
            <p className="text-lg font-bold text-yellow-500">$700</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
