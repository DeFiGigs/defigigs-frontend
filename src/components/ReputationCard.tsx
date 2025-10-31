"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Award, TrendingUp, CheckCircle } from "lucide-react";

export default function ReputationCard() {
  return (
    <Card className="p-6 glass-effect border-border/40">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Reputation Score</h3>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
          <span className="text-2xl font-bold">4.8</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Score Breakdown */}
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Gigs Completed</span>
              <span className="font-semibold">24/25</span>
            </div>
            <Progress value={96} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">On-Time Delivery</span>
              <span className="font-semibold">22/24</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Client Satisfaction</span>
              <span className="font-semibold">4.9/5.0</span>
            </div>
            <Progress value={98} className="h-2" />
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="font-semibold mb-3 text-sm">Achievements</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-xs">Top Performer</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-accent/10 rounded-lg">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-xs">Verified Pro</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-secondary/30 rounded-lg">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">Rising Star</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-secondary/30 rounded-lg">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-xs">5-Star Rating</span>
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div>
          <h4 className="font-semibold mb-3 text-sm">Recent Reviews</h4>
          <div className="space-y-3">
            <div className="p-3 bg-secondary/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">CryptoVentures</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                "Excellent work on the DeFi dashboard. Professional and timely
                delivery!"
              </p>
            </div>
            <div className="p-3 bg-secondary/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">NFTMarket</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                  <Star className="h-3 w-3 text-yellow-500" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                "Great smart contract audit. Very thorough and detailed."
              </p>
            </div>
          </div>
        </div>

        {/* Trust Score */}
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Trust Score</p>
              <p className="text-xs text-muted-foreground">Verified on-chain</p>
            </div>
            <Badge className="crypto-gradient text-white">Elite</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
