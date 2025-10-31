export const investorPoolSeed = [
  {
    id: "pool-1",
    name: "DeFi Gigs Growth Pool",
    description: "Main liquidity pool for financing DeFi gigs and projects",
    totalLiquidity: "500000.00",
    availableLiquidity: "350000.00",
    totalInvestors: 45,
    apy: "8.5",
    minimumDeposit: "1000.00",
    lockPeriod: 30, // days
    status: "active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-10-30"),
  },
  {
    id: "pool-2",
    name: "High Risk High Reward Pool",
    description: "Pool for high-risk, high-reward early-stage projects",
    totalLiquidity: "150000.00",
    availableLiquidity: "75000.00",
    totalInvestors: 18,
    apy: "15.0",
    minimumDeposit: "5000.00",
    lockPeriod: 60, // days
    status: "active",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-10-28"),
  },
  {
    id: "pool-3",
    name: "Stable Returns Pool",
    description: "Conservative pool focusing on low-risk, steady returns",
    totalLiquidity: "800000.00",
    availableLiquidity: "600000.00",
    totalInvestors: 120,
    apy: "5.5",
    minimumDeposit: "500.00",
    lockPeriod: 14, // days
    status: "active",
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2024-10-30"),
  },
];
