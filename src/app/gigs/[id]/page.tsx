"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SubmitWorkModal from "@/components/SubmitWorkModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Clock,
  DollarSign,
  MapPin,
  Star,
  Briefcase,
  CheckCircle2,
  Users,
  Calendar,
  Shield,
  TrendingUp,
  Award,
  MessageSquare,
  Heart,
  Share2,
} from "lucide-react";
import GigCard from "@/components/GigCard";

// Mock data - in real app, this would come from API
const gigData: Record<string, any> = {
  "1": {
    id: "1",
    title: "Build DeFi Dashboard UI",
    description: `We are looking for an experienced frontend developer to create a modern, responsive DeFi dashboard with real-time data visualization and wallet integration.

**Project Overview:**
Our DeFi platform needs a sophisticated user interface that can display real-time market data, portfolio analytics, and transaction history. The dashboard should be intuitive, performant, and visually appealing.

**What We're Looking For:**
- Expert-level React.js and Next.js knowledge
- Experience with Web3 libraries (ethers.js, web3.js)
- Proficiency in data visualization libraries (Chart.js, D3.js, Recharts)
- Strong understanding of responsive design and modern CSS frameworks
- Previous experience building financial or trading dashboards

**Project Deliverables:**
1. Responsive dashboard layout with dark/light theme support
2. Real-time price charts and market data integration
3. Wallet connection and transaction management UI
4. Portfolio overview with asset allocation charts
5. Transaction history table with filtering
6. Notification system for important events

**Technical Requirements:**
- Next.js 14+ with App Router
- TypeScript for type safety
- Integration with Web3 wallets (MetaMask, WalletConnect)
- REST API and WebSocket integration for real-time data
- Clean, maintainable, and well-documented code

**Additional Information:**
The project includes design mockups that will be shared with the selected developer. We value attention to detail, clean code practices, and proactive communication.`,
    budget: "$2,500",
    budgetType: "Fixed Price",
    duration: "2-3 weeks",
    category: "Development",
    subcategory: "Frontend Development",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Web3.js",
      "Tailwind CSS",
      "Chart.js",
      "REST API",
    ],
    experienceLevel: "Expert",
    projectType: "One-time project",
    client: {
      name: "CryptoVentures",
      rating: 4.9,
      reviews: 127,
      jobsPosted: 45,
      hireRate: 92,
      location: "San Francisco, CA",
      memberSince: "2021",
      totalSpent: "$125,000+",
      verified: true,
    },
    proposals: 12,
    postedDate: "2 days ago",
    estimatedTime: "Less than 1 month",
  },
  "2": {
    id: "2",
    title: "Smart Contract Audit",
    description: `Seeking a security expert to conduct a comprehensive audit of our NFT marketplace smart contracts built on Ethereum.

**Project Scope:**
We have developed a series of smart contracts for an NFT marketplace that handles minting, buying, selling, and royalty distribution. We need a thorough security audit before mainnet deployment.

**Contracts to Audit:**
- NFT Collection Contract (ERC-721)
- Marketplace Contract with bidding system
- Royalty Distribution Contract
- Access Control and Admin functions

**What We Need:**
- Line-by-line code review
- Security vulnerability assessment
- Gas optimization recommendations
- Best practices evaluation
- Detailed audit report with findings

**Required Expertise:**
- Extensive Solidity development experience
- Knowledge of common smart contract vulnerabilities
- Experience with OpenZeppelin libraries
- Familiarity with audit tools (Slither, Mythril, etc.)
- Previous audit experience required`,
    budget: "$5,000",
    budgetType: "Fixed Price",
    duration: "1 week",
    category: "Security",
    subcategory: "Smart Contract Audit",
    skills: [
      "Solidity",
      "Security",
      "Ethereum",
      "Smart Contracts",
      "OpenZeppelin",
    ],
    experienceLevel: "Expert",
    projectType: "One-time project",
    client: {
      name: "NFTMarket",
      rating: 5.0,
      reviews: 89,
      jobsPosted: 23,
      hireRate: 95,
      location: "London, UK",
      memberSince: "2020",
      totalSpent: "$250,000+",
      verified: true,
    },
    proposals: 8,
    postedDate: "1 day ago",
    estimatedTime: "1 to 2 weeks",
  },
  "3": {
    id: "3",
    title: "Content Writing for Crypto Blog",
    description: `We're looking for a talented content writer to create educational and engaging articles about DeFi, blockchain technology, and cryptocurrency trends.

**Content Requirements:**
- 5 articles per week (1500-2000 words each)
- SEO-optimized content
- Well-researched and fact-checked
- Clear explanations of complex topics
- Engaging writing style for technical audience

**Topics Include:**
- DeFi protocols and innovations
- Blockchain technology explainers
- Cryptocurrency market analysis
- Web3 and NFT trends
- Security and best practices

**Ideal Candidate:**
- Native English speaker or equivalent proficiency
- Deep understanding of blockchain and crypto
- Portfolio of published crypto content
- SEO writing experience
- Ability to explain technical concepts clearly`,
    budget: "$800",
    budgetType: "Monthly Retainer",
    duration: "2 weeks",
    category: "Content",
    subcategory: "Blog Writing",
    skills: [
      "Content Writing",
      "SEO",
      "Blockchain",
      "Cryptocurrency",
      "Research",
    ],
    experienceLevel: "Intermediate",
    projectType: "Ongoing",
    client: {
      name: "CryptoNews",
      rating: 4.7,
      reviews: 234,
      jobsPosted: 156,
      hireRate: 88,
      location: "Remote",
      memberSince: "2019",
      totalSpent: "$75,000+",
      verified: true,
    },
    proposals: 24,
    postedDate: "3 days ago",
    estimatedTime: "1 to 3 months",
  },
  "4": {
    id: "4",
    title: "Mobile Wallet App Development",
    description: `Looking for an experienced mobile developer to build a cross-platform cryptocurrency wallet app with advanced features.

**Project Overview:**
Build a secure, user-friendly mobile wallet supporting multiple blockchains with biometric authentication and intuitive UX.

**Key Features:**
- Multi-chain support (Ethereum, BSC, Polygon, etc.)
- Secure key management and storage
- Biometric authentication (Face ID, Touch ID)
- Token and NFT management
- Transaction history and analytics
- QR code scanning for payments
- Push notifications
- In-app token swaps

**Technical Stack:**
- React Native or Flutter
- Web3 integration libraries
- Secure storage solutions
- RESTful API integration

**Requirements:**
- 3+ years mobile development experience
- Previous blockchain/crypto app development
- Understanding of security best practices
- App Store and Google Play deployment experience`,
    budget: "$8,000",
    budgetType: "Fixed Price",
    duration: "6-8 weeks",
    category: "Development",
    subcategory: "Mobile Development",
    skills: [
      "React Native",
      "Flutter",
      "Web3",
      "Mobile Security",
      "Blockchain",
      "UI/UX",
    ],
    experienceLevel: "Expert",
    projectType: "One-time project",
    client: {
      name: "WalletLabs",
      rating: 4.8,
      reviews: 67,
      jobsPosted: 34,
      hireRate: 90,
      location: "Singapore",
      memberSince: "2022",
      totalSpent: "$180,000+",
      verified: true,
    },
    proposals: 15,
    postedDate: "5 days ago",
    estimatedTime: "1 to 3 months",
  },
};

