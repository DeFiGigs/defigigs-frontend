"use client";

import { useState } from "react";
import {
  RefreshCw,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingDown,
  Calendar,
  Wallet,
  FileText,
  CreditCard,
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
import { toast } from "sonner";

interface RepaymentStats {
  totalDue: number;
  overdue: number;
  upcomingPayments: number;
  totalRepaid: number;
}

interface Loan {
  id: string;
  gigTitle: string;
  principalAmount: number;
  interestRate: number;
  totalOwed: number;
  amountPaid: number;
  status: "active" | "overdue" | "paid" | "pending";
  dueDate: string;
  paymentMethod: "auto" | "manual";
  nextPayment: number;
}

export default function RepaymentPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const stats: RepaymentStats = {
    totalDue: 1800,
    overdue: 0,
    upcomingPayments: 3,
    totalRepaid: 3400,
  };

  const loans: Loan[] = [
    {
      id: "LOAN-001",
      gigTitle: "E-commerce Dashboard Development",
      principalAmount: 1000,
      interestRate: 5,
      totalOwed: 1050,
      amountPaid: 300,
      status: "active",
      dueDate: "Jan 15, 2025",
      paymentMethod: "auto",
      nextPayment: 750,
    },
    {
      id: "LOAN-002",
      gigTitle: "Mobile App UI/UX Design",
      principalAmount: 600,
      interestRate: 4,
      totalOwed: 624,
      amountPaid: 0,
      status: "active",
      dueDate: "Jan 20, 2025",
      paymentMethod: "auto",
      nextPayment: 624,
    },
    {
      id: "LOAN-003",
      gigTitle: "Logo & Brand Identity",
      principalAmount: 400,
      interestRate: 6,
      totalOwed: 424,
      amountPaid: 0,
      status: "active",
      dueDate: "Jan 10, 2025",
      paymentMethod: "manual",
      nextPayment: 424,
    },
    {
      id: "LOAN-004",
      gigTitle: "Smart Contract Audit",
      principalAmount: 800,
      interestRate: 0,
      totalOwed: 800,
      amountPaid: 800,
      status: "paid",
      dueDate: "Dec 5, 2024",
      paymentMethod: "auto",
      nextPayment: 0,
    },
  ];

  const handleMakePayment = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast.error("Please enter a valid payment amount");
      return;
    }
    toast.success(`Payment of $${paymentAmount} processed successfully!`);
    setShowPaymentModal(false);
    setPaymentAmount("");
    setSelectedLoan(null);
  };

  const handleSetupAutoRepay = (loanId: string) => {
    toast.success("Auto-repayment enabled! Payment will be deducted from escrow.");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary text-white">Active</Badge>;
      case "overdue":
        return <Badge className="bg-destructive text-white">Overdue</Badge>;
      case "paid":
        return <Badge className="bg-accent text-white">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
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
              <RefreshCw className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Repayment Management</h1>
            </div>
            <p className="text-muted-foreground">
              Track and manage your advance loan repayments
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-yellow-500">${stats.totalDue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Due</p>
            </Card>

            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-2xl font-bold text-destructive">${stats.overdue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Overdue</p>
            </Card>

            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{stats.upcomingPayments}</p>
              <p className="text-sm text-muted-foreground">Upcoming Payments</p>
            </Card>

            <Card className="p-6 glass-effect border-border/40">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="h-5 w-5 text-accent" />
              </div>
              <p className="text-2xl font-bold text-accent">${stats.totalRepaid.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Repaid</p>
            </Card>
          </div>

          {/* Payment Options */}
          <Card className="glass-effect border-primary/30 mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-primary" />
                Automatic Repayment Options
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-primary/30 bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">Escrow Auto-Deduct</div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Automatically deduct repayment from escrow when gig payment is released
                        </p>
                        <Badge className="bg-accent text-white">Recommended</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">Manual Payment</div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Make payments manually from your wallet before due date
                        </p>
                        <Badge variant="outline">Available</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="active">Active Loans</TabsTrigger>
              <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            {/* Active Loans */}
            <TabsContent value="active" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Active Loans
                  </CardTitle>
                  <CardDescription>Your current repayment obligations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loans
                      .filter((loan) => loan.status === "active" || loan.status === "overdue")
                      .map((loan) => (
                        <Card
                          key={loan.id}
                          className="border-border bg-card/50 hover:border-primary/30 transition-all"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">{loan.gigTitle}</h3>
                                  {getStatusBadge(loan.status)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Loan ID: {loan.id} • Due: {loan.dueDate}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Principal</div>
                                <div className="font-semibold">${loan.principalAmount}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Interest Rate</div>
                                <div className="font-semibold">{loan.interestRate}%</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Total Owed</div>
                                <div className="font-semibold text-yellow-500">${loan.totalOwed}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Paid</div>
                                <div className="font-semibold text-accent">${loan.amountPaid}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Remaining</div>
                                <div className="font-semibold">${loan.totalOwed - loan.amountPaid}</div>
                              </div>
                            </div>

                            <div className="space-y-2 mb-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Repayment Progress</span>
                                <span className="font-medium">
                                  {Math.round((loan.amountPaid / loan.totalOwed) * 100)}%
                                </span>
                              </div>
                              <Progress
                                value={(loan.amountPaid / loan.totalOwed) * 100}
                                className="h-2"
                              />
                            </div>

                            <div className="p-3 rounded-lg bg-muted/50 mb-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {loan.paymentMethod === "auto" ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-accent" />
                                    <span className="text-sm text-muted-foreground">
                                      Auto-deduct from escrow enabled
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm text-muted-foreground">
                                      Manual payment required
                                    </span>
                                  </>
                                )}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                Next: ${loan.nextPayment}
                              </Badge>
                            </div>

                            <div className="flex gap-2">
                              {loan.paymentMethod === "manual" && (
                                <>
                                  <Dialog
                                    open={showPaymentModal && selectedLoan?.id === loan.id}
                                    onOpenChange={(open) => {
                                      setShowPaymentModal(open);
                                      if (!open) setSelectedLoan(null);
                                    }}
                                  >
                                    <DialogTrigger asChild>
                                      <Button
                                        size="sm"
                                        className="success-gradient text-white"
                                        onClick={() => setSelectedLoan(loan)}
                                      >
                                        <DollarSign className="mr-2 h-3 w-3" />
                                        Make Payment
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Make Loan Payment</DialogTitle>
                                        <DialogDescription>
                                          Process repayment for {loan.gigTitle}
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <div className="p-4 rounded-lg bg-card border border-border">
                                          <div className="space-y-2">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Loan ID</span>
                                              <span className="font-semibold">{loan.id}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Total Owed</span>
                                              <span className="font-semibold">${loan.totalOwed}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Already Paid</span>
                                              <span className="font-semibold text-accent">
                                                ${loan.amountPaid}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Remaining</span>
                                              <span className="font-semibold text-yellow-500">
                                                ${loan.totalOwed - loan.amountPaid}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="space-y-2">
                                          <Label>Payment Amount (USD)</Label>
                                          <Input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={paymentAmount}
                                            onChange={(e) => setPaymentAmount(e.target.value)}
                                          />
                                          <div className="flex gap-2">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() =>
                                                setPaymentAmount(
                                                  ((loan.totalOwed - loan.amountPaid) / 2).toString()
                                                )
                                              }
                                            >
                                              50%
                                            </Button>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() =>
                                                setPaymentAmount(
                                                  (loan.totalOwed - loan.amountPaid).toString()
                                                )
                                              }
                                            >
                                              Pay in Full
                                            </Button>
                                          </div>
                                        </div>

                                        <Button
                                          className="w-full crypto-gradient text-white"
                                          onClick={handleMakePayment}
                                        >
                                          Process Payment
                                        </Button>
                                      </div>
                                    </DialogContent>
                                  </Dialog>

                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-primary/50"
                                    onClick={() => handleSetupAutoRepay(loan.id)}
                                  >
                                    <RefreshCw className="mr-2 h-3 w-3" />
                                    Enable Auto-Repay
                                  </Button>
                                </>
                              )}
                              <Button size="sm" variant="outline">
                                <FileText className="mr-2 h-3 w-3" />
                                View Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                    {loans.filter((l) => l.status === "active" || l.status === "overdue").length ===
                      0 && (
                      <div className="text-center py-12">
                        <CheckCircle className="w-12 h-12 text-accent mx-auto mb-3" />
                        <p className="text-muted-foreground">No active loans to repay</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Schedule */}
            <TabsContent value="schedule" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Payment Schedule
                  </CardTitle>
                  <CardDescription>Upcoming payment due dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {loans
                      .filter((loan) => loan.status === "active")
                      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                      .map((loan) => (
                        <Card
                          key={loan.id}
                          className="border-border bg-card/50 hover:border-primary/30 transition-all"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg crypto-gradient flex items-center justify-center">
                                  <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <div className="font-semibold">{loan.gigTitle}</div>
                                  <div className="text-sm text-muted-foreground">
                                    Due: {loan.dueDate}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-yellow-500">
                                  ${loan.nextPayment}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {loan.paymentMethod === "auto" ? "Auto-deduct" : "Manual"}
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

            {/* History */}
            <TabsContent value="history" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    Repayment History
                  </CardTitle>
                  <CardDescription>Completed loan repayments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loans
                      .filter((loan) => loan.status === "paid")
                      .map((loan) => (
                        <Card
                          key={loan.id}
                          className="border-accent/30 bg-accent/5 hover:border-accent/50 transition-all"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">{loan.gigTitle}</h3>
                                  {getStatusBadge(loan.status)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Paid on {loan.dueDate}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-3">
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Principal</div>
                                <div className="font-semibold">${loan.principalAmount}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Interest Paid</div>
                                <div className="font-semibold">
                                  ${loan.totalOwed - loan.principalAmount}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Total Repaid</div>
                                <div className="font-semibold text-accent">${loan.totalOwed}</div>
                              </div>
                            </div>

                            <Button size="sm" variant="outline">
                              <FileText className="mr-2 h-3 w-3" />
                              Download Receipt
                            </Button>
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
                <TrendingDown className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Improve Your Repayment Score</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ Enable auto-repayment from escrow for hassle-free payments</li>
                  <li>✓ Pay on time to build better credit score and access lower rates</li>
                  <li>✓ Early repayment can reduce total interest charges</li>
                  <li>✓ Good repayment history unlocks higher advance limits</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}