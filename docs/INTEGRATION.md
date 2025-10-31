# 🎨 DeFi Gigs - Frontend Integration Guide

This guide explains how the frontend is integrated with smart contracts for the hackathon demo.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [Smart Contract Integration](#smart-contract-integration)
5. [Key Components](#key-components)
6. [Custom Hooks](#custom-hooks)
7. [Demo Mode vs Blockchain Mode](#demo-mode-vs-blockchain-mode)
8. [Common Tasks](#common-tasks)

---

## 🌟 Overview

The frontend is built with **Next.js 15**, **React 19**, **TypeScript**, and **Wagmi** for Web3 interactions. It supports both **demo mode** (dummy data) and **blockchain mode** (real smart contract data).

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Web3**: Wagmi + Viem
- **UI**: Tailwind CSS + Radix UI components
- **State**: React hooks + TanStack Query
- **Network**: Base Sepolia Testnet

---

## 🏗️ Architecture

```
src/
├── app/                      # Next.js App Router pages
│   ├── browse/              # Browse gigs page
│   ├── financing/           # Financing page
│   └── ...
├── components/              # React components
│   ├── Faucet.tsx          # Token faucet component
│   ├── Header.tsx          # Wallet connection
│   └── ...
├── hooks/                   # Custom React hooks
│   ├── useContracts.ts     # Contract interaction hooks
│   └── useGigs.ts          # Gig data fetching
├── lib/                     # Utilities and config
│   ├── contracts.ts        # Contract addresses & types
│   ├── abis/               # Contract ABIs
│   │   ├── gigEscrow.ts
│   │   ├── mockUSDC.ts
│   │   └── ...
│   └── wagmi.ts            # Wagmi configuration
└── ...
```

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
bun install
```

### 2. Configure Environment

Create `.env.local` in the root directory:

```bash
# Optional: WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

### 3. Update Contract Addresses

After deploying smart contracts to Base Sepolia, update the addresses in:

**`src/lib/contracts.ts`**

```typescript
export const CONTRACTS = {
  MockUSDC: "0xYourMockUSDCAddress",
  MockDAI: "0xYourMockDAIAddress",
  GigEscrow: "0xYourGigEscrowAddress",
  GigFinancing: "0xYourGigFinancingAddress",
  CollateralManager: "0xYourCollateralManagerAddress",
  ReputationSystem: "0xYourReputationSystemAddress",
  GigFactory: "0xYourGigFactoryAddress",
} as const;
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🔗 Smart Contract Integration

### Wagmi Configuration

The app is already configured for **Base Sepolia** in `src/lib/wagmi.ts`:

```typescript
import { baseSepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'DeFi Gigs' }),
  ],
  transports: {
    [baseSepolia.id]: http(),
  },
})
```

### Contract ABIs

ABIs are located in `src/lib/abis/`:

- `mockUSDC.ts` - ERC20 token with faucet
- `gigEscrow.ts` - Gig escrow contract
- `gigFactory.ts` - Gig template factory
- `gigFinancing.ts` - Advance financing
- `collateralManager.ts` - Collateral management
- `reputationSystem.ts` - On-chain reputation

All ABIs are typed and exported from `src/lib/abis/index.ts`.

---

## 🧩 Key Components

### 1. Header Component (`src/components/Header.tsx`)

**Features:**
- Wallet connection button
- MetaMask, WalletConnect, Coinbase Wallet support
- Account display with address truncation
- Disconnect functionality

**Usage:**
```tsx
import Header from '@/components/Header';

<Header />
```

The wallet connection is handled automatically via Wagmi hooks.

### 2. Faucet Component (`src/components/Faucet.tsx`)

**Features:**
- Claim 1000 MockUSDC
- Claim 1000 MockDAI
- Real-time balance display
- Claim status tracking
- No cooldown (disabled for hackathon)

**Usage:**
```tsx
import Faucet from '@/components/Faucet';

<Faucet />
```

**Key Functions:**
- `claimFaucet()` - Claims test tokens
- `canClaim` - Checks if user can claim
- `balance` - Shows current token balance

### 3. Browse Page (`src/app/browse/page.tsx`)

**Features:**
- Displays gigs from blockchain or demo data
- Blockchain status indicator
- Faucet integration
- Search and filter functionality
- Loading states

**Auto-switching:**
- If contracts deployed → Shows blockchain data
- If contracts not deployed → Shows demo data

---

## 🪝 Custom Hooks

### Contract Interaction Hooks (`src/hooks/useContracts.ts`)

#### Token Operations

```typescript
// Claim faucet tokens
const { claimFaucet, isPending, isSuccess } = useClaimFaucet(tokenAddress);
await claimFaucet();

// Check token balance
const { balance } = useTokenBalance(tokenAddress, userAddress);

// Approve token spending
const { approve } = useApproveToken(tokenAddress);
await approve(spenderAddress, amount);
```

#### Gig Operations

```typescript
// Create gig from template
const { createDemoGig } = useCreateDemoGig();
await createDemoGig(templateId, paymentTokenAddress);

// Get gig details
const { gig, isLoading } = useGigDetails(gigId);

// Get gig milestones
const { milestoneIds } = useGigMilestones(gigId);

// Assign worker
const { assignWorker } = useAssignWorker();
await assignWorker(gigId, workerAddress);

// Deposit escrow
const { depositEscrow } = useDepositEscrow();
await depositEscrow(gigId, amount, isNativeToken);

// Submit milestone
const { submitMilestone } = useSubmitMilestone();
await submitMilestone(milestoneId, submissionUrl);

// Approve milestone
const { approveMilestone } = useApproveMilestone();
await approveMilestone(milestoneId);

// Withdraw payment
const { withdrawPayment } = useWithdrawPayment();
await withdrawPayment(gigId);
```

#### Reputation Operations

```typescript
// Get user profile
const { profile, isLoading } = useUserProfile(userAddress);

// Create profile
const { createProfile } = useCreateProfile();
await createProfile();
```

### Gig Data Hooks (`src/hooks/useGigs.ts`)

```typescript
// Fetch all gigs (auto-detects blockchain/demo mode)
const { gigs, isLoading, isUsingBlockchain } = useGigs();

// Fetch single gig
const { gig, isLoading } = useGig(gigId);
```

---

## 🔄 Demo Mode vs Blockchain Mode

### Demo Mode

When contract addresses are `0x0000...`, the app automatically uses **dummy data**:

- ✅ All UI functionality works
- ✅ Shows example gigs
- ✅ No wallet required to browse
- ❌ Can't create/interact with real gigs
- ❌ No faucet functionality

### Blockchain Mode

When contracts are deployed and addresses updated:

- ✅ Real blockchain interactions
- ✅ Faucet works (claim test tokens)
- ✅ Create gigs on-chain
- ✅ Full workflow (create → assign → pay → rate)
- ✅ On-chain reputation tracking

### Status Indicator

The browse page shows the current mode:

```
🟢 Connected to Blockchain
Showing real gigs from Base Sepolia smart contracts

🟡 Using Demo Data
Deploy contracts and update addresses in src/lib/contracts.ts
```

---

## 📚 Common Tasks

### Task 1: Claim Test Tokens

```typescript
import { useClaimFaucet, useTokenBalance } from '@/hooks/useContracts';
import { CONTRACTS } from '@/lib/contracts';

function MyComponent() {
  const { address } = useAccount();
  const { claimFaucet, isPending } = useClaimFaucet(CONTRACTS.MockUSDC);
  const { balance } = useTokenBalance(CONTRACTS.MockUSDC, address);

  return (
    <div>
      <p>Balance: {formatTokenAmount(balance || 0n, 6)} USDC</p>
      <button
        onClick={() => claimFaucet()}
        disabled={isPending}
      >
        Claim 1000 USDC
      </button>
    </div>
  );
}
```

### Task 2: Create a Gig

```typescript
import { useCreateDemoGig } from '@/hooks/useContracts';
import { CONTRACTS } from '@/lib/contracts';
import { toast } from 'sonner';

function CreateGigButton() {
  const { createDemoGig, isPending, isSuccess } = useCreateDemoGig();

  const handleCreate = async () => {
    try {
      await createDemoGig(
        0, // Template ID (0-4)
        CONTRACTS.MockUSDC // Payment token
      );
      toast.success('Gig created successfully!');
    } catch (error) {
      toast.error('Failed to create gig');
    }
  };

  return (
    <button onClick={handleCreate} disabled={isPending}>
      {isPending ? 'Creating...' : 'Create Gig'}
    </button>
  );
}
```

### Task 3: Display Gig Details

```typescript
import { useGigDetails, useGigMilestones } from '@/hooks/useContracts';
import { formatTokenAmount, getGigStatusLabel } from '@/lib/contracts';

function GigDetails({ gigId }: { gigId: bigint }) {
  const { gig } = useGigDetails(gigId);
  const { milestoneIds } = useGigMilestones(gigId);

  if (!gig) return <div>Loading...</div>;

  return (
    <div>
      <h2>Gig #{gigId.toString()}</h2>
      <p>Employer: {gig.employer}</p>
      <p>Total Amount: {formatTokenAmount(gig.totalAmount, 6)} USDC</p>
      <p>Status: {getGigStatusLabel(gig.status)}</p>
      <p>Milestones: {milestoneIds?.length || 0}</p>
    </div>
  );
}
```

### Task 4: Complete Workflow (Employer Side)

```typescript
async function employerWorkflow() {
  // 1. Claim test tokens
  await claimFaucet();

  // 2. Create gig
  const gigId = await createDemoGig(0, CONTRACTS.MockUSDC);

  // 3. Assign worker
  await assignWorker(gigId, workerAddress);

  // 4. Approve token spending
  await approve(CONTRACTS.GigEscrow, gigAmount);

  // 5. Deposit escrow
  await depositEscrow(gigId, gigAmount, false);

  // 6. After worker submits, approve milestone
  await approveMilestone(milestoneId);
}
```

### Task 5: Complete Workflow (Worker Side)

```typescript
async function workerWorkflow() {
  // 1. Create profile
  await createProfile();

  // 2. Wait for assignment (from employer)

  // 3. Submit milestone
  await submitMilestone(
    milestoneId,
    'https://github.com/worker/project'
  );

  // 4. After approval, withdraw payment
  await withdrawPayment(gigId);
}
```

---

## 🎯 Helper Functions

### Format Token Amounts

```typescript
import { formatTokenAmount, parseTokenAmount } from '@/lib/contracts';

// Display token amount
const amount = 1000000n; // 1 USDC (6 decimals)
console.log(formatTokenAmount(amount, 6)); // "1"

// Parse user input
const userInput = "100.50";
const parsed = parseTokenAmount(userInput, 6); // 100500000n
```

### Get Status Labels

```typescript
import {
  getGigStatusLabel,
  getMilestoneStatusLabel,
  getFinancingStatusLabel
} from '@/lib/contracts';

console.log(getGigStatusLabel(1)); // "Open"
console.log(getMilestoneStatusLabel(1)); // "Submitted"
console.log(getFinancingStatusLabel(2)); // "Disbursed"
```

---

## 🐛 Troubleshooting

### Issue: "Contracts not deployed" warning

**Solution**: Deploy contracts to Base Sepolia and update addresses in `src/lib/contracts.ts`

### Issue: Transactions failing

**Checklist:**
1. ✅ Wallet connected to Base Sepolia
2. ✅ Have test ETH for gas
3. ✅ Claimed test tokens (if needed)
4. ✅ Approved token spending (for ERC20)
5. ✅ Contract addresses are correct

### Issue: Balance not updating

**Solution**: Hooks auto-refetch every 5 seconds, or manually call `refetch()`

```typescript
const { balance, refetch } = useTokenBalance(tokenAddress, address);

// After transaction
await claimFaucet();
setTimeout(() => refetch(), 2000);
```

---

## 📖 Next Steps

1. ✅ Deploy smart contracts to Base Sepolia
2. ✅ Update contract addresses in `src/lib/contracts.ts`
3. ✅ Test faucet functionality
4. ✅ Create test gigs
5. ✅ Complete full gig workflow
6. ✅ Test financing features
7. ✅ Build reputation
8. ✅ Prepare demo for judges

---

## 💡 Tips for Hackathon Demo

1. **Pre-claim tokens** before demo to avoid waiting
2. **Create sample gigs** beforehand for quick showcase
3. **Use Template 0** (Website Development) - it's the most relatable
4. **Show the status indicator** to highlight blockchain integration
5. **Demonstrate faucet** first to show ease of use
6. **Walk through complete flow**: Create → Assign → Submit → Approve → Withdraw
7. **Highlight on-chain reputation** as differentiator

---

## 🆘 Need Help?

- **Smart Contracts**: See `/contracts/HACKATHON.md`
- **Deployment**: See `/contracts/README.md`
- **Frontend Issues**: Check browser console for errors
- **Web3 Issues**: Verify network is Base Sepolia (Chain ID: 84532)

---

**Happy Hacking! 🚀**
