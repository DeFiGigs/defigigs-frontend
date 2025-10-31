"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { DollarSign, Shield, TrendingUp } from "lucide-react";

interface FinancingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function FinancingModal({ open, onClose }: FinancingModalProps) {
  const [advancePercent, setAdvancePercent] = useState([70]);
  const gigAmount = 5000;
  const advanceAmount = (gigAmount * advancePercent[0]) / 100;
  const collateralRequired = advanceAmount * 0.2;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] glass-effect border-border/40">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Request Advance Financing
          </DialogTitle>
          <DialogDescription>
            Get instant liquidity on your active gigs with flexible terms
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Gig Selection */}
          <div className="space-y-2">
            <Label>Select Gig</Label>
            <Select defaultValue="gig1">
              <SelectTrigger>
                <SelectValue placeholder="Choose a gig" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gig1">
                  DeFi Protocol Integration - $5,000
                </SelectItem>
                <SelectItem value="gig2">
                  Token Economics Design - $2,000
                </SelectItem>
                <SelectItem value="gig3">
                  Smart Contract Audit - $3,500
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advance Amount Slider */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Advance Amount</Label>
              <span className="text-sm text-muted-foreground">
                {advancePercent[0]}%
              </span>
            </div>
            <Slider
              value={advancePercent}
              onValueChange={setAdvancePercent}
              max={80}
              min={30}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>30%</span>
              <span>80% max</span>
            </div>
          </div>

          {/* Collateral Options */}
          <div className="space-y-2">
            <Label>Collateral Type</Label>
            <Select defaultValue="crypto">
              <SelectTrigger>
                <SelectValue placeholder="Select collateral" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crypto">
                  Cryptocurrency (ETH, BTC)
                </SelectItem>
                <SelectItem value="nft">NFT Assets</SelectItem>
                <SelectItem value="reputation">Reputation Score</SelectItem>
                <SelectItem value="hybrid">
                  Hybrid (Crypto + Reputation)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-primary/10 border-primary/30">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  You Receive
                </span>
              </div>
              <p className="text-2xl font-bold">
                ${advanceAmount.toLocaleString()}
              </p>
            </Card>
            <Card className="p-4 bg-accent/10 border-accent/30">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-xs text-muted-foreground">
                  Collateral
                </span>
              </div>
              <p className="text-2xl font-bold">
                ${collateralRequired.toLocaleString()}
              </p>
            </Card>
            <Card className="p-4 bg-secondary/30 border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs text-muted-foreground">Fee</span>
              </div>
              <p className="text-2xl font-bold">2.5%</p>
            </Card>
          </div>

          {/* Terms */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm">Terms & Conditions</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Advance will be disbursed immediately upon approval</li>
              <li>• Repayment automatically deducted from gig payment</li>
              <li>• Collateral released upon successful repayment</li>
              <li>• 2.5% platform fee applies to advance amount</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1 crypto-gradient text-white">
              Request ${advanceAmount.toLocaleString()}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