export default function GigDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [coverLetter, setCoverLetter] = useState("");
  const [proposedBudget, setProposedBudget] = useState("");
  const [proposedTimeline, setProposedTimeline] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [showSubmitWorkModal, setShowSubmitWorkModal] = useState(false);

  const gig = gigData[params.id as string];

  if (!gig) {
    return (
      <div className="min-h-screen dark flex items-center justify-center">
        <Header />
        <Sidebar />
        <div className="text-center">
          <h1 className="text-2xl font-bold">Gig not found</h1>
          <Button onClick={() => router.push("/")} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    // In real app, submit application
    alert(
      "Application submitted successfully! You'll be notified once the client reviews your proposal.",
    );
    // Navigate to my gigs page
    router.push("/my-gigs");
  };

  return (
    <div className="min-h-screen dark">
      <Header />
      <Sidebar />

      <main className="ml-64 mt-16 p-8">
        <div className="container mx-auto max-w-[1600px]">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => window.close()}
            className="mb-6 hover:bg-secondary/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card className="p-6 glass-effect border-border/40">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{gig.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Posted {gig.postedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {gig.client.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {gig.proposals} proposals
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSaved(!isSaved)}
                      className={isSaved ? "text-red-500" : ""}
                    >
                      <Heart
                        className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`}
                      />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge
                    variant="secondary"
                    className="crypto-gradient text-white"
                  >
                    {gig.category}
                  </Badge>
                  <Badge variant="outline">{gig.experienceLevel}</Badge>
                  <Badge variant="outline">{gig.projectType}</Badge>
                  <Badge variant="outline">{gig.estimatedTime}</Badge>
                </div>

                <Separator className="my-6" />

                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <div className="prose prose-invert max-w-none whitespace-pre-wrap text-muted-foreground">
                    {gig.description}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Skills Required */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Skills Required
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {gig.skills.map((skill: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-primary/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Project Scope */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Project Scope</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Budget</span>
                      </div>
                      <p className="text-2xl font-bold">{gig.budget}</p>
                      <p className="text-sm text-muted-foreground">
                        {gig.budgetType}
                      </p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Duration</span>
                      </div>
                      <p className="text-2xl font-bold">{gig.duration}</p>
                      <p className="text-sm text-muted-foreground">
                        {gig.estimatedTime}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Application Form */}
              <Card className="p-6 glass-effect border-border/40">
                <h2 className="text-xl font-semibold mb-4">
                  Submit Your Proposal
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cover-letter">Cover Letter</Label>
                    <Textarea
                      id="cover-letter"
                      placeholder="Introduce yourself and explain why you're the best fit for this project..."
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={6}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum 100 characters
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Your Proposed Budget</Label>
                      <Input
                        id="budget"
                        type="text"
                        placeholder="e.g., $2,500"
                        value={proposedBudget}
                        onChange={(e) => setProposedBudget(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="timeline">Delivery Timeline</Label>
                      <Input
                        id="timeline"
                        type="text"
                        placeholder="e.g., 2 weeks"
                        value={proposedTimeline}
                        onChange={(e) => setProposedTimeline(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Apply with Financing
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Need upfront capital? Get up to 80% advance financing with
                      flexible collateral options.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Request Advance Financing
                    </Button>
                  </div>

                  <Button
                    onClick={handleApply}
                    className="w-full crypto-gradient text-white"
                    size="lg"
                    disabled={!coverLetter.trim() || coverLetter.length < 100}
                  >
                    Submit Application
                  </Button>
                </div>
              </Card>

              {/* Similar Gigs */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Similar Gigs</h2>
                <div className="grid grid-cols-1 gap-4">
                  {Object.values(gigData)
                    .filter(
                      (g) => g.id !== gig.id && g.category === gig.category,
                    )
                    .slice(0, 2)
                    .map((similarGig) => (
                      <GigCard
                        key={similarGig.id}
                        gig={{
                          id: parseInt(similarGig.id),
                          title: similarGig.title,
                          description:
                            similarGig.description.substring(0, 150) + "...",
                          budget: similarGig.budget,
                          category: similarGig.category,
                          skills: similarGig.skills,
                          employer: similarGig.client.name,
                          rating: similarGig.client.rating,
                          verified: similarGig.client.verified,
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Client Info */}
                <Card className="p-6 glass-effect border-border/40">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {gig.client.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">
                            {gig.client.rating}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({gig.client.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    {gig.client.verified && (
                      <Badge className="crypto-gradient text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Member since
                      </span>
                      <span className="font-semibold">
                        {gig.client.memberSince}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total spent</span>
                      <span className="font-semibold">
                        {gig.client.totalSpent}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Jobs posted</span>
                      <span className="font-semibold">
                        {gig.client.jobsPosted}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Hire rate</span>
                      <span className="font-semibold">
                        {gig.client.hireRate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-semibold">
                        {gig.client.location}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full mt-4" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Client
                  </Button>
                </Card>

                {/* Quick Stats */}
                <Card className="p-6 glass-effect border-border/40">
                  <h3 className="font-semibold mb-4">Why Apply?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">High Budget</p>
                        <p className="text-xs text-muted-foreground">
                          Above market rate
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Verified Client</p>
                        <p className="text-xs text-muted-foreground">
                          {gig.client.hireRate}% hire rate
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">
                          Escrow Protected
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Payment guaranteed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">
                          Financing Available
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Get advance payment
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Submit Work Modal */}
      <SubmitWorkModal
        open={showSubmitWorkModal}
        onClose={() => setShowSubmitWorkModal(false)}
        gigTitle={gig.title}
      />
    </div>
  );
}
