"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface EscrowItem {
  id: string;
  gigTitle: string;
  client: string;
  amount: number;
  status: "active" | "pending" | "released" | "disputed";
  progress: number;
  milestone: string;
}

const escrowData: EscrowItem[] = [
  {
    id: "1",
    gigTitle: "DeFi Protocol Integration",
    client: "BlockChainCo",
    amount: 3500,
    status: "active",
    progress: 65,
    milestone: "Phase 2: Backend Integration",
  },
  {
    id: "2",
    gigTitle: "Token Economics Design",
    client: "DAOventures",
    amount: 2000,
    status: "pending",
    progress: 100,
    milestone: "Final Review",
  },
];

export default function EscrowCard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500/20 text-blue-500";
      case "pending":
        return "bg-yellow-500/20 text-yellow-500";
      case "released":
        return "bg-green-500/20 text-green-500";
      case "disputed":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      case "released":
        return <CheckCircle className="h-4 w-4" />;
      case "disputed":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <Card className="p-6 glass-effect border-border/40">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Escrow Payments</h3>
        </div>
        <Badge variant="secondary">2 Active</Badge>
      </div>

      <div className="space-y-4">
        {escrowData.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-secondary/20 rounded-lg border border-border/40"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{item.gigTitle}</h4>
                <p className="text-sm text-muted-foreground">
                  Client: {item.client}
                </p>
              </div>
              <Badge className={getStatusColor(item.status)}>
                {getStatusIcon(item.status)}
                <span className="ml-1 capitalize">{item.status}</span>
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    {item.milestone}
                  </span>
                  <span className="font-semibold">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Escrow Amount</p>
                  <p className="text-xl font-bold text-primary">
                    ${item.amount.toLocaleString()}
                  </p>
                </div>
                {item.status === "pending" && (
                  <Button size="sm" className="crypto-gradient text-white">
                    Request Release
                  </Button>
                )}
                {item.status === "active" && (
                  <Button size="sm" variant="outline">
                    Submit Work
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Protected Payments</h4>
              <p className="text-xs text-muted-foreground">
                All payments are secured in smart contract escrow until
                milestone approval. Funds are automatically released upon
                completion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
