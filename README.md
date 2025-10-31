# 🎨 DeFi Gigs - Frontend Application

Frontend application for DeFi Gigs platform built with Next.js 15, React 19, and Web3 technologies.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📋 Overview

Modern Web3 frontend application for the DeFi Gigs decentralized freelancing platform.

### Key Features

- ⚡ **Next.js 15** with App Router and React Server Components
- 🌐 **Full Web3 Integration** with Wagmi v2 and Viem
- 🎨 **Modern UI** with Tailwind CSS v4 and Radix UI
- 📱 **Responsive Design** - Mobile-first approach
- 🔄 **Real-time Updates** with TanStack Query
- 🎯 **Type-Safe** - Full TypeScript support
- 🪝 **15+ Custom Hooks** for contract interactions
- 🎭 **Dual Mode** - Works with or without blockchain

---

## 🛠️ Tech Stack

### Core
- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development

### Web3
- **Wagmi v2** - React hooks for Ethereum
- **Viem** - TypeScript Ethereum library
- **ConnectKit** - Wallet connection UI
- **TanStack Query** - Async state management

### Styling
- **Tailwind CSS v4** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations
- **Lucide Icons** - Beautiful icons

### State & Data
- **React Hooks** - useState, useEffect, custom hooks
- **TanStack Query** - Server state management
- **Context API** - Global state when needed

---

## 🚀 Quick Start

### Prerequisites

```bash
# Node.js 18+ and npm
node --version  # Should be 18+
npm --version
```

### Installation

```bash
# Clone repository
git clone https://github.com/DeFiGigs/defigigs-frontend.git
cd defigigs-frontend

# Install dependencies
npm install
```

### Development Modes

#### 1. Demo Mode (No Blockchain)

Perfect for UI development and testing without blockchain complexity.

```bash
# Start development server
npm run dev

# Visit http://localhost:3000
```

**Features:**
- Uses dummy data from `lib/dummy-data.ts`
- No wallet connection required
- Instant UI feedback
- Great for styling and layout testing

#### 2. Local Blockchain Mode

Full Web3 functionality with instant transactions.

```bash
# Terminal 1: Start local blockchain (in contracts repo)
cd ../defigigs-contracts
npx hardhat node

# Terminal 2: Deploy contracts
cd ../defigigs-contracts
npx hardhat run scripts/deploy-local.js --network localhost

# Terminal 3: Start frontend
cd ../defigigs-frontend
npm run dev:local

# Visit http://localhost:3000
```

**Features:**
- Full smart contract integration
- Instant transactions (no waiting)
- Unlimited test tokens
- Perfect for development and testing

#### 3. Testnet Mode

Connect to Base Sepolia for public testing and demos.

```bash
# Make sure contracts are deployed to testnet first
# (See defigigs-contracts repo)

# Start frontend
npm run dev

# Visit http://localhost:3000
# Connect MetaMask to Base Sepolia
```

**Features:**
- Real blockchain environment
- Public on block explorer
- Shareable with others
- Best for demos and hackathons

---

## 📁 Project Structure

```
defigigs-frontend/
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── page.tsx                 # Homepage
│   │   ├── browse/                  # Browse gigs
│   │   │   └── page.tsx
│   │   ├── financing/               # Financing page
│   │   │   └── page.tsx
│   │   ├── profile/                 # User profile
│   │   │   └── page.tsx
│   │   ├── gig/                     # Gig details
│   │   │   └── [id]/page.tsx
│   │   ├── layout.tsx               # Root layout
│   │   └── providers.tsx            # Context providers
│   │
│   ├── components/                   # React components
│   │   ├── Header.tsx               # Main header with wallet
│   │   ├── Footer.tsx               # Footer component
│   │   ├── Faucet.tsx              # Token faucet
│   │   ├── GigCard.tsx             # Gig display card
│   │   ├── MilestoneCard.tsx       # Milestone display
│   │   ├── WalletConnect.tsx       # Wallet connection
│   │   └── ui/                      # Radix UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── ...
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useContracts.ts          # Contract interactions
│   │   ├── useGigs.ts               # Gig data fetching
│   │   ├── useAuth.ts               # Wallet authentication
│   │   └── useToast.ts              # Toast notifications
│   │
│   ├── lib/                          # Utility libraries
│   │   ├── contracts.ts             # Contract addresses & types
│   │   ├── wagmi.ts                 # Wagmi configuration
│   │   ├── utils.ts                 # Helper functions
│   │   ├── abis/                    # Contract ABIs
│   │   │   ├── index.ts
│   │   │   ├── gigEscrow.ts
│   │   │   ├── gigFactory.ts
│   │   │   ├── gigFinancing.ts
│   │   │   ├── collateralManager.ts
│   │   │   ├── reputationSystem.ts
│   │   │   └── mockUSDC.ts
│   │   └── dummy-data.ts            # Demo data
│   │
│   ├── types/                        # TypeScript types
│   │   ├── contracts.ts             # Contract types
│   │   └── index.ts                 # General types
│   │
│   └── styles/                       # Global styles
│       └── globals.css              # Tailwind & custom CSS
│
├── public/                           # Static assets
│   ├── images/
│   └── ...
│
├── next.config.js                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── package.json
├── .env.example                      # Environment variables
└── README.md
```

