"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  Clock,
  DollarSign,
  Upload,
  MessageSquare,
} from "lucide-react";

interface GigItem {
  id: string;
  title: string;
  client: string;
  amount: number;
  progress: number;
  status: "in-progress" | "review" | "completed";
  dueDate: string;
}

const activeGigs: GigItem[] = [
  {
    id: "1",
    title: "DeFi Protocol Integration",
    client: "BlockChainCo",
    amount: 3500,
    progress: 65,
    status: "in-progress",
    dueDate: "5 days left",
  },
  {
    id: "2",
    title: "Token Economics Design",
    client: "DAOventures",
    amount: 2000,
    progress: 100,
    status: "review",
    dueDate: "Awaiting review",
  },
];

export default function GigManagementCard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-500/20 text-blue-500";
      case "review":
        return "bg-yellow-500/20 text-yellow-500";
      case "completed":
        return "bg-green-500/20 text-green-500";
      default:
        return "bg-secondary";
    }
  };

  return (
    <Card className="p-6 glass-effect border-border/40">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">My Active Gigs</h3>
        </div>
        <Badge variant="secondary">{activeGigs.length} Active</Badge>
      </div>

      <div className="space-y-4">
        {activeGigs.map((gig) => (
          <div
            key={gig.id}
            className="p-4 bg-secondary/20 rounded-lg border border-border/40 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{gig.title}</h4>
                <p className="text-sm text-muted-foreground">
                  Client: {gig.client}
                </p>
              </div>
              <Badge className={getStatusColor(gig.status)}>
                <span className="capitalize">
                  {gig.status.replace("-", " ")}
                </span>
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{gig.progress}%</span>
                </div>
                <Progress value={gig.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-semibold text-foreground">
                      ${gig.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{gig.dueDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {gig.status === "in-progress" && (
                  <>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 crypto-gradient text-white"
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      Submit Work
                    </Button>
                  </>
                )}
                {gig.status === "review" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    disabled
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Pending Review
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Total Active Earnings</p>
              <p className="text-xs text-muted-foreground">
                From {activeGigs.length} gigs
              </p>
            </div>
            <p className="text-2xl font-bold text-primary">
              $
              {activeGigs
                .reduce((sum, gig) => sum + gig.amount, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
