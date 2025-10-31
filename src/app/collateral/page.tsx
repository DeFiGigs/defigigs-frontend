"use client";

import { useState } from "react";
import {
  Shield,
  Users,
  Star,
  Lock,
  TrendingUp,
  Award,
  Plus,
  CheckCircle,
  AlertCircle,
  Wallet,
  FileText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface CollateralStats {
  totalStaked: number;
  reputationScore: number;
  endorsements: number;
  availableForStake: number;
}

interface Endorsement {
  id: string;
  endorserName: string;
  endorserRating: number;
  skill: string;
  stakedAmount: number;
  status: "active" | "completed" | "pending" | "at_risk";
  gigTitle: string;
  expiryDate: string;
}

interface CollateralOption {
  type: string;
  name: string;
  description: string;
  interestRate: number;
  requirement: string;
  icon: any;
  color: string;
}

export default function CollateralPage() {
  const [showRequestEndorsement, setShowRequestEndorsement] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedPeer, setSelectedPeer] = useState("");

  const stats: CollateralStats = {
    totalStaked: 1650,
    reputationScore: 92,
    endorsements: 3,
    availableForStake: 2000,
  };

  const endorsements: Endorsement[] = [
    {
      id: "1",
      endorserName: "Sarah Johnson",
      endorserRating: 4.9,
      skill: "React Development",
      stakedAmount: 500,
      status: "active",
      gigTitle: "E-commerce Dashboard",
      expiryDate: "Jan 15, 2025",
    },
    {
      id: "2",
      endorserName: "Mike Chen",
      endorserRating: 4.7,
      skill: "Smart Contracts",
      stakedAmount: 800,
      status: "active",
      gigTitle: "DeFi Protocol Integration",
      expiryDate: "Jan 20, 2025",
    },
    {
      id: "3",
      endorserName: "Emma Davis",
      endorserRating: 4.8,
      skill: "UI/UX Design",
      stakedAmount: 350,
      status: "completed",
      gigTitle: "Mobile App Design",
      expiryDate: "Completed",
    },
  ];

  const collateralOptions: CollateralOption[] = [
    {
      type: "escrow",
      name: "Escrow Guarantee",
      description: "Backed by client's escrowed payment for the gig",
      interestRate: 0,
      requirement: "Client must deposit payment to escrow first",
      icon: Lock,
      color: "from-blue-500 to-cyan-500",
    },
    {
      type: "endorsement",
      name: "Peer Endorsement",
      description: "Senior workers stake their reputation to vouch for you",
      interestRate: 4,
      requirement: "Need peer with rating 4.5+ to endorse",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
    {
      type: "reputation",
      name: "Reputation Stake",
      description: "Use your on-chain reputation score as collateral",
      interestRate: 6,
      requirement: "Minimum reputation score of 75",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
    },
    {
      type: "mixed",
      name: "Mixed Collateral",
      description: "Combination of reputation + endorsement for better rates",
      interestRate: 3,
      requirement: "Reputation 60+ and 1 endorsement",
      icon: Shield,
      color: "from-green-500 to-teal-500",
    },
  ];

  const handleRequestEndorsement = () => {
    if (!selectedSkill || !selectedPeer) {
      toast.error("Please select both skill and peer");
      return;
    }
    toast.success(`Endorsement request sent to ${selectedPeer}!`);
    setShowRequestEndorsement(false);
    setSelectedSkill("");
    setSelectedPeer("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary text-white">Active</Badge>;
      case "completed":
        return <Badge className="bg-accent text-white">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      case "at_risk":
        return <Badge className="bg-destructive text-white">At Risk</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen dark">
      <Header />
      <Sidebar />

      <main className="ml-64 mt-16 p-8">
        <div className="container mx-auto max-w-[1600px]">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-8 w-8 text-primary" />
                  <h1 className="text-4xl font-bold">
                    Collateral & Endorsements
                  </h1>
                </div>
                <p className="text-muted-foreground">
                  Manage your collateral options and peer endorsements
                </p>
              </div>
              <Dialog
                open={showRequestEndorsement}
                onOpenChange={setShowRequestEndorsement}
              >
                <DialogTrigger asChild>
                  <Button className="crypto-gradient text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Request Endorsement
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Peer Endorsement</DialogTitle>
                    <DialogDescription>
                      Ask a senior worker to stake their reputation for you
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Skill to Endorse</Label>
                      <Select
                        value={selectedSkill}
                        onValueChange={setSelectedSkill}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select skill" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="react">
                            React Development
                          </SelectItem>
                          <SelectItem value="solidity">
                            Smart Contracts
                          </SelectItem>
                          <SelectItem value="design">UI/UX Design</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Select Peer</Label>
                      <Select
                        value={selectedPeer}
                        onValueChange={setSelectedPeer}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a peer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john">
                            John Smith (⭐ 4.9)
                          </SelectItem>
                          <SelectItem value="alice">
                            Alice Brown (⭐ 4.8)
                          </SelectItem>
                          <SelectItem value="robert">
                            Robert Wilson (⭐ 4.7)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="text-sm font-medium mb-1">
                        How It Works
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>
                          • Peer stakes their reputation to vouch for you
                        </div>
                        <div>• They earn rewards if your gig is successful</div>
                        <div>• They lose stake if gig fails or you default</div>
                      </div>
                    </div>

                    <Button
                      className="w-full crypto-gradient text-white"
                      onClick={handleRequestEndorsement}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Send Request
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">
                ${stats.totalStaked.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Staked</p>
            </Card>

            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-accent">
                {stats.reputationScore}
              </p>
              <p className="text-sm text-muted-foreground">Reputation Score</p>
            </Card>

            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{stats.endorsements}</p>
              <p className="text-sm text-muted-foreground">
                Active Endorsements
              </p>
            </Card>

            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <p className="text-2xl font-bold text-accent">
                ${stats.availableForStake.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Available for Stake
              </p>
            </Card>
          </div>

          {/* Collateral Options */}
          <Card className="glass-effect border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Available Collateral Options
              </CardTitle>
              <CardDescription>
                Choose the best collateral type for your financing needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {collateralOptions.map((option, index) => (
                  <Card
                    key={index}
                    className="border-border bg-card/50 hover:border-primary/30 transition-all"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center`}
                        >
                          <option.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{option.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="p-2 rounded bg-card border border-border">
                          <div className="text-xs text-muted-foreground mb-1">
                            Interest Rate
                          </div>
                          <div className="font-semibold text-accent">
                            {option.interestRate}%
                          </div>
                        </div>
                        <div className="p-2 rounded bg-card border border-border">
                          <div className="text-xs text-muted-foreground mb-1">
                            Type
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {option.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-muted/50 mb-3">
                        <div className="text-xs text-muted-foreground">
                          <AlertCircle className="w-3 h-3 inline mr-1" />
                          {option.requirement}
                        </div>
                      </div>

                      <Button variant="outline" className="w-full" size="sm">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="endorsements" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="endorsements">My Endorsements</TabsTrigger>
              <TabsTrigger value="reputation">Reputation Stake</TabsTrigger>
            </TabsList>

            {/* Endorsements Tab */}
            <TabsContent value="endorsements" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Peer Endorsements
                  </CardTitle>
                  <CardDescription>
                    Workers who have endorsed your skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {endorsements.map((endorsement) => (
                      <Card
                        key={endorsement.id}
                        className="border-border bg-card/50 hover:border-primary/30 transition-all"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10 border-2 border-primary/20">
                                <AvatarFallback className="bg-primary text-white text-sm">
                                  {endorsement.endorserName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold">
                                  {endorsement.endorserName}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                  <span>{endorsement.endorserRating}</span>
                                </div>
                              </div>
                            </div>
                            {getStatusBadge(endorsement.status)}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Skill
                              </div>
                              <Badge variant="outline">
                                {endorsement.skill}
                              </Badge>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Staked Amount
                              </div>
                              <div className="font-semibold text-primary">
                                ${endorsement.stakedAmount}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                For Gig
                              </div>
                              <div className="font-semibold text-sm truncate">
                                {endorsement.gigTitle}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Expires
                              </div>
                              <div className="font-semibold text-sm">
                                {endorsement.expiryDate}
                              </div>
                            </div>
                          </div>

                          {endorsement.status === "completed" && (
                            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-accent" />
                              <span className="text-sm text-muted-foreground">
                                Endorsement successful! Rewards distributed to
                                peer.
                              </span>
                            </div>
                          )}

                          {endorsement.status === "active" && (
                            <Button size="sm" variant="outline">
                              <FileText className="mr-2 h-3 w-3" />
                              View Contract
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reputation Tab */}
            <TabsContent value="reputation" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Reputation-Based Collateral
                  </CardTitle>
                  <CardDescription>
                    Use your on-chain reputation score to access financing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Reputation Score Card */}
                    <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              Your Reputation Score
                            </div>
                            <div className="text-4xl font-bold">
                              {stats.reputationScore}/100
                            </div>
                          </div>
                          <div className="w-16 h-16 rounded-full crypto-gradient flex items-center justify-center">
                            <Award className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <Progress
                          value={stats.reputationScore}
                          className="h-3 mb-2"
                        />
                        <div className="text-sm text-muted-foreground">
                          Excellent rating! You can access up to $
                          {stats.availableForStake.toLocaleString()} in
                          reputation-backed financing.
                        </div>
                      </CardContent>
                    </Card>

                    {/* Reputation Breakdown */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="border-border bg-card/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <CheckCircle className="w-5 h-5 text-accent" />
                            <span className="text-2xl font-bold">47</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Completed Gigs
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-border bg-card/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <span className="text-2xl font-bold">4.8</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Average Rating
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-border bg-card/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            <span className="text-2xl font-bold">98%</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            On-Time Delivery
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Available Financing */}
                    <Card className="border-primary/30 bg-card/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                              <Wallet className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-semibold">
                                Available Credit
                              </div>
                              <div className="text-2xl font-bold text-primary">
                                ${stats.availableForStake.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Based on your reputation score at 6% interest
                              </div>
                            </div>
                          </div>
                          <Button className="crypto-gradient text-white">
                            Request Advance
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Info Card */}
          <Card className="p-6 glass-effect border-primary/30 mt-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">About Collateral Options</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong>Escrow Guarantee:</strong> Zero interest when client
                    deposits payment first. Safest option for both parties.
                  </p>
                  <p>
                    <strong>Peer Endorsement:</strong> Senior workers vouch for
                    you. They earn rewards if you succeed, lose stake if you
                    fail.
                  </p>
                  <p>
                    <strong>Reputation Stake:</strong> Use your on-chain
                    reputation score. Higher score = better rates and limits.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