---

## 🌐 Web3 Integration

### Wagmi Configuration

**File**: `lib/wagmi.ts`

```typescript
import { http, createConfig } from 'wagmi'
import { baseSepolia, localhost } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

// Environment-based network selection
const useLocalhost = process.env.NEXT_PUBLIC_USE_LOCALHOST === 'true'
const chains = useLocalhost ? [localhost, baseSepolia] : [baseSepolia]

export const config = createConfig({
  chains,
  connectors: [injected(), metaMask()],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})
```

### Contract Configuration

**File**: `lib/contracts.ts`

```typescript
export const CONTRACTS = {
  MockUSDC: "0x...",
  MockDAI: "0x...",
  GigEscrow: "0x...",
  GigFinancing: "0x...",
  CollateralManager: "0x...",
  ReputationSystem: "0x...",
  GigFactory: "0x...",
} as const;

// Types for contract data
export interface Gig {
  id: bigint;
  employer: Address;
  worker: Address;
  amount: bigint;
  paymentToken: Address;
  deadline: bigint;
  status: number;
  createdAt: bigint;
}
```

**Note**: When deploying locally, addresses are automatically updated by the deployment script!

---

## 🪝 Custom Hooks

### useContracts Hook

**File**: `hooks/useContracts.ts`

Provides all smart contract interactions.

#### Token Operations

```typescript
// Claim faucet tokens
const { claimFaucet, isPending, isSuccess } = useClaimFaucet(CONTRACTS.MockUSDC);
await claimFaucet();

// Get token balance
const { balance, isLoading } = useTokenBalance(CONTRACTS.MockUSDC, address);

// Approve token spending
const { approveToken } = useApproveToken(CONTRACTS.MockUSDC);
await approveToken(CONTRACTS.GigEscrow, amount);
```

#### Gig Operations

```typescript
// Create gig from template
const { createDemoGig } = useCreateDemoGig();
const gigId = await createDemoGig(0, CONTRACTS.MockUSDC);

// Get gig details
const { gig, isLoading } = useGigDetails(gigId);

// Get total gigs count
const { totalGigs } = useTotalGigs();
```

#### Escrow Operations

```typescript
// Assign worker to gig
const { assignWorker } = useAssignWorker();
await assignWorker(gigId, workerAddress);

// Deposit escrow
const { depositEscrow } = useDepositEscrow();
await depositEscrow(gigId, amount);

// Submit milestone
const { submitMilestone } = useSubmitMilestone();
await submitMilestone(milestoneId, deliverableUrl);

// Approve milestone
const { approveMilestone } = useApproveMilestone();
await approveMilestone(milestoneId);

// Withdraw payment
const { withdrawPayment } = useWithdrawPayment();
await withdrawPayment(gigId);
```

#### Profile & Reputation

```typescript
// Create user profile
const { createProfile } = useCreateProfile();
await createProfile();

// Get user profile
const { profile, isLoading } = useUserProfile(address);

// Submit rating
const { submitRating } = useSubmitRating();
await submitRating(gigId, workerAddress, 5); // 5 stars
```

### useGigs Hook

**File**: `hooks/useGigs.ts`

Fetches gig data with automatic blockchain/demo mode detection.

```typescript
function BrowseGigs() {
  const { gigs, isLoading, isUsingBlockchain } = useGigs();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {isUsingBlockchain ? (
        <Badge variant="success">🟢 Connected to Blockchain</Badge>
      ) : (
        <Badge variant="warning">🟡 Using Demo Data</Badge>
      )}

      {gigs.map(gig => (
        <GigCard key={gig.id} gig={gig} />
      ))}
    </div>
  );
}
```

---

## 🎨 Key Components

### Faucet Component

**File**: `components/Faucet.tsx`

Token faucet for claiming test tokens.

