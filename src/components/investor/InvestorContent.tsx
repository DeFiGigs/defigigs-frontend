"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  DollarSign,
  PieChart,
  ArrowUpRight,
  Wallet,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { toast } from "sonner";

interface InvestorStats {
  totalInvested: number;
  activeInvestments: number;
  totalReturns: number;
  avgROI: number;
  portfolioValue: number;
}

interface Investment {
  id: number;
  gigTitle: string;
  amount: number;
  expectedReturn: number;
  status: string;
  dueDate: string;
}

export default function InvestorContent() {
  const router = useRouter();
  const [stats, setStats] = useState<InvestorStats>({
    totalInvested: 0,
    activeInvestments: 0,
    totalReturns: 0,
    avgROI: 0,
    portfolioValue: 0,
  });
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInvestorData();
  }, []);

  const fetchInvestorData = async () => {
    try {
      // TODO: Replace with actual API call
      setStats({
        totalInvested: 50000,
        activeInvestments: 12,
        totalReturns: 8500,
        avgROI: 17,
        portfolioValue: 58500,
      });

      setInvestments([
        {
          id: 1,
          gigTitle: "Smart Contract Development",
          amount: 5000,
          expectedReturn: 6500,
          status: "active",
          dueDate: "2025-12-15",
        },
      ]);
    } catch (error) {
      console.error("Error fetching investor data:", error);
      toast.error("Failed to load investor data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Investor Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your investments and track returns
            </p>
          </div>
          <Button onClick={() => router.push("/marketplace")}>
            <TrendingUp className="w-4 h-4 mr-2" />
            Browse Opportunities
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Invested
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalInvested.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Across {stats.activeInvestments} investments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Returns
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalReturns.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +{stats.avgROI}% Average ROI
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Portfolio Value
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.portfolioValue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Total portfolio worth
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Investments
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.activeInvestments}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently funding gigs
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="investments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="investments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Investments</CardTitle>
                <CardDescription>
                  Track your current investment portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : investments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No active investments yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    {investments.map((investment) => (
                      <div
                        key={investment.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{investment.gigTitle}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            Due: {investment.dueDate}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-medium">
                            ${investment.amount.toLocaleString()}
                          </p>
                          <Badge
                            variant={
                              investment.status === "active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {investment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment Opportunities</CardTitle>
                <CardDescription>
                  Browse available gigs seeking funding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <PieChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Browse marketplace for investment opportunities</p>
                  <Button
                    className="mt-4"
                    onClick={() => router.push("/marketplace")}
                  >
                    View Opportunities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="returns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Returns Overview</CardTitle>
                <CardDescription>
                  Track your investment returns and ROI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average ROI</span>
                    <span className="text-2xl font-bold text-green-500">
                      +{stats.avgROI}%
                    </span>
                  </div>
                  <Progress value={stats.avgROI} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
