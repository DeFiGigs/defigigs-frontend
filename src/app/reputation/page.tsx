"use client";

import { useState } from "react";
import {
  Star,
  Award,
  TrendingUp,
  BadgeCheck,
  Users,
  Briefcase,
  Clock,
  CheckCircle,
  Shield,
  Trophy,
  Zap,
  Target,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

interface ReputationStats {
  overallScore: number;
  totalGigs: number;
  averageRating: number;
  onTimeDelivery: number;
}

interface Review {
  id: string;
  clientName: string;
  gigTitle: string;
  rating: number;
  comment: string;
  date: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  earned: boolean;
  progress?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  achieved: boolean;
}

export default function ReputationPage() {
  const stats: ReputationStats = {
    overallScore: 92,
    totalGigs: 47,
    averageRating: 4.8,
    onTimeDelivery: 98,
  };

  const reviews: Review[] = [
    {
      id: "1",
      clientName: "CryptoVentures",
      gigTitle: "E-commerce Dashboard Development",
      rating: 5,
      comment:
        "Outstanding work! Delivered ahead of schedule with excellent quality. Will hire again.",
      date: "Jan 2, 2025",
    },
    {
      id: "2",
      clientName: "NFTMarket",
      gigTitle: "Mobile App UI/UX Design",
      rating: 5,
      comment:
        "Very professional and responsive. The designs exceeded our expectations.",
      date: "Dec 28, 2024",
    },
    {
      id: "3",
      clientName: "DAOventures",
      gigTitle: "Logo & Brand Identity",
      rating: 4,
      comment: "Good work overall. Minor revisions needed but delivered well.",
      date: "Dec 20, 2024",
    },
    {
      id: "4",
      clientName: "BlockChainCo",
      gigTitle: "Smart Contract Audit",
      rating: 5,
      comment: "Thorough audit with detailed documentation. Highly recommend!",
      date: "Dec 15, 2024",
    },
  ];

  const nftBadges: Badge[] = [
    {
      id: "1",
      name: "Top Rated Worker",
      description: "Maintained 4.8+ rating for 6 months",
      rarity: "legendary",
      earned: true,
    },
    {
      id: "2",
      name: "Fast Delivery Master",
      description: "Completed 30+ gigs ahead of schedule",
      rarity: "epic",
      earned: true,
    },
    {
      id: "3",
      name: "Verified Developer",
      description: "Passed technical verification",
      rarity: "rare",
      earned: true,
    },
    {
      id: "4",
      name: "Rising Star",
      description: "Complete 10 gigs successfully",
      rarity: "common",
      earned: true,
    },
    {
      id: "5",
      name: "Perfectionist",
      description: "Get 10 five-star reviews",
      rarity: "epic",
      earned: false,
      progress: 8,
    },
    {
      id: "6",
      name: "Community Champion",
      description: "Endorse 5 other workers",
      rarity: "rare",
      earned: false,
      progress: 3,
    },
  ];

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Gig Completed",
      description: "Successfully completed your first gig",
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500",
      achieved: true,
    },
    {
      id: "2",
      title: "On-Time Legend",
      description: "98% on-time delivery rate",
      icon: Clock,
      color: "from-green-500 to-teal-500",
      achieved: true,
    },
    {
      id: "3",
      title: "Client Favorite",
      description: "Received 5-star rating from 10+ clients",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
      achieved: true,
    },
    {
      id: "4",
      title: "Trusted Expert",
      description: "Reputation score above 90",
      icon: Shield,
      color: "from-purple-500 to-pink-500",
      achieved: true,
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 via-orange-500 to-red-500";
      case "epic":
        return "from-purple-500 to-pink-500";
      case "rare":
        return "from-blue-500 to-cyan-500";
      case "common":
        return "from-gray-500 to-gray-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getRarityBadge = (rarity: string) => {
    const colors = {
      legendary: "bg-gradient-to-r from-yellow-400 to-red-500 text-white",
      epic: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      rare: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      common: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
    };
    return colors[rarity as keyof typeof colors];
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
              <Award className="h-8 w-8 text-yellow-500" />
              <h1 className="text-4xl font-bold">Reputation & Achievements</h1>
            </div>
            <p className="text-muted-foreground">
              Your on-chain reputation, reviews, and NFT badges
            </p>
          </div>

          {/* Reputation Score Card */}
          <Card className="glass-effect border-primary/30 mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 rounded-full crypto-gradient p-1">
                    <div className="w-full h-full rounded-full bg-background flex flex-col items-center justify-center">
                      <div className="text-5xl font-bold">
                        {stats.overallScore}
                      </div>
                      <div className="text-sm text-muted-foreground">Score</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Total Gigs
                        </span>
                      </div>
                      <div className="text-3xl font-bold">
                        {stats.totalGigs}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-muted-foreground">
                          Average Rating
                        </span>
                      </div>
                      <div className="text-3xl font-bold">
                        {stats.averageRating}/5.0
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-accent" />
                        <span className="text-sm text-muted-foreground">
                          On-Time Delivery
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-accent">
                        {stats.onTimeDelivery}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        Reputation Progress
                      </span>
                      <span className="font-medium">Next milestone: 95</span>
                    </div>
                    <Progress value={stats.overallScore} className="h-3" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="reviews" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="badges">NFT Badges</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Client Reviews
                  </CardTitle>
                  <CardDescription>
                    What clients say about your work
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card
                        key={review.id}
                        className="border-border bg-card/50 hover:border-primary/30 transition-all"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-12 h-12 border-2 border-primary/20">
                              <AvatarFallback className="bg-primary text-white">
                                {review.clientName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <div className="font-semibold">
                                    {review.clientName}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {review.gigTitle}
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {review.date}
                                </div>
                              </div>

                              <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "fill-yellow-500 text-yellow-500"
                                        : "text-muted"
                                    }`}
                                  />
                                ))}
                                <span className="ml-2 font-semibold">
                                  {review.rating}.0
                                </span>
                              </div>

                              <p className="text-sm text-muted-foreground">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* NFT Badges Tab */}
            <TabsContent value="badges" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    NFT Badges & Credentials
                  </CardTitle>
                  <CardDescription>
                    Your verifiable on-chain achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {nftBadges.map((badge) => (
                      <Card
                        key={badge.id}
                        className={`border-border ${
                          badge.earned
                            ? `bg-gradient-to-br ${getRarityColor(badge.rarity)}/10`
                            : "bg-card/50 opacity-60"
                        } hover:scale-105 transition-transform`}
                      >
                        <CardContent className="p-5 text-center">
                          <div
                            className={`w-20 h-20 mx-auto mb-3 rounded-full ${
                              badge.earned
                                ? `bg-gradient-to-br ${getRarityColor(badge.rarity)}`
                                : "bg-muted"
                            } flex items-center justify-center`}
                          >
                            {badge.earned ? (
                              <BadgeCheck className="w-10 h-10 text-white" />
                            ) : (
                              <Trophy className="w-10 h-10 text-muted-foreground" />
                            )}
                          </div>

                          <h3 className="font-semibold mb-1">{badge.name}</h3>
                          <p className="text-xs text-muted-foreground mb-3">
                            {badge.description}
                          </p>

                          <Badge className={getRarityBadge(badge.rarity)}>
                            {badge.rarity.charAt(0).toUpperCase() +
                              badge.rarity.slice(1)}
                          </Badge>

                          {!badge.earned && badge.progress !== undefined && (
                            <div className="mt-3">
                              <div className="text-xs text-muted-foreground mb-1">
                                Progress: {badge.progress}/10
                              </div>
                              <Progress
                                value={(badge.progress / 10) * 100}
                                className="h-1.5"
                              />
                            </div>
                          )}

                          {badge.earned && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full mt-3"
                            >
                              View on Explorer
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reputation SBT */}
              <Card className="glass-effect border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg crypto-gradient flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg mb-1">
                        Reputation SBT (Soulbound Token)
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Score: {stats.overallScore}/100 • Token ID:
                        #0x7f2a...9b3c
                      </div>
                      <Badge className="bg-primary text-white">
                        Non-Transferable
                      </Badge>
                    </div>
                    <Button variant="outline">View on Explorer</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Achievements Unlocked
                  </CardTitle>
                  <CardDescription>
                    Milestones you've reached on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <Card
                        key={achievement.id}
                        className={`border-border ${
                          achievement.achieved
                            ? `bg-gradient-to-br ${achievement.color}/10`
                            : "bg-card/50 opacity-60"
                        }`}
                      >
                        <CardContent className="p-5">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-14 h-14 rounded-lg ${
                                achievement.achieved
                                  ? `bg-gradient-to-br ${achievement.color}`
                                  : "bg-muted"
                              } flex items-center justify-center flex-shrink-0`}
                            >
                              <achievement.icon className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">
                                  {achievement.title}
                                </h3>
                                {achievement.achieved && (
                                  <CheckCircle className="w-4 h-4 text-accent" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Achievements */}
              <Card className="glass-effect border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Upcoming Achievements
                  </CardTitle>
                  <CardDescription>
                    Goals you're working towards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Century Club",
                        desc: "Complete 100 gigs",
                        progress: 47,
                      },
                      {
                        name: "5-Star Specialist",
                        desc: "Get 50 five-star reviews",
                        progress: 32,
                      },
                      {
                        name: "Speed Demon",
                        desc: "Complete 20 gigs early",
                        progress: 18,
                      },
                    ].map((goal, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-card/50 border border-border"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <div className="font-semibold">{goal.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {goal.desc}
                            </div>
                          </div>
                          <Badge variant="outline">{goal.progress}%</Badge>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
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
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Build Your Reputation</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                    ✓ Complete gigs on time to increase your reputation score
                  </li>
                  <li>
                    ✓ High ratings unlock better opportunities and higher
                    advance limits
                  </li>
                  <li>✓ Earn NFT badges that are verifiable on-chain</li>
                  <li>
                    ✓ Your reputation is stored as a non-transferable Soulbound
                    Token
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
