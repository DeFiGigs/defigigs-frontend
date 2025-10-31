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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface PostGigModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PostGigModal({ open, onClose }: PostGigModalProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto glass-effect border-border/40">
        <DialogHeader>
          <DialogTitle className="text-2xl">Post a New Gig</DialogTitle>
          <DialogDescription>
            Create a gig and connect with talented freelancers in the DeFi space
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Gig Title</Label>
            <Input id="title" placeholder="e.g., Build a DeFi Dashboard" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select defaultValue="development">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="content">Content Writing</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the gig requirements, deliverables, and expectations..."
              rows={5}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (USD)</Label>
              <Input id="budget" type="number" placeholder="5000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select defaultValue="2-3weeks">
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1week">1 week</SelectItem>
                  <SelectItem value="2-3weeks">2-3 weeks</SelectItem>
                  <SelectItem value="1month">1 month</SelectItem>
                  <SelectItem value="2-3months">2-3 months</SelectItem>
                  <SelectItem value="3months+">3+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Required Skills</Label>
            <div className="flex gap-2">
              <Input
                id="skills"
                placeholder="e.g., React, Solidity, Web3"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
              />
              <Button onClick={addSkill}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive/20"
                  onClick={() => removeSkill(skill)}
                >
                  {skill} ×
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="escrow">Escrow Terms</Label>
            <Select defaultValue="milestone">
              <SelectTrigger>
                <SelectValue placeholder="Select escrow terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="milestone">
                  Milestone-based Release
                </SelectItem>
                <SelectItem value="completion">
                  Full Payment on Completion
                </SelectItem>
                <SelectItem value="weekly">Weekly Payments</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm">Escrow Protection</h4>
            <p className="text-xs text-muted-foreground">
              Your payment will be held in a secure smart contract escrow until
              the freelancer completes the work to your satisfaction.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1 crypto-gradient text-white">
              Post Gig
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
