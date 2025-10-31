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
import { Badge } from "@/components/ui/badge";
import { Wallet, User, Award, CheckCircle } from "lucide-react";
import { useAccount, useConnect } from "wagmi";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OnboardingModal({
  open,
  onClose,
}: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleConnectWallet = (connector: any) => {
    connect({ connector });
    setShowWalletOptions(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] glass-effect border-border/40">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to DeFi Gigs</DialogTitle>
          <DialogDescription>
            Complete your profile to start earning with decentralized financing
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div
            className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              {step > 1 ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Wallet className="h-5 w-5" />
              )}
            </div>
            <span className="text-sm hidden sm:inline">Wallet</span>
          </div>
          <div className="w-12 h-0.5 bg-border" />
          <div
            className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              {step > 2 ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
            <span className="text-sm hidden sm:inline">Profile</span>
          </div>
          <div className="w-12 h-0.5 bg-border" />
          <div
            className={`flex items-center gap-2 ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              <Award className="h-5 w-5" />
            </div>
            <span className="text-sm hidden sm:inline">Skills</span>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="p-6 border border-border/40 rounded-lg bg-secondary/20">
              <h3 className="font-semibold mb-3">Connect Your Wallet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your Web3 wallet to Base Sepolia testnet for DeFi
                financing features and secure escrow payments.
              </p>

              {isConnected && address ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-accent">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Wallet Connected!</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-mono">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                  </div>
                </div>
              ) : showWalletOptions ? (
                <div className="space-y-2">
                  {connectors.map((connector) => (
                    <Button
                      key={connector.id}
                      onClick={() => handleConnectWallet(connector)}
                      className="w-full"
                      variant="outline"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      {connector.name}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setShowWalletOptions(false)}
                  >
                    Back
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full crypto-gradient text-white"
                  onClick={() => setShowWalletOptions(true)}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Skip for Now
              </Button>
              <Button
                className="flex-1 crypto-gradient text-white"
                onClick={() => setStep(2)}
                disabled={!isConnected}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input id="title" placeholder="Full Stack Developer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your experience and expertise..."
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1 crypto-gradient text-white"
                onClick={() => setStep(3)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Add Your Skills</Label>
              <div className="flex gap-2">
                <Input
                  id="skills"
                  placeholder="e.g., Solidity, React, UI/UX"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <Button onClick={addSkill}>Add</Button>
              </div>
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
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 Add skills that match your expertise to help clients find you
                for relevant gigs
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(2)}
              >
                Back
              </Button>
              <Button
                className="flex-1 crypto-gradient text-white"
                onClick={onClose}
              >
                Complete Setup
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
