"use client";

import { useState } from "react";
import {
  DollarSign,
  Zap,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Wallet,
  Shield,
  FileText,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { toast } from "sonner";

interface FinancingStats {
  availableCredit: number;
  totalAdvanced: number;
  pendingRepayment: number;
  creditUtilization: number;
}

interface AdvanceRequest {
  id: string;
  gigTitle: string;
  requestedAmount: number;
  collateralType: string;
  status: "approved" | "pending" | "rejected" | "active";
  interestRate: number;
  repaymentDate: string;
  amountPaid: number;
}

export default function FinancingPage() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [selectedGig, setSelectedGig] = useState("");
  const [collateralType, setCollateralType] = useState("");

  const stats: FinancingStats = {
    availableCredit: 3400,
    totalAdvanced: 5200,
    pendingRepayment: 1800,
    creditUtilization: 68,
  };

  const advanceRequests: AdvanceRequest[] = [
    {
      id: "1",
      gigTitle: "E-commerce Dashboard Development",
      requestedAmount: 1000,
      collateralType: "Escrow Guarantee",
      status: "active",
      interestRate: 5,
      repaymentDate: "Jan 15, 2025",
      amountPaid: 300,
    },
    {
      id: "2",
      gigTitle: "Mobile App UI/UX Design",
      requestedAmount: 600,
      collateralType: "Peer Endorsement",
      status: "pending",
      interestRate: 4,
      repaymentDate: "Jan 20, 2025",
      amountPaid: 0,
    },
    {
      id: "3",
      gigTitle: "Logo & Brand Identity",
      requestedAmount: 400,
      collateralType: "Reputation Stake",
      status: "approved",
      interestRate: 6,
      repaymentDate: "Jan 10, 2025",
      amountPaid: 0,
    },
  ];

  const handleRequestAdvance = () => {
    if (!advanceAmount || !selectedGig || !collateralType) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success(`Advance request of $${advanceAmount} submitted successfully!`);
    setShowRequestModal(false);
    setAdvanceAmount("");
    setSelectedGig("");
    setCollateralType("");
  };

  const handleRepay = (requestId: string) => {
    toast.success("Payment initiated! Funds will be deducted from escrow.");
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
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen dark">
      <Header />
      <Sidebar />

      <main className="ml-64 mt-16 py-8 pl-8 pr-16">
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-8 w-8 text-primary" />
                  <h1 className="text-4xl font-bold">Advance Financing</h1>
                </div>
                <p className="text-muted-foreground">
                  Access working capital before completing your gigs
                </p>
              </div>
              <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
                <DialogTrigger asChild>
                  <Button className="crypto-gradient text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Request Advance
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Request Working Capital Advance</DialogTitle>
                    <DialogDescription>
                      Get financing to start your project with flexible collateral options
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Active Gig</Label>
                      <Select value={selectedGig} onValueChange={setSelectedGig}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a gig project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gig1">E-commerce Website Development - $2,500</SelectItem>
                          <SelectItem value="gig2">Mobile App Design - $1,200</SelectItem>
                          <SelectItem value="gig3">Logo Redesign - $800</SelectItem>
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
                      <p className="text-xs text-muted-foreground">
                        Maximum: 40% of gig value
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Collateral Option</Label>
                      <Select value={collateralType} onValueChange={setCollateralType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose collateral type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="escrow">
                            Escrow Guarantee (0% interest - requires client deposit)
                          </SelectItem>
                          <SelectItem value="endorsement">
                            Peer Endorsement (4% interest - requires peer stake)
                          </SelectItem>
                          <SelectItem value="reputation">
                            Reputation Stake (6% interest - uses your reputation score)
                          </SelectItem>
                          <SelectItem value="mixed">
                            Mixed Collateral (3% interest - combination)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-accent mt-0.5" />
                        <div>
                          <div className="font-semibold text-sm mb-1">Automatic Repayment</div>
                          <div className="text-xs text-muted-foreground">
                            Advance + interest will be automatically deducted from escrow payment when
                            the gig is completed and approved by the client.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-card border border-border">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Estimated Interest</div>
                        <div className="font-semibold">$24</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Total Repayment</div>
                        <div className="font-semibold text-primary">$624</div>
                      </div>
                    </div>

                    <Button
                      className="w-full crypto-gradient text-white"
                      onClick={handleRequestAdvance}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Submit Advance Request
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
              <p className="text-2xl font-bold">${stats.availableCredit.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Available Credit</p>
            </Card>

            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <p className="text-2xl font-bold text-accent">${stats.totalAdvanced.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Advanced</p>
            </Card>

            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-yellow-500">${stats.pendingRepayment.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Pending Repayment</p>
            </Card>

            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{stats.creditUtilization}%</p>
              <p className="text-sm text-muted-foreground">Credit Utilization</p>
            </Card>
          </div>

          {/* Credit Progress */}
          <Card className="p-6 glass-effect border-primary/30 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Credit Limit Status</h3>
                <p className="text-sm text-muted-foreground">Using ${stats.pendingRepayment} of $5,000 limit</p>
              </div>
              <Badge variant="outline" className="border-primary/50">
                {100 - stats.creditUtilization}% Available
              </Badge>
            </div>
            <Progress value={stats.creditUtilization} className="h-3" />
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            {/* Active Advances */}
            <TabsContent value="active" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Active Advances
                  </CardTitle>
                  <CardDescription>Your current working capital loans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {advanceRequests
                      .filter((req) => req.status === "active")
                      .map((request) => (
                        <Card
                          key={request.id}
                          className="border-border bg-card/50 hover:border-primary/30 transition-all"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">{request.gigTitle}</h3>
                                <div className="text-sm text-muted-foreground">
                                  Due: {request.repaymentDate}
                                </div>
                              </div>
                              {getStatusBadge(request.status)}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Advanced Amount</div>
                                <div className="font-semibold">${request.requestedAmount}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Interest Rate</div>
                                <div className="font-semibold text-accent">{request.interestRate}%</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Collateral</div>
                                <Badge variant="outline" className="text-xs">
                                  {request.collateralType}
                                </Badge>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Amount Paid</div>
                                <div className="font-semibold">${request.amountPaid}</div>
                              </div>
                            </div>

                            <div className="space-y-2 mb-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Repayment Progress</span>
                                <span className="font-medium">
                                  {Math.round((request.amountPaid / request.requestedAmount) * 100)}%
                                </span>
                              </div>
                              <Progress
                                value={(request.amountPaid / request.requestedAmount) * 100}
                                className="h-2"
                              />
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="success-gradient text-white"
                                onClick={() => handleRepay(request.id)}
                              >
                                <DollarSign className="mr-2 h-3 w-3" />
                                Make Payment
                              </Button>
                              <Button size="sm" variant="outline">
                                <FileText className="mr-2 h-3 w-3" />
                                View Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pending Requests */}
            <TabsContent value="pending" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    Pending Requests
                  </CardTitle>
                  <CardDescription>Advances awaiting approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {advanceRequests
                      .filter((req) => req.status === "pending" || req.status === "approved")
                      .map((request) => (
                        <Card
                          key={request.id}
                          className="border-border bg-card/50 hover:border-yellow-500/30 transition-all"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">{request.gigTitle}</h3>
                                <div className="text-sm text-muted-foreground">
                                  Requested on Jan 5, 2025
                                </div>
                              </div>
                              {getStatusBadge(request.status)}
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-3">
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Amount</div>
                                <div className="font-semibold">${request.requestedAmount}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Interest</div>
                                <div className="font-semibold">{request.interestRate}%</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Collateral</div>
                                <Badge variant="outline" className="text-xs">
                                  {request.collateralType}
                                </Badge>
                              </div>
                            </div>

                            {request.status === "pending" && (
                              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm text-muted-foreground">
                                  Waiting for collateral verification...
                                </span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History */}
            <TabsContent value="history" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Financing History
                  </CardTitle>
                  <CardDescription>Your complete advance financing records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No completed financing history yet</p>
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
                <h3 className="font-semibold mb-2">How Advance Financing Works</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Request up to 40% of your gig value as working capital</li>
                  <li>• Choose from multiple collateral options based on your situation</li>
                  <li>• Repayment is automatically deducted from escrow when gig completes</li>
                  <li>• Build credit history to access larger advances with better rates</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}