import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS } from '@/lib/contracts';
import {
  MockUSDCABI,
  GigEscrowABI,
  GigFactoryABI,
  GigFinancingABI,
  CollateralManagerABI,
  ReputationSystemABI,
} from '@/lib/abis';
import type { Address } from '@/lib/contracts';

// Hook to claim faucet tokens
export function useClaimFaucet(tokenAddress: Address) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const claimFaucet = async () => {
    return writeContract({
      address: tokenAddress,
      abi: MockUSDCABI,
      functionName: 'faucet',
    });
  };

  return {
    claimFaucet,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to check if user can claim faucet
export function useCanClaimFaucet(tokenAddress: Address, userAddress?: Address) {
  const { data, isLoading, refetch } = useReadContract({
    address: tokenAddress,
    abi: MockUSDCABI,
    functionName: 'canClaimFaucet',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress,
    },
  });

  return {
    canClaim: data as boolean | undefined,
    isLoading,
    refetch,
  };
}

// Hook to get token balance
export function useTokenBalance(tokenAddress: Address, userAddress?: Address) {
  const { data, isLoading, refetch } = useReadContract({
    address: tokenAddress,
    abi: MockUSDCABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress,
      refetchInterval: 5000, // Refetch every 5 seconds
    },
  });

  return {
    balance: data as bigint | undefined,
    isLoading,
    refetch,
  };
}

// Hook to approve token spending
export function useApproveToken(tokenAddress: Address) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const approve = async (spender: Address, amount: bigint) => {
    return writeContract({
      address: tokenAddress,
      abi: MockUSDCABI,
      functionName: 'approve',
      args: [spender, amount],
    });
  };

  return {
    approve,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to create gig from template
export function useCreateDemoGig() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const createDemoGig = async (templateId: number, paymentToken: Address) => {
    return writeContract({
      address: CONTRACTS.GigFactory,
      abi: GigFactoryABI,
      functionName: 'createDemoGig',
      args: [BigInt(templateId), paymentToken],
    });
  };

  return {
    createDemoGig,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to get gig details
export function useGigDetails(gigId?: bigint) {
  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACTS.GigEscrow,
    abi: GigEscrowABI,
    functionName: 'gigs',
    args: gigId !== undefined ? [gigId] : undefined,
    query: {
      enabled: gigId !== undefined,
    },
  });

  return {
    gig: data,
    isLoading,
    refetch,
  };
}

// Hook to get milestone details
export function useMilestoneDetails(milestoneId?: bigint) {
  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACTS.GigEscrow,
    abi: GigEscrowABI,
    functionName: 'milestones',
    args: milestoneId !== undefined ? [milestoneId] : undefined,
    query: {
      enabled: milestoneId !== undefined,
    },
  });

  return {
    milestone: data,
    isLoading,
    refetch,
  };
}

// Hook to get gig milestones
export function useGigMilestones(gigId?: bigint) {
  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACTS.GigEscrow,
    abi: GigEscrowABI,
    functionName: 'getGigMilestones',
    args: gigId !== undefined ? [gigId] : undefined,
    query: {
      enabled: gigId !== undefined,
    },
  });

  return {
    milestoneIds: data as bigint[] | undefined,
    isLoading,
    refetch,
  };
}

// Hook to assign worker to gig
export function useAssignWorker() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const assignWorker = async (gigId: bigint, workerAddress: Address) => {
    return writeContract({
      address: CONTRACTS.GigEscrow,
      abi: GigEscrowABI,
      functionName: 'assignWorker',
      args: [gigId, workerAddress],
    });
  };

  return {
    assignWorker,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to deposit escrow
export function useDepositEscrow() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const depositEscrow = async (gigId: bigint, amount: bigint, isNativeToken: boolean = false) => {
    return writeContract({
      address: CONTRACTS.GigEscrow,
      abi: GigEscrowABI,
      functionName: 'depositEscrow',
      args: [gigId, amount],
      value: isNativeToken ? amount : undefined,
    });
  };

  return {
    depositEscrow,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to submit milestone
export function useSubmitMilestone() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const submitMilestone = async (milestoneId: bigint, submissionUrl: string) => {
    return writeContract({
      address: CONTRACTS.GigEscrow,
      abi: GigEscrowABI,
      functionName: 'submitMilestone',
      args: [milestoneId, submissionUrl],
    });
  };

  return {
    submitMilestone,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to approve milestone
export function useApproveMilestone() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const approveMilestone = async (milestoneId: bigint) => {
    return writeContract({
      address: CONTRACTS.GigEscrow,
      abi: GigEscrowABI,
      functionName: 'approveMilestone',
      args: [milestoneId],
    });
  };

  return {
    approveMilestone,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to withdraw payment
export function useWithdrawPayment() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const withdrawPayment = async (gigId: bigint) => {
    return writeContract({
      address: CONTRACTS.GigEscrow,
      abi: GigEscrowABI,
      functionName: 'withdrawPayment',
      args: [gigId],
    });
  };

  return {
    withdrawPayment,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to get user profile
export function useUserProfile(userAddress?: Address) {
  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACTS.ReputationSystem,
    abi: ReputationSystemABI,
    functionName: 'userProfiles',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress,
    },
  });

  return {
    profile: data,
    isLoading,
    refetch,
  };
}

// Hook to create user profile
export function useCreateProfile() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const createProfile = async () => {
    return writeContract({
      address: CONTRACTS.ReputationSystem,
      abi: ReputationSystemABI,
      functionName: 'createProfile',
    });
  };

  return {
    createProfile,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to get total gigs count
export function useTotalGigs() {
  const { data, isLoading } = useReadContract({
    address: CONTRACTS.GigEscrow,
    abi: GigEscrowABI,
    functionName: 'nextGigId',
  });

  return {
    totalGigs: data ? Number(data) - 1 : 0,
    isLoading,
  };
}
