import { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { CONTRACTS, GIG_TEMPLATES, GigStatus, formatTokenAmount, type Address } from '@/lib/contracts';
import { GigEscrowABI } from '@/lib/abis';
import { useTotalGigs } from './useContracts';

export interface DisplayGig {
  id: number;
  title: string;
  description: string;
  budget: string;
  category: string;
  skills: string[];
  employer: string;
  employerAddress?: Address;
  rating: number;
  verified: boolean;
  status?: string;
  deadline?: Date;
  paymentToken?: Address;
  onChain?: boolean;
}

// Dummy gigs for when contracts aren't deployed or as fallback
const DUMMY_GIGS: DisplayGig[] = [
  {
    id: 1,
    title: "Smart Contract Security Audit",
    description: "Need experienced auditor for DeFi protocol review with comprehensive testing",
    budget: "$5,000 - $8,000",
    category: "Security",
    skills: ["Solidity", "Security", "DeFi"],
    employer: "CryptoVault Labs",
    rating: 4.9,
    verified: true,
    onChain: false,
  },
  {
    id: 2,
    title: "NFT Marketplace Frontend Development",
    description: "Build responsive UI for NFT trading platform with Web3 integration",
    budget: "$3,000 - $5,000",
    category: "Development",
    skills: ["React", "Web3.js", "TypeScript"],
    employer: "NFT Innovations",
    rating: 4.8,
    verified: true,
    onChain: false,
  },
  {
    id: 3,
    title: "Whitepaper Content Writing",
    description: "Technical whitepaper for new blockchain project with detailed tokenomics",
    budget: "$2,000 - $3,000",
    category: "Content",
    skills: ["Technical Writing", "Blockchain", "Research"],
    employer: "ChainTech Solutions",
    rating: 5.0,
    verified: true,
    onChain: false,
  },
  {
    id: 4,
    title: "DeFi Protocol UI/UX Design",
    description: "Design modern and intuitive interface for lending/borrowing platform",
    budget: "$4,000 - $6,000",
    category: "Design",
    skills: ["UI/UX", "Figma", "Web3"],
    employer: "DeFi Protocol Inc",
    rating: 4.9,
    verified: true,
    onChain: false,
  },
  {
    id: 5,
    title: "Token Smart Contract Development",
    description: "Create ERC-20 token with custom features and anti-bot mechanisms",
    budget: "$3,500 - $5,500",
    category: "Development",
    skills: ["Solidity", "Smart Contracts", "Testing"],
    employer: "Token Labs",
    rating: 4.7,
    verified: true,
    onChain: false,
  },
];

// Helper to check if contracts are deployed
function isContractsDeployed(): boolean {
  return CONTRACTS.GigEscrow !== "0x0000000000000000000000000000000000000000";
}

// Hook to fetch gigs from blockchain
export function useGigs() {
  const [gigs, setGigs] = useState<DisplayGig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { totalGigs } = useTotalGigs();

  useEffect(() => {
    async function loadGigs() {
      // If contracts not deployed, use dummy data
      if (!isContractsDeployed()) {
        setGigs(DUMMY_GIGS);
        setIsLoading(false);
        return;
      }

      // Try to load from blockchain
      if (totalGigs > 0) {
        // For now, use dummy data mixed with templates
        // In a real app, you would fetch each gig individually
        const templateGigs: DisplayGig[] = GIG_TEMPLATES.map((template, index) => ({
          id: index + 1,
          title: template.name,
          description: template.description,
          budget: `$${template.amount}`,
          category: template.category,
          skills: getCategorySkills(template.category),
          employer: "On-Chain Employer",
          rating: 0,
          verified: true,
          status: "Open",
          onChain: true,
        }));

        setGigs([...templateGigs, ...DUMMY_GIGS]);
      } else {
        setGigs(DUMMY_GIGS);
      }

      setIsLoading(false);
    }

    loadGigs();
  }, [totalGigs]);

  return {
    gigs,
    isLoading,
    isUsingBlockchain: isContractsDeployed(),
  };
}

// Hook to fetch single gig details
export function useGig(gigId?: number) {
  const [gig, setGig] = useState<DisplayGig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: gigData } = useReadContract({
    address: CONTRACTS.GigEscrow,
    abi: GigEscrowABI,
    functionName: 'gigs',
    args: gigId !== undefined ? [BigInt(gigId)] : undefined,
    query: {
      enabled: gigId !== undefined && isContractsDeployed(),
    },
  });

  useEffect(() => {
    if (!isContractsDeployed() || !gigData) {
      // Find from dummy data
      const found = DUMMY_GIGS.find(g => g.id === gigId);
      setGig(found || null);
      setIsLoading(false);
      return;
    }

    // Convert blockchain data to display format
    if (Array.isArray(gigData) && gigData.length > 0) {
      const [id, employer, worker, totalAmount, , , , paymentToken, status, createdAt, deadline] = gigData;

      const template = GIG_TEMPLATES.find(t => t.id === Number(id) - 1);

      setGig({
        id: Number(id),
        title: template?.name || `Gig #${id}`,
        description: template?.description || "Blockchain gig",
        budget: `$${formatTokenAmount(totalAmount as bigint, 6)}`,
        category: template?.category || "Blockchain",
        skills: template ? getCategorySkills(template.category) : [],
        employer: formatAddress(employer as Address),
        employerAddress: employer as Address,
        rating: 0,
        verified: true,
        status: getStatusLabel(Number(status)),
        deadline: new Date(Number(deadline) * 1000),
        paymentToken: paymentToken as Address,
        onChain: true,
      });
    }

    setIsLoading(false);
  }, [gigData, gigId]);

  return {
    gig,
    isLoading,
  };
}

// Helper functions
function getCategorySkills(category: string): string[] {
  const skillsMap: Record<string, string[]> = {
    "Web Development": ["React", "TypeScript", "Tailwind CSS"],
    "Blockchain": ["Solidity", "Security", "Auditing"],
    "Mobile Development": ["React Native", "iOS", "Android"],
    "Design": ["Figma", "UI/UX", "Branding"],
    "Content Writing": ["SEO", "Technical Writing", "Research"],
  };

  return skillsMap[category] || ["Blockchain", "Web3"];
}

function getStatusLabel(status: number): string {
  const labels = ["Draft", "Open", "Assigned", "In Progress", "Completed", "Cancelled", "Disputed"];
  return labels[status] || "Unknown";
}

function formatAddress(address: Address): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
