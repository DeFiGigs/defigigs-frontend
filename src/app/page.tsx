"use client";

import { useState } from "react";
import {
  Briefcase,
  Shield,
  Wallet,
  TrendingUp,
  Users,
  Globe,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Lock,
  Zap,
  Award,
  Search,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import OnboardingModal from "@/components/OnboardingModal";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const router = useRouter();

  const handleBrowseGigs = () => {
    router.push("/browse");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="container relative z-10 px-8 mx-auto max-w-[1400px]">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="crypto-gradient text-white border-0 px-4 py-1.5">
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by Smart Contracts on Base
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Freelance Gigs with{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Crypto Payments
              </span>{" "}
              & Smart Escrow
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access instant financing for your projects with decentralized
              escrow protection. Get paid in crypto, build your reputation
              on-chain, and work with confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="crypto-gradient text-white hover:opacity-90 w-full sm:w-auto"
                onClick={handleBrowseGigs}
              >
                <Search className="mr-2 h-5 w-5" />
                Find Gigs
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary/50 hover:bg-primary/10"
                onClick={() => router.push("#post")}
              >
                <FileText className="mr-2 h-5 w-5" />
                Post a Gig
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Smart Escrow</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Instant Financing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>On-Chain Reputation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/40 glass-effect">
        <div className="container px-8 mx-auto max-w-[1400px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Gigs", value: "1,234", icon: Briefcase },
              { label: "Total Paid", value: "$2.5M", icon: Wallet },
              { label: "Freelancers", value: "5,678", icon: Users },
              { label: "Success Rate", value: "98%", icon: TrendingUp },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex justify-center">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32">
        <div className="container px-8 mx-auto max-w-[1400px]">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-primary/50">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              Simple, Secure, and{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Decentralized
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three easy steps to start earning or hiring with
              blockchain-powered protection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Connect & Browse",
                description:
                  "Connect your wallet and explore gigs that match your skills. Or post a job and find the perfect freelancer.",
                icon: Globe,
                color: "from-purple-500 to-purple-600",
              },
              {
                step: "02",
                title: "Secure with Escrow",
                description:
                  "Employers deposit payment into smart contract escrow. Workers can request advance financing with collateral options.",
                icon: Lock,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "03",
                title: "Work & Get Paid",
                description:
                  "Complete the work, submit deliverables, and get paid automatically when approved. Build your on-chain reputation.",
                icon: Zap,
                color: "from-pink-500 to-rose-600",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="relative p-8 glass-effect border-primary/20 hover:border-primary/50 transition-all group"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                  {step.step}
                </div>
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-card/30">
        <div className="container px-8 mx-auto max-w-[1400px]">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-primary/50">
              Platform Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              Everything You Need for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                DeFi Freelancing
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Smart Escrow Protection",
                description:
                  "Payments locked in smart contracts until work is verified and approved",
              },
              {
                icon: Wallet,
                title: "Instant Financing",
                description:
                  "Access advance funding with flexible collateral options before starting work",
              },
              {
                icon: Award,
                title: "On-Chain Reputation",
                description:
                  "Build verifiable credentials and NFT badges based on your work history",
              },
              {
                icon: TrendingUp,
                title: "Crypto Payments",
                description:
                  "Get paid in stablecoins or crypto tokens instantly upon completion",
              },
              {
                icon: Users,
                title: "Global Marketplace",
                description:
                  "Connect with clients and freelancers worldwide without borders",
              },
              {
                icon: Zap,
                title: "Auto Repayment",
                description:
                  "Advance loans automatically deducted from escrow when work is paid",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 glass-effect border-primary/20 hover:glow-effect transition-all"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="post" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 crypto-gradient opacity-10" />
        <div className="container relative z-10 px-8 mx-auto max-w-[1400px]">
          <Card className="max-w-4xl mx-auto p-12 glass-effect border-primary/30 text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                DeFi Journey?
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of freelancers and employers using blockchain
              technology for secure, transparent work relationships
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="crypto-gradient text-white hover:opacity-90 w-full sm:w-auto"
                onClick={() => setShowOnboarding(true)}
              >
                <Wallet className="mr-2 h-5 w-5" />
                Get Started Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary/50"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40">
        <div className="container px-8 mx-auto max-w-[1400px]">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg crypto-gradient flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DF</span>
                </div>
                <span className="font-bold">DeFi Gigs</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering freelancers and employers with blockchain technology
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button
                    onClick={handleBrowseGigs}
                    className="hover:text-foreground transition-colors"
                  >
                    Browse Gigs
                  </button>
                </li>
                <li>
                  <a href="#post" className="hover:text-foreground">
                    Post a Gig
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-foreground">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#demo" className="hover:text-foreground">
                    Demo Mode
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>© 2025 DeFi Gigs. Built on Base. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <OnboardingModal
        open={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
}
