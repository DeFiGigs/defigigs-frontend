"use client";

import { useState } from "react";
import {
  Lock,
  Shield,
  CheckCircle,
  Clock,
  DollarSign,
  AlertCircle,
  ArrowRight,
  FileText,
  Eye,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { toast } from "sonner";

interface EscrowStats {
  totalLocked: number;
  activeEscrows: number;
  pendingRelease: number;
  totalReleased: number;
}

interface EscrowContract {
  id: string;
  gigTitle: string;
  client: string;
  worker: string;
  amount: number;
  status: "locked" | "pending_release" | "released" | "disputed";
  lockDate: string;
  releaseDate?: string;
  advanceDeducted: number;
  progress: number;
  conditions: string[];
}

export default function EscrowPage() {
  const stats: EscrowStats = {
    totalLocked: 4200,
    activeEscrows: 3,
    pendingRelease: 1200,
    totalReleased: 18400,
  };

  const escrowContracts: EscrowContract[] = [
    {
      id: "ESC-001",
      gigTitle: "E-commerce Dashboard Development",
      client: "CryptoVentures",
      worker: "You",
      amount: 2500,
      status: "pending_release",
      lockDate: "Dec 10, 2024",
      advanceDeducted: 1000,
      progress: 100,
      conditions: [
        "All deliverables submitted",
        "Client verification pending",
        "Automatic release in 48h if no response",
      ],
    },
    {
      id: "ESC-002",
      gigTitle: "Mobile App UI/UX Design",
      client: "NFTMarket",
      worker: "You",
      amount: 1200,
      status: "locked",
      lockDate: "Dec 15, 2024",
      advanceDeducted: 0,
      progress: 65,
      conditions: [
        "Payment secured in smart contract",
        "Advance financing available",
        "Auto-release upon approval",
      ],
    },
    {
      id: "ESC-003",
      gigTitle: "Logo & Brand Identity",
      client: "DAOventures",
      worker: "You",
      amount: 800,
      status: "locked",
      lockDate: "Dec 18, 2024",
      advanceDeducted: 400,
      progress: 80,
      conditions: [
        "Advance deduction pre-approved",
        "Final delivery in 2 days",
        "Client can review before release",
      ],
    },
    {
      id: "ESC-004",
      gigTitle: "Smart Contract Audit",
      client: "BlockChainCo",
      worker: "You",
      amount: 3000,
      status: "released",
      lockDate: "Nov 20, 2024",
      releaseDate: "Dec 5, 2024",
      advanceDeducted: 0,
      progress: 100,
      conditions: [
        "Work approved by client",
        "Payment released successfully",
        "Reputation updated",
      ],
    },
  ];

  const handleRequestRelease = (escrowId: string) => {
    toast.success("Release request submitted! Client will be notified.");
  };

  const handleViewContract = (escrowId: string) => {
    toast.info("Opening smart contract details...");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "locked":
        return <Badge className="bg-yellow-500 text-white">Locked</Badge>;
      case "pending_release":
        return <Badge className="bg-purple-500 text-white">Pending Release</Badge>;
      case "released":
        return <Badge className="bg-accent text-white">Released</Badge>;
      case "disputed":
        return <Badge className="bg-destructive text-white">Disputed</Badge>;
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
            <div className="flex items-center gap-3 mb-2">
              <Lock className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Escrow System</h1>
            </div>
            <p className="text-muted-foreground">
              Smart contract payment protection for secure gig transactions
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <Lock className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-yellow-500">${stats.totalLocked.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Locked</p>
            </Card>

            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{stats.activeEscrows}</p>
              <p className="text-sm text-muted-foreground">Active Escrows</p>
            </Card>

            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-purple-500">${stats.pendingRelease.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Pending Release</p>
            </Card>

            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="h-5 w-5 text-accent" />
              </div>
              <p className="text-2xl font-bold text-accent">${stats.totalReleased.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Released</p>
            </Card>
          </div>

          {/* How Escrow Works */}
          <Card className="glass-effect border-primary/30 mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                How Smart Escrow Works
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  {
                    step: "1",
                    title: "Client Deposits",
                    description: "Payment locked in smart contract",
                    icon: Lock,
                  },
                  {
                    step: "2",
                    title: "Worker Completes",
                    description: "Submit deliverables for review",
                    icon: FileText,
                  },
                  {
                    step: "3",
                    title: "Client Approves",
                    description: "Verify work meets requirements",
                    icon: Eye,
                  },
                  {
                    step: "4",
                    title: "Auto Release",
                    description: "Payment sent to worker wallet",
                    icon: CheckCircle,
                  },
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full crypto-gradient flex items-center justify-center mb-3">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="font-semibold mb-1">{step.title}</div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                    {index < 3 && (
                      <ArrowRight className="hidden md:block absolute top-6 -right-8 w-6 h-6 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending Release</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            {/* Active Escrows */}
            <TabsContent value="active" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-yellow-500" />
                    Active Escrow Contracts
                  </CardTitle>
                  <CardDescription>Payments currently locked in smart contracts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {escrowContracts
                      .filter((contract) => contract.status === "locked")
                      .map((contract) => (
                        <Card
                          key={contract.id}
                          className="border-border bg-card/50 hover:border-primary/30 transition-all"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">{contract.gigTitle}</h3>
                                  {getStatusBadge(contract.status)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Contract ID: {contract.id} • Locked: {contract.lockDate}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Escrow Amount</div>
                                <div className="font-semibold text-yellow-500">${contract.amount}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Client</div>
                                <div className="font-semibold text-sm">{contract.client}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Advance Taken</div>
                                <div className="font-semibold">
                                  {contract.advanceDeducted > 0 ? `$${contract.advanceDeducted}` : "None"}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Net Payment</div>
                                <div className="font-semibold text-accent">
                                  ${contract.amount - contract.advanceDeducted}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2 mb-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Work Progress</span>
                                <span className="font-medium">{contract.progress}%</span>
                              </div>
                              <Progress value={contract.progress} className="h-2" />
                            </div>

                            <div className="p-3 rounded-lg bg-muted/50 mb-3">
                              <div className="text-xs font-medium mb-2">Contract Conditions:</div>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {contract.conditions.map((condition, index) => (
                                  <li key={index}>• {condition}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewContract(contract.id)}
                              >
                                <Eye className="mr-2 h-3 w-3" />
                                View Contract
                              </Button>
                              <Button size="sm" variant="outline">
                                <FileText className="mr-2 h-3 w-3" />
                                Submit Work
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pending Release */}
            <TabsContent value="pending" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    Pending Release
                  </CardTitle>
                  <CardDescription>Awaiting client verification and approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {escrowContracts
                      .filter((contract) => contract.status === "pending_release")
                      .map((contract) => (
                        <Card
                          key={contract.id}
                          className="border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50 transition-all"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">{contract.gigTitle}</h3>
                                  {getStatusBadge(contract.status)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Submitted for review • {contract.lockDate}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-3">
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Total Amount</div>
                                <div className="font-semibold">${contract.amount}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Advance Deduction</div>
                                <div className="font-semibold text-yellow-500">
                                  -${contract.advanceDeducted}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">You'll Receive</div>
                                <div className="font-semibold text-accent">
                                  ${contract.amount - contract.advanceDeducted}
                                </div>
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-3">
                              <div className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-purple-500 mt-0.5" />
                                <div className="text-sm text-muted-foreground">
                                  Automatic release in 48 hours if client doesn't respond. Your advance loan
                                  will be deducted automatically.
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="success-gradient text-white"
                                onClick={() => handleRequestRelease(contract.id)}
                              >
                                <RefreshCw className="mr-2 h-3 w-3" />
                                Request Immediate Release
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="mr-2 h-3 w-3" />
                                View Submission
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                    {escrowContracts.filter((c) => c.status === "pending_release").length === 0 && (
                      <div className="text-center py-12">
                        <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">No pending releases at the moment</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History */}
            <TabsContent value="history" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    Escrow History
                  </CardTitle>
                  <CardDescription>Completed escrow transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {escrowContracts
                      .filter((contract) => contract.status === "released")
                      .map((contract) => (
                        <Card
                          key={contract.id}
                          className="border-accent/30 bg-accent/5 hover:border-accent/50 transition-all"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">{contract.gigTitle}</h3>
                                  {getStatusBadge(contract.status)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Released: {contract.releaseDate}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-3">
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Amount Released</div>
                                <div className="font-semibold text-accent">
                                  ${contract.amount - contract.advanceDeducted}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Advance Repaid</div>
                                <div className="font-semibold">
                                  {contract.advanceDeducted > 0 ? `$${contract.advanceDeducted}` : "N/A"}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Client</div>
                                <div className="font-semibold text-sm">{contract.client}</div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="mr-2 h-3 w-3" />
                                View Transaction
                              </Button>
                              <Button size="sm" variant="outline">
                                <FileText className="mr-2 h-3 w-3" />
                                Download Receipt
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
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
                <h3 className="font-semibold mb-2">Escrow Protection Benefits</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ Payments locked in audited smart contracts on Base blockchain</li>
                  <li>✓ Automatic advance loan deduction upon release</li>
                  <li>✓ Dispute resolution system with impartial arbitration</li>
                  <li>✓ Auto-release after 48h if client doesn't respond</li>
                  <li>✓ Full transaction history and receipts on-chain</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}