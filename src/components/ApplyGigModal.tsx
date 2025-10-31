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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { DollarSign, Clock, FileText } from "lucide-react";

interface ApplyGigModalProps {
  open: boolean;
  onClose: () => void;
  gigTitle: string;
  gigBudget: string;
}

export default function ApplyGigModal({
  open,
  onClose,
  gigTitle,
  gigBudget,
}: ApplyGigModalProps) {
  const [needAdvance, setNeedAdvance] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto glass-effect border-border/40">
        <DialogHeader>
          <DialogTitle className="text-2xl">Apply for Gig</DialogTitle>
          <DialogDescription>
            Submit your proposal for: {gigTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Gig Info */}
          <Card className="p-4 bg-primary/10 border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">
                  Budget: {gigBudget}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">2-3 weeks</span>
              </div>
            </div>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              placeholder="Explain why you're the best fit for this gig..."
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proposedRate">Your Proposed Rate (USD)</Label>
            <Input id="proposedRate" type="number" placeholder="2500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">Estimated Timeline</Label>
            <Input id="timeline" placeholder="e.g., 2 weeks" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio Link (Optional)</Label>
            <Input id="portfolio" placeholder="https://yourportfolio.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments</Label>
            <div className="flex items-center gap-2">
              <Input id="attachments" type="file" className="flex-1" />
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Advance Financing Option */}
          <Card className="p-4 bg-accent/10 border-accent/30">
            <div className="flex items-start gap-3">
              <Checkbox
                id="advance"
                checked={needAdvance}
                onCheckedChange={(checked) =>
                  setNeedAdvance(checked as boolean)
                }
              />
              <div className="flex-1">
                <Label
                  htmlFor="advance"
                  className="text-sm font-semibold cursor-pointer"
                >
                  Request Advance Financing
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Get up to 80% upfront payment after winning the gig with
                  flexible collateral options
                </p>
              </div>
            </div>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1 crypto-gradient text-white">
              Submit Proposal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
