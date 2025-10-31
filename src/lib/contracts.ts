/**
 * Smart Contract Configuration
 * Update these addresses after deploying to Base Sepolia
 */

export const CONTRACTS = {
  // Mock Tokens (for testing)
  MockUSDC: "0x0000000000000000000000000000000000000000", // Update after deployment
  MockDAI: "0x0000000000000000000000000000000000000000",  // Update after deployment

  // Core Contracts
  GigEscrow: "0x0000000000000000000000000000000000000000",        // Update after deployment
  GigFinancing: "0x0000000000000000000000000000000000000000",     // Update after deployment
  CollateralManager: "0x0000000000000000000000000000000000000000", // Update after deployment
  ReputationSystem: "0x0000000000000000000000000000000000000000",  // Update after deployment

  // Helper Contracts
  GigFactory: "0x0000000000000000000000000000000000000000",        // Update after deployment
} as const;

// Gig Status Enum
export enum GigStatus {
  Draft = 0,
  Open = 1,
  Assigned = 2,
  InProgress = 3,
  Completed = 4,
  Cancelled = 5,
  Disputed = 6,
}

// Milestone Status Enum
export enum MilestoneStatus {
  Pending = 0,
  Submitted = 1,
  Approved = 2,
  Rejected = 3,
  Released = 4,
  Withdrawn = 5,
}

// Financing Status Enum
export enum FinancingStatus {
  Pending = 0,
  Approved = 1,
  Disbursed = 2,
  Repaying = 3,
  Repaid = 4,
  Defaulted = 5,
  Rejected = 6,
}

// Collateral Status Enum
export enum CollateralStatus {
  Active = 0,
  PartiallyLocked = 1,
  FullyLocked = 2,
  Released = 3,
  Liquidated = 4,
}

// Type definitions
export type Address = `0x${string}`;

export interface Gig {
  id: bigint;
  employer: Address;
  worker: Address;
  totalAmount: bigint;
  lockedAmount: bigint;
  releasedAmount: bigint;
  withdrawnAmount: bigint;
  paymentToken: Address;
  status: GigStatus;
  createdAt: bigint;
  deadline: bigint;
}

export interface Milestone {
  id: bigint;
  gigId: bigint;
  title: string;
  description: string;
  amount: bigint;
  paymentPercentage: bigint;
  status: MilestoneStatus;
  submissionUrl: string;
  submittedAt: bigint;
  approvedAt: bigint;
}

export interface UserProfile {
  userAddress: Address;
  totalGigsCompleted: bigint;
  totalGigsCancelled: bigint;
  totalEarnings: bigint;
  totalSpent: bigint;
  reputationScore: bigint;
  totalRatings: bigint;
  sumRatings: bigint;
  createdAt: bigint;
  lastUpdated: bigint;
  isActive: boolean;
}

export interface FinancingRequest {
  id: bigint;
  borrower: Address;
  gigId: bigint;
  requestedAmount: bigint;
  approvedAmount: bigint;
  interestRate: bigint;
  duration: bigint;
  collateralId: bigint;
  collateralLockId: bigint;
  status: FinancingStatus;
  createdAt: bigint;
  approvedAt: bigint;
  disbursedAt: bigint;
  dueDate: bigint;
  totalRepaid: bigint;
  totalDue: bigint;
}

export interface CollateralDeposit {
  id: bigint;
  owner: Address;
  token: Address;
  amount: bigint;
  lockedAmount: bigint;
  availableAmount: bigint;
  status: CollateralStatus;
  depositedAt: bigint;
  lastUpdated: bigint;
}

// Gig Templates (from GigFactory)
export const GIG_TEMPLATES = [
  {
    id: 0,
    name: "Website Development",
    amount: "5000",
    durationDays: 30,
    description: "Full-stack website development with responsive design",
    category: "Web Development",
    milestones: 3,
  },
  {
    id: 1,
    name: "Smart Contract Audit",
    amount: "8000",
    durationDays: 14,
    description: "Comprehensive security audit of smart contracts",
    category: "Blockchain",
    milestones: 2,
  },
  {
    id: 2,
    name: "Mobile App Development",
    amount: "12000",
    durationDays: 60,
    description: "Native mobile app for iOS and Android",
    category: "Mobile Development",
    milestones: 4,
  },
  {
    id: 3,
    name: "Logo Design",
    amount: "500",
    durationDays: 7,
    description: "Professional logo design with brand guidelines",
    category: "Design",
    milestones: 2,
  },
  {
    id: 4,
    name: "Content Writing (10 Articles)",
    amount: "1500",
    durationDays: 21,
    description: "10 high-quality SEO-optimized articles",
    category: "Content Writing",
    milestones: 3,
  },
] as const;

// Helper function to get status label
export function getGigStatusLabel(status: GigStatus): string {
  const labels: Record<GigStatus, string> = {
    [GigStatus.Draft]: "Draft",
    [GigStatus.Open]: "Open",
    [GigStatus.Assigned]: "Assigned",
    [GigStatus.InProgress]: "In Progress",
    [GigStatus.Completed]: "Completed",
    [GigStatus.Cancelled]: "Cancelled",
    [GigStatus.Disputed]: "Disputed",
  };
  return labels[status] || "Unknown";
}

// Helper function to get milestone status label
export function getMilestoneStatusLabel(status: MilestoneStatus): string {
  const labels: Record<MilestoneStatus, string> = {
    [MilestoneStatus.Pending]: "Pending",
    [MilestoneStatus.Submitted]: "Submitted",
    [MilestoneStatus.Approved]: "Approved",
    [MilestoneStatus.Rejected]: "Rejected",
    [MilestoneStatus.Released]: "Released",
    [MilestoneStatus.Withdrawn]: "Withdrawn",
  };
  return labels[status] || "Unknown";
}

// Helper function to get financing status label
export function getFinancingStatusLabel(status: FinancingStatus): string {
  const labels: Record<FinancingStatus, string> = {
    [FinancingStatus.Pending]: "Pending",
    [FinancingStatus.Approved]: "Approved",
    [FinancingStatus.Disbursed]: "Disbursed",
    [FinancingStatus.Repaying]: "Repaying",
    [FinancingStatus.Repaid]: "Fully Repaid",
    [FinancingStatus.Defaulted]: "Defaulted",
    [FinancingStatus.Rejected]: "Rejected",
  };
  return labels[status] || "Unknown";
}

// Helper to format token amount
export function formatTokenAmount(amount: bigint, decimals: number = 6): string {
  const divisor = BigInt(10 ** decimals);
  const whole = amount / divisor;
  const fraction = amount % divisor;

  if (fraction === BigInt(0)) {
    return whole.toString();
  }

  const fractionStr = fraction.toString().padStart(decimals, '0').replace(/0+$/, '');
  return `${whole}.${fractionStr}`;
}

// Helper to parse token amount
export function parseTokenAmount(amount: string, decimals: number = 6): bigint {
  const [whole, fraction = ''] = amount.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(whole) * BigInt(10 ** decimals) + BigInt(paddedFraction);
}