```typescript
import { Faucet } from '@/components/Faucet';

<Faucet />
```

**Features:**
- Shows USDC and DAI balances
- One-click claiming
- Transaction status feedback
- Loading states
- Error handling

### GigCard Component

**File**: `components/GigCard.tsx`

Displays gig information in a card format.

```typescript
import { GigCard } from '@/components/GigCard';

<GigCard gig={gig} onClick={() => router.push(`/gig/${gig.id}`)} />
```

### UI Components

Located in `components/ui/`, built with Radix UI:

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';

<Button variant="default" size="lg">
  Create Gig
</Button>

<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

---

## ⚙️ Environment Variables

Create `.env.local` file:

```bash
# For local blockchain testing
NEXT_PUBLIC_USE_LOCALHOST=true

# For testnet/mainnet
NEXT_PUBLIC_USE_LOCALHOST=false
```

---

## 🚀 Deployment

### Deploy to Vercel

#### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Option 2: GitHub Integration

1. Push code to GitHub
2. Visit https://vercel.com
3. Import repository
4. Configure:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add environment variables:
   - `NEXT_PUBLIC_USE_LOCALHOST=false`
6. Deploy!

**Live URL**: Your app will be available at `https://your-project.vercel.app`

---

## 🧪 Development Workflow

### Hot Reload

Next.js supports hot reload for:
- ✅ Component changes
- ✅ Page changes
- ✅ Style changes
- ✅ Configuration (needs restart)

### Type Checking

```bash
# Check types
npx tsc --noEmit

# Watch mode
npx tsc --noEmit --watch
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

---

## 📚 Documentation

### In This Repo
- [INTEGRATION.md](./INTEGRATION.md) - Smart contract integration guide
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development workflow

### In Contracts Repo
- **Smart Contracts**: [defigigs-contracts](https://github.com/DeFiGigs/defigigs-contracts)
- Contract ABIs and addresses
- Deployment instructions

### In Overview Repo
- **Complete Documentation**: [defigigs-overview](https://github.com/DeFiGigs/defigigs-overview)
- Architecture explanation
- User guides
- Developer guides

---

## 🔗 Related Repositories

- 📚 **Project Overview**: [defigigs-overview](https://github.com/DeFiGigs/defigigs-overview)
- 🔐 **Smart Contracts**: [defigigs-contracts](https://github.com/DeFiGigs/defigigs-contracts)

---

## 🐛 Troubleshooting

### Issue: "Hydration Error"

**Cause**: Mismatch between server and client rendering.

**Solution**:
- Use `'use client'` for components with Web3 hooks
- Check for window/document usage in server components
- Use `useEffect` for client-only code

### Issue: "Contract call failed"

**Cause**: Various reasons (wrong network, insufficient funds, etc.)

**Solutions**:
- Check wallet is connected to correct network
- Verify sufficient ETH for gas
- Check token approval
- Verify contract addresses in `lib/contracts.ts`

### Issue: "Wallet not connecting"

**Checklist**:
- [ ] MetaMask installed?
- [ ] Correct network selected?
- [ ] Site permissions granted?
- [ ] Wallet unlocked?

More troubleshooting: See [defigigs-overview](https://github.com/DeFiGigs/defigigs-overview)

---

## 🤝 Contributing

We welcome contributions!

### How to Contribute

1. Fork this repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open Pull Request

### Areas to Contribute

- 🎨 **UI/UX**: Improve design and user experience
- ⚡ **Features**: Add new functionality
- 📱 **Responsive**: Improve mobile experience
- 🐛 **Bug Fixes**: Fix issues
- 📚 **Documentation**: Improve docs
- ♿ **Accessibility**: Improve a11y

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

### Links
- **Organization**: [github.com/DeFiGigs](https://github.com/DeFiGigs)
- **Issues**: [Report bugs](https://github.com/DeFiGigs/defigigs-frontend/issues)
- **Discussions**: [Ask questions](https://github.com/DeFiGigs/defigigs-frontend/discussions)

### Resources
- **Next.js Docs**: https://nextjs.org/docs
- **Wagmi Docs**: https://wagmi.sh
- **Viem Docs**: https://viem.sh
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Radix UI Docs**: https://www.radix-ui.com/docs

---

<div align="center">

**Built with ❤️ for Base Hackathon 2025**

[⭐ Star this repo](https://github.com/DeFiGigs/defigigs-frontend) | [🐛 Report Bug](https://github.com/DeFiGigs/defigigs-frontend/issues) | [💡 Request Feature](https://github.com/DeFiGigs/defigigs-frontend/issues)

</div>
