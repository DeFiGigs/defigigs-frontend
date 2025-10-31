"use client";

import { useState } from "react";
import {
  User,
  Award,
  Briefcase,
  DollarSign,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  BadgeCheck,
  Wallet,
  Star,
  Edit,
  Plus,
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface WorkerProfile {
  name: string;
  avatar: string;
  rating: number;
  completedGigs: number;
  totalEarnings: number;
  reputationScore: number;
  skills: string[];
  bio: string;
  joinedDate: string;
  badges: string[];
}

interface Endorsement {
  id: string;
  endorserName: string;
  endorserRating: number;
  skill: string;
  stakedAmount: number;
  date: string;
  status: "active" | "completed" | "pending";
}

interface AdvanceRequest {
  id: string;
  gigTitle: string;
  requestedAmount: number;
  collateralType: string;
  collateralAmount: number;
  status: "approved" | "pending" | "rejected";
  repaymentDue: string;
  interestRate: number;
}

export default function WorkerContent() {
  const [editProfile, setEditProfile] = useState(false);
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [collateralType, setCollateralType] = useState("");

  const profile: WorkerProfile = {
    name: "Alex Martinez",
    avatar: "/avatars/alex.jpg",
    rating: 4.8,
    completedGigs: 47,
    totalEarnings: 28450,
    reputationScore: 92,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "UI/UX Design",
      "Smart Contracts",
    ],
    bio: "Full-stack developer with 5+ years of experience in web3 and DeFi applications. Passionate about building decentralized solutions.",
    joinedDate: "Jan 2024",
    badges: ["Top Rated", "Fast Delivery", "Verified", "Early Adopter"],
  };

  const endorsements: Endorsement[] = [
    {
      id: "1",
      endorserName: "Sarah Johnson",
      endorserRating: 4.9,
      skill: "React Development",
      stakedAmount: 500,
      date: "2 days ago",
      status: "active",
    },
    {
      id: "2",
      endorserName: "Mike Chen",
      endorserRating: 4.7,
      skill: "Smart Contracts",
      stakedAmount: 800,
      date: "5 days ago",
      status: "active",
    },
    {
      id: "3",
      endorserName: "Emma Davis",
      endorserRating: 4.8,
      skill: "UI/UX Design",
      stakedAmount: 350,
      date: "1 week ago",
      status: "completed",
    },
  ];

  const advanceRequests: AdvanceRequest[] = [
    {
      id: "1",
      gigTitle: "E-commerce Dashboard Development",
      requestedAmount: 1000,
      collateralType: "Reputation Stake",
      collateralAmount: 500,
      status: "approved",
      repaymentDue: "7 days",
      interestRate: 5,
    },
    {
      id: "2",
      gigTitle: "Mobile App Design",
      requestedAmount: 600,
      collateralType: "Peer Endorsement",
      collateralAmount: 800,
      status: "pending",
      repaymentDue: "10 days",
      interestRate: 4,
    },
  ];

  const handleRequestAdvance = () => {
    if (!advanceAmount || !collateralType) {
      alert("Please fill in all fields");
      return;
    }
    alert(
      `Requesting advance of $${advanceAmount} with ${collateralType} collateral...`,
    );
    setAdvanceAmount("");
    setCollateralType("");
  };

  const handleRequestEndorsement = () => {
    alert("Sending endorsement request to peers...");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-accent text-white">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-destructive text-white">Rejected</Badge>;
      case "active":
        return <Badge className="bg-primary text-white">Active</Badge>;
      case "completed":
        return <Badge className="bg-accent text-white">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Worker Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your profile, endorsements, and advance financing
          </p>
        </div>

        {/* Profile Card */}
        <Card className="glass-effect border-primary/20 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar & Basic Info */}
              <div className="flex flex-col items-center md:items-start gap-4">
                <Avatar className="w-32 h-32 border-4 border-primary/20">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-2xl bg-primary text-white">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Dialog open={editProfile} onOpenChange={setEditProfile}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Update your profile information
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Name</Label>
                        <Input defaultValue={profile.name} />
                      </div>
                      <div>
                        <Label>Bio</Label>
                        <Textarea defaultValue={profile.bio} rows={4} />
                      </div>
                      <div>
                        <Label>Skills (comma separated)</Label>
                        <Input defaultValue={profile.skills.join(", ")} />
                      </div>
                      <Button className="w-full crypto-gradient text-white">
                        Save Changes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-5 h-5 fill-yellow-500" />
                      <span className="font-semibold">{profile.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{profile.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.badges.map((badge, index) => (
                      <Badge key={index} className="crypto-gradient text-white">
                        <BadgeCheck className="w-3 h-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-card/50 border border-border">
                    <div className="text-xs text-muted-foreground mb-1">
                      Completed Gigs
                    </div>
                    <div className="text-xl font-bold">
                      {profile.completedGigs}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-card/50 border border-border">
                    <div className="text-xs text-muted-foreground mb-1">
                      Total Earnings
                    </div>
                    <div className="text-xl font-bold text-accent">
                      ${profile.totalEarnings.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-card/50 border border-border">
                    <div className="text-xs text-muted-foreground mb-1">
                      Reputation Score
                    </div>
                    <div className="text-xl font-bold text-primary">
                      {profile.reputationScore}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-card/50 border border-border">
                    <div className="text-xs text-muted-foreground mb-1">
                      Member Since
                    </div>
                    <div className="text-xl font-bold">
                      {profile.joinedDate}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="text-sm font-semibold mb-2">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="endorsements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
            <TabsTrigger value="endorsements">Endorsements</TabsTrigger>
            <TabsTrigger value="advance">Advance Financing</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
          </TabsList>

          {/* Endorsements Tab */}
          <TabsContent value="endorsements" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Request Endorsement Card */}
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Request Endorsement
                  </CardTitle>
                  <CardDescription>
                    Get endorsed by top workers to increase your credibility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Skill to Endorse</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select skill" />
                      </SelectTrigger>
                      <SelectContent>
                        {profile.skills.map((skill, index) => (
                          <SelectItem key={index} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Peer</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a peer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah">
                          Sarah Johnson (⭐ 4.9)
                        </SelectItem>
                        <SelectItem value="mike">Mike Chen (⭐ 4.7)</SelectItem>
                        <SelectItem value="emma">
                          Emma Davis (⭐ 4.8)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="text-sm text-muted-foreground mb-1">
                      Endorser stakes their reputation
                    </div>
                    <div className="text-xs text-muted-foreground">
                      They earn rewards if you succeed, lose stake if you fail
                    </div>
                  </div>

                  <Button
                    className="w-full crypto-gradient text-white"
                    onClick={handleRequestEndorsement}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Request Endorsement
                  </Button>
                </CardContent>
              </Card>

              {/* Endorsement Stats */}
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Endorsement Overview
                  </CardTitle>
                  <CardDescription>
                    Your social trust and reputation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Total Endorsements
                      </div>
                      <div className="text-2xl font-bold text-accent">
                        {endorsements.length}
                      </div>
                    </div>
                    <Users className="w-8 h-8 text-accent" />
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Total Staked
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        $
                        {endorsements
                          .reduce((sum, e) => sum + e.stakedAmount, 0)
                          .toLocaleString()}
                      </div>
                    </div>
                    <Wallet className="w-8 h-8 text-primary" />
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-card border border-border">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Trust Score
                      </div>
                      <div className="text-2xl font-bold">
                        {profile.reputationScore}/100
                      </div>
                    </div>
                    <BadgeCheck className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Endorsements List */}
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  My Endorsements
                </CardTitle>
                <CardDescription>
                  Peers who have endorsed your skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
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
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                  <span>{endorsement.endorserRating}</span>
                                </div>
                                <span>•</span>
                                <span>{endorsement.date}</span>
                              </div>
                            </div>
                          </div>
                          {getStatusBadge(endorsement.status)}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">
                              Skill Endorsed
                            </div>
                            <Badge variant="outline">{endorsement.skill}</Badge>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">
                              Staked Amount
                            </div>
                            <div className="font-semibold text-primary">
                              ${endorsement.stakedAmount}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advance Financing Tab */}
          <TabsContent value="advance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Request Advance Card */}
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Request Advance
                  </CardTitle>
                  <CardDescription>
                    Get working capital before completing your gig
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Gig Project</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select active gig" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gig1">
                          E-commerce Dashboard Development
                        </SelectItem>
                        <SelectItem value="gig2">Mobile App Design</SelectItem>
                        <SelectItem value="gig3">
                          Logo Redesign Project
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Advance Amount (USD)</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={advanceAmount}
                      onChange={(e) => setAdvanceAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Collateral Option</Label>
                    <Select
                      value={collateralType}
                      onValueChange={setCollateralType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose collateral" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reputation">
                          Reputation Stake (50% of advance)
                        </SelectItem>
                        <SelectItem value="endorsement">
                          Peer Endorsement (Required)
                        </SelectItem>
                        <SelectItem value="escrow">
                          Escrow Guarantee (100% covered)
                        </SelectItem>
                        <SelectItem value="mixed">Mixed Collateral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <div className="text-sm font-medium mb-1">
                      Auto-Repayment
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Advance will be automatically deducted from escrow payment
                      when gig completes
                    </div>
                  </div>

                  <Button
                    className="w-full crypto-gradient text-white"
                    onClick={handleRequestAdvance}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Request Advance
                  </Button>
                </CardContent>
              </Card>

              {/* Advance Stats */}
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Financing Overview
                  </CardTitle>
                  <CardDescription>
                    Your advance financing status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Total Received
                      </div>
                      <div className="text-2xl font-bold text-accent">
                        $3,200
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-accent" />
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Pending Repayment
                      </div>
                      <div className="text-2xl font-bold text-yellow-500">
                        $1,600
                      </div>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-500" />
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-card border border-border">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Credit Limit
                      </div>
                      <div className="text-2xl font-bold">$5,000</div>
                    </div>
                    <Wallet className="w-8 h-8 text-muted-foreground" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Available Credit
                      </span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advance Requests List */}
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  My Advance Requests
                </CardTitle>
                <CardDescription>
                  Track your financing requests and repayments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {advanceRequests.map((request) => (
                    <Card
                      key={request.id}
                      className="border-border bg-card/50 hover:border-primary/30 transition-all"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold mb-1">
                              {request.gigTitle}
                            </h3>
                            <div className="text-sm text-muted-foreground">
                              Due in {request.repaymentDue}
                            </div>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">
                              Advance Amount
                            </div>
                            <div className="font-semibold">
                              ${request.requestedAmount}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">
                              Interest Rate
                            </div>
                            <div className="font-semibold text-accent">
                              {request.interestRate}%
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">
                              Collateral Type
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {request.collateralType}
                            </Badge>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">
                              Collateral Value
                            </div>
                            <div className="font-semibold">
                              ${request.collateralAmount}
                            </div>
                          </div>
                        </div>

                        {request.status === "approved" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="success-gradient text-white"
                            >
                              <CheckCircle className="mr-2 h-3 w-3" />
                              View Repayment Schedule
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Credentials Tab */}
          <TabsContent value="credentials" className="space-y-6">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  On-Chain Credentials & NFTs
                </CardTitle>
                <CardDescription>
                  Your verifiable achievements and reputation tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* NFT Badges */}
                  {[
                    {
                      name: "Top Rated Worker",
                      description: "Maintained 4.8+ rating for 6 months",
                      rarity: "Gold",
                    },
                    {
                      name: "Fast Delivery Master",
                      description: "Completed 30+ gigs ahead of schedule",
                      rarity: "Silver",
                    },
                    {
                      name: "Verified Developer",
                      description: "Passed technical verification",
                      rarity: "Bronze",
                    },
                  ].map((badge, index) => (
                    <Card
                      key={index}
                      className="border-border bg-gradient-to-br from-primary/20 to-accent/20 hover:scale-105 transition-transform cursor-pointer"
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-20 h-20 mx-auto mb-3 rounded-full crypto-gradient flex items-center justify-center">
                          <BadgeCheck className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="font-semibold mb-1">{badge.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {badge.description}
                        </p>
                        <Badge className="crypto-gradient text-white">
                          {badge.rarity}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-card/50 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg crypto-gradient flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">
                        Reputation SBT (Soulbound Token)
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Score: {profile.reputationScore}/100 • Non-transferable
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View on Explorer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
