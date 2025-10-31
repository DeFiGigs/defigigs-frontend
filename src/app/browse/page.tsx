"use client";

import { useState } from "react";
import { Search, Filter, SlidersHorizontal, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import GigCard from "@/components/GigCard";

export default function BrowseGigsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");

  const allGigs = [
    {
      id: 1,
      title: "Smart Contract Security Audit",
      description:
        "Need experienced auditor for DeFi protocol review with comprehensive testing",
      budget: "$5,000 - $8,000",
      category: "Security",
      skills: ["Solidity", "Security", "DeFi"],
      employer: "CryptoVault Labs",
      rating: 4.9,
      verified: true,
    },
    {
      id: 2,
      title: "NFT Marketplace Frontend Development",
      description:
        "Build responsive UI for NFT trading platform with Web3 integration",
      budget: "$3,000 - $5,000",
      category: "Development",
      skills: ["React", "Web3.js", "TypeScript"],
      employer: "NFT Innovations",
      rating: 4.8,
      verified: true,
    },
    {
      id: 3,
      title: "Whitepaper Content Writing",
      description:
        "Technical whitepaper for new blockchain project with detailed tokenomics",
      budget: "$2,000 - $3,000",
      category: "Content",
      skills: ["Technical Writing", "Blockchain", "Research"],
      employer: "ChainTech Solutions",
      rating: 5.0,
      verified: true,
    },
    {
      id: 4,
      title: "DeFi Protocol UI/UX Design",
      description:
        "Design modern and intuitive interface for lending/borrowing platform",
      budget: "$4,000 - $6,000",
      category: "Design",
      skills: ["UI/UX", "Figma", "Web3"],
      employer: "DeFi Protocol Inc",
      rating: 4.9,
      verified: true,
    },
    {
      id: 5,
      title: "Token Smart Contract Development",
      description:
        "Create ERC-20 token with custom features and anti-bot mechanisms",
      budget: "$3,500 - $5,500",
      category: "Development",
      skills: ["Solidity", "Smart Contracts", "Testing"],
      employer: "Token Labs",
      rating: 4.7,
      verified: true,
    },
    {
      id: 6,
      title: "Blockchain Marketing Campaign",
      description:
        "Full marketing strategy for new NFT project launch on multiple platforms",
      budget: "$2,500 - $4,000",
      category: "Marketing",
      skills: ["Marketing", "Social Media", "Community"],
      employer: "NFT Studio",
      rating: 4.6,
      verified: false,
    },
    {
      id: 7,
      title: "Web3 Integration for E-commerce",
      description:
        "Integrate crypto payments and NFT loyalty program into existing platform",
      budget: "$6,000 - $9,000",
      category: "Development",
      skills: ["Web3.js", "React", "Node.js"],
      employer: "E-Commerce Plus",
      rating: 4.8,
      verified: true,
    },
    {
      id: 8,
      title: "DAO Governance Documentation",
      description:
        "Create comprehensive governance documentation and proposal templates",
      budget: "$1,500 - $2,500",
      category: "Content",
      skills: ["Technical Writing", "DAO", "Governance"],
      employer: "DAO Collective",
      rating: 4.5,
      verified: false,
    },
    {
      id: 9,
      title: "NFT Collection Artwork",
      description:
        "Design 10,000 unique NFT characters with traits and rarity system",
      budget: "$8,000 - $12,000",
      category: "Design",
      skills: ["Illustration", "NFT", "Digital Art"],
      employer: "Art Collective",
      rating: 5.0,
      verified: true,
    },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Development", label: "Development" },
    { value: "Security", label: "Security" },
    { value: "Design", label: "Design" },
    { value: "Content", label: "Content" },
    { value: "Marketing", label: "Marketing" },
  ];

  const budgetRanges = [
    { value: "all", label: "All Budgets" },
    { value: "0-2000", label: "Under $2,000" },
    { value: "2000-5000", label: "$2,000 - $5,000" },
    { value: "5000-10000", label: "$5,000 - $10,000" },
    { value: "10000+", label: "$10,000+" },
  ];

  const filteredGigs = allGigs.filter((gig) => {
    const matchesSearch =
      gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" || gig.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background pointer-events-none" />

        <div className="container relative z-10 px-8 mx-auto max-w-[1400px]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Briefcase className="w-8 h-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Browse{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Gigs
                </span>
              </h1>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover freelance opportunities with crypto payments and smart
              escrow protection
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto pt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search gigs, skills, or keywords..."
                  className="pl-10 h-12 bg-card/50 border-border/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                size="lg"
                className="crypto-gradient text-white hover:opacity-90 h-12 px-8"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px] bg-card/50 border-border/50">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                <SelectTrigger className="w-[180px] bg-card/50 border-border/50">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Gigs Grid */}
      <section className="py-12">
        <div className="container px-8 mx-auto max-w-[1400px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {filteredGigs.length} Gigs Available
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedCategory !== "all" &&
                  `Filtered by ${selectedCategory} • `}
                Showing latest opportunities
              </p>
            </div>

            <Badge variant="outline" className="border-primary/50">
              New gigs added daily
            </Badge>
          </div>

          {filteredGigs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGigs.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center glass-effect border-primary/20">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full crypto-gradient flex items-center justify-center mx-auto">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">No gigs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search query to find more
                  opportunities
                </p>
                <Button
                  variant="outline"
                  className="border-primary/50"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedBudget("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
