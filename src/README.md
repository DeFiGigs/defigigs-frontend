# 🎨 DeFi Gigs - Frontend Documentation

Complete guide to the DeFi Gigs frontend application built with Next.js 15, React 19, and Web3 technologies.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Core Technologies](#core-technologies)
4. [Web3 Integration](#web3-integration)
5. [Components Guide](#components-guide)
6. [Custom Hooks](#custom-hooks)
7. [Development Workflow](#development-workflow)
8. [Adding New Features](#adding-new-features)
9. [Styling Guide](#styling-guide)
10. [Testing](#testing)
11. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

The frontend is built as a modern Web3 application with the following architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
│                 (React Server Components)                 │
└─────────────────────────────────────────────────────────┘
                            │
                            ├─► Pages (app/)
                            │   └─► Server & Client Components
                            │
                            ├─► UI Components (components/)
                            │   ├─► Web3 Components
                            │   ├─► UI Components (Radix)
                            │   └─► Layout Components
                            │
                            ├─► Custom Hooks (hooks/)
                            │   ├─► useContracts (Smart Contract)
                            │   ├─► useGigs (Data Fetching)
                            │   └─► useAuth (Wallet)
                            │
                            └─► Web3 Layer (lib/)
                                ├─► Wagmi Config
                                ├─► Contract ABIs
                                └─► Contract Addresses

                            ▼
                    ┌───────────────┐
                    │   Wagmi + Viem  │
                    └───────────────┘
                            ▼
                    ┌───────────────┐
                    │   Blockchain    │
                    │ (Base Sepolia)  │
                    └───────────────┘
```

### Key Features

- **Dual Mode Operation**: Automatically switches between blockchain and demo data
- **Type-Safe Web3**: Full TypeScript support with Wagmi v2
- **Real-time Updates**: TanStack Query for efficient data fetching
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Wallet Integration**: ConnectKit for seamless wallet connections
- **Smart Contract Interaction**: Custom hooks for all contract functions

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Homepage
│   ├── browse/                  # Browse gigs page
│   │   └── page.tsx
│   ├── financing/               # Financing page
│   │   └── page.tsx
│   ├── profile/                 # User profile
│   │   └── page.tsx
│   ├── gig/                     # Individual gig details
│   │   └── [id]/
│   │       └── page.tsx
│   ├── layout.tsx               # Root layout
│   └── providers.tsx            # Context providers
│
├── components/                   # React components
│   ├── Header.tsx               # Main header with wallet
│   ├── Footer.tsx               # Footer component
│   ├── Faucet.tsx              # Token faucet for testnet
│   ├── GigCard.tsx             # Gig display card
│   ├── MilestoneCard.tsx       # Milestone display
│   ├── WalletConnect.tsx       # Wallet connection UI
│   └── ui/                      # Shadcn/Radix UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── ...
│
├── hooks/                        # Custom React hooks
│   ├── useContracts.ts          # Smart contract interactions
│   ├── useGigs.ts               # Gig data fetching
│   ├── useAuth.ts               # Authentication/wallet
│   └── useToast.ts              # Toast notifications
│
├── lib/                          # Utility libraries
│   ├── contracts.ts             # Contract addresses & types
│   ├── wagmi.ts                 # Wagmi configuration
│   ├── utils.ts                 # Helper functions
│   ├── abis/                    # Contract ABIs
│   │   ├── index.ts            # Exported ABIs
│   │   ├── gigEscrow.ts
│   │   ├── gigFactory.ts
│   │   ├── gigFinancing.ts
│   │   ├── collateralManager.ts
│   │   ├── reputationSystem.ts
│   │   └── mockUSDC.ts
│   └── dummy-data.ts            # Demo data for UI testing
│
├── types/                        # TypeScript type definitions
│   ├── contracts.ts             # Contract types
│   └── index.ts                 # General types
│
└── styles/                       # Global styles
    └── globals.css              # Tailwind imports & custom CSS
```

---

## 🔧 Core Technologies

### Next.js 15 (App Router)

- **Server Components**: Default for better performance
- **Client Components**: Use `'use client'` when needed
- **Route Handlers**: API routes in app/ directory
- **Layouts**: Shared layouts across pages
- **Turbopack**: Fast development server

### React 19

- **Hooks**: useState, useEffect, useMemo, etc.
- **Suspense**: For loading states
- **Server Actions**: Form handling
- **Transitions**: Smooth UI updates

### TypeScript

- **Strict Mode**: Full type safety
- **Contract Types**: Auto-generated from ABIs
- **Component Props**: Typed interfaces
- **Generic Hooks**: Type-safe custom hooks

### Styling

- **Tailwind CSS v4**: Utility-first CSS
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Smooth animations
- **CSS Variables**: Theme customization

---

## 🌐 Web3 Integration

### Wagmi Configuration

**File**: `lib/wagmi.ts`

```typescript
import { http, createConfig } from 'wagmi'
import { baseSepolia, localhost } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'
import { createClient } from 'viem'

// Environment-based network selection
const useLocalhost = process.env.NEXT_PUBLIC_USE_LOCALHOST === 'true'
const chains = useLocalhost ? [localhost, baseSepolia] : [baseSepolia]

export const config = createConfig({
  chains,
  connectors: [
    injected(),
    metaMask(),
  ],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})
```

### Contract Configuration

**File**: `lib/contracts.ts`

Contains all contract addresses and TypeScript types:

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

**Auto-Update**: When deploying locally, `contracts/scripts/deploy-local.js` automatically updates these addresses.

### ABIs

**Location**: `lib/abis/`

Each contract has its own ABI file:

```typescript
// lib/abis/gigEscrow.ts
export const GigEscrowABI = [
  {
    inputs: [],
    name: "createGig",
    outputs: [{ type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  // ... more functions
] as const;
```

---

## 🎨 Components Guide

### Core Components

#### Header Component

**File**: `components/Header.tsx`

Main navigation header with wallet connection.

```typescript
'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b">
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold">
          DeFi Gigs
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/browse">Browse Gigs</Link>
          <Link href="/financing">Financing</Link>
          <ConnectButton />
        </div>
      </nav>
    </header>
  );
}
```

#### Faucet Component

**File**: `components/Faucet.tsx`

Token faucet for claiming test tokens.

**Features**:
- Shows USDC and DAI balances
- One-click claiming
- Transaction status feedback
- Loading states
- Error handling

**Usage**:
```typescript
import { Faucet } from '@/components/Faucet';

export default function BrowsePage() {
  return (
    <div>
      <Faucet />
      {/* ... other content */}
    </div>
  );
}
```

#### GigCard Component

**File**: `components/GigCard.tsx`

Displays gig information in a card format.

```typescript
interface GigCardProps {
  gig: DisplayGig;
  onClick?: () => void;
}

export function GigCard({ gig, onClick }: GigCardProps) {
  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-lg">
      <CardHeader>
        <CardTitle>{gig.title}</CardTitle>
        <CardDescription>{gig.category}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Budget:</span>
            <span className="font-bold">{gig.amount} {gig.token}</span>
          </div>
          <div className="flex justify-between">
            <span>Deadline:</span>
            <span>{formatDate(gig.deadline)}</span>
          </div>
          <Badge variant={getStatusVariant(gig.status)}>
            {gig.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
```

### UI Components (Radix)

Located in `components/ui/`, these are built with Radix UI primitives:

- **button.tsx** - Button with variants
- **card.tsx** - Card container
- **dialog.tsx** - Modal dialogs
- **dropdown-menu.tsx** - Dropdown menus
- **input.tsx** - Form inputs
- **label.tsx** - Form labels
- **progress.tsx** - Progress bars
- **select.tsx** - Select dropdowns
- **tabs.tsx** - Tab navigation
- **toast.tsx** - Toast notifications

**Example Usage**:
```typescript
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';

<Button variant="default" size="lg">
  Create Gig
</Button>

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>Create New Gig</DialogHeader>
    {/* ... content */}
  </DialogContent>
</Dialog>
```

---

## 🪝 Custom Hooks

### useContracts Hook

**File**: `hooks/useContracts.ts`

Provides all smart contract interactions.

#### Available Hooks:

##### 1. Token Operations

```typescript
// Claim faucet tokens
const { claimFaucet, isPending, isSuccess } = useClaimFaucet(CONTRACTS.MockUSDC);

await claimFaucet();
```

```typescript
// Get token balance
const { balance, isLoading } = useTokenBalance(CONTRACTS.MockUSDC, address);

console.log(`Balance: ${formatTokenAmount(balance, 6)} USDC`);
```

```typescript
// Approve token spending
const { approveToken } = useApproveToken(CONTRACTS.MockUSDC);

await approveToken(CONTRACTS.GigEscrow, parseTokenAmount("5000", 6));
```

##### 2. Gig Operations

```typescript
// Create gig from template
const { createDemoGig } = useCreateDemoGig();

const gigId = await createDemoGig(0, CONTRACTS.MockUSDC); // Template 0
```

```typescript
// Get gig details
const { gig, isLoading } = useGigDetails(gigId);

console.log(gig);
// {
//   id: 1n,
//   employer: "0x...",
//   worker: "0x...",
//   amount: 5000000000n, // 5000 USDC (6 decimals)
//   paymentToken: "0x...",
//   deadline: 1234567890n,
//   status: 0, // Active
//   createdAt: 1234567800n
// }
```

```typescript
// Get total gigs count
const { totalGigs } = useTotalGigs();
```

##### 3. Escrow Operations

```typescript
// Assign worker to gig
const { assignWorker } = useAssignWorker();

await assignWorker(gigId, workerAddress);
```

```typescript
// Deposit escrow
const { depositEscrow } = useDepositEscrow();

await depositEscrow(gigId, amount);
```

```typescript
// Submit milestone
const { submitMilestone } = useSubmitMilestone();

await submitMilestone(milestoneId, "https://github.com/deliverable");
```

```typescript
// Approve milestone
const { approveMilestone } = useApproveMilestone();

await approveMilestone(milestoneId);
```

```typescript
// Withdraw payment
const { withdrawPayment } = useWithdrawPayment();

await withdrawPayment(gigId);
```

##### 4. Profile & Reputation

```typescript
// Create user profile
const { createProfile } = useCreateProfile();

await createProfile();
```

```typescript
// Get user profile
const { profile, isLoading } = useUserProfile(address);

console.log(profile);
// {
//   exists: true,
//   totalEarned: 10000000000n,
//   gigsCompleted: 5n,
//   rating: 450n, // 4.5 rating
//   isActive: true
// }
```

```typescript
// Submit rating
const { submitRating } = useSubmitRating();

await submitRating(gigId, workerAddress, 5); // 5 stars
```

### useGigs Hook

**File**: `hooks/useGigs.ts`

Fetches and manages gig data with automatic blockchain/demo mode detection.

```typescript
export function useGigs() {
  const [gigs, setGigs] = useState<DisplayGig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { totalGigs } = useTotalGigs();

  useEffect(() => {
    async function loadGigs() {
      // Check if contracts are deployed
      if (!isContractsDeployed()) {
        // Use dummy data
        setGigs(DUMMY_GIGS);
        setIsLoading(false);
        return;
      }

      // Fetch from blockchain
      const gigsData = [];
      for (let i = 1; i <= totalGigs; i++) {
        const gig = await fetchGigFromBlockchain(i);
        gigsData.push(gig);
      }

      setGigs(gigsData);
      setIsLoading(false);
    }

    loadGigs();
  }, [totalGigs]);

  return {
    gigs,
    isLoading,
    isUsingBlockchain: isContractsDeployed()
  };
}
```

**Usage**:
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

## 🔨 Development Workflow

### Setup Development Environment

1. **Install Dependencies**:
```bash
npm install
```

2. **Setup Environment Variables** (optional):
```bash
# .env.local
NEXT_PUBLIC_USE_LOCALHOST=true  # For local blockchain
```

3. **Start Development Server**:
```bash
# With demo data (no blockchain)
npm run dev

# With local blockchain
npm run dev:local
```

### Development Modes

#### 1. Demo Mode (No Blockchain)

Perfect for UI development without blockchain complexity.

```bash
npm run dev
```

- Uses dummy data from `lib/dummy-data.ts`
- No wallet connection required
- Instant UI feedback
- Great for styling and layout

#### 2. Local Blockchain Mode

Full blockchain functionality with instant transactions.

```bash
# Terminal 1: Start Hardhat node
npm run contracts:node

# Terminal 2: Deploy contracts
npm run contracts:deploy-local

# Terminal 3: Start frontend
npm run dev:local
```

- Full Web3 functionality
- Instant transactions (no waiting)
- Unlimited test tokens
- Perfect for testing contract interactions

#### 3. Testnet Mode

Connect to Base Sepolia for public testing.

```bash
# Deploy contracts first
npm run contracts:deploy-testnet

# Start frontend
npm run dev
```

- Real blockchain environment
- Public on block explorer
- Shareable with others
- Best for demos

### Hot Reload

Next.js supports hot reload for:
- ✅ Component changes
- ✅ Page changes
- ✅ Style changes
- ✅ Configuration changes (needs restart)

### Type Checking

```bash
# Check types
npx tsc --noEmit

# Watch mode
npx tsc --noEmit --watch
```

---

## 🚀 Adding New Features

### Adding a New Page

1. **Create page file**:
```bash
# Create app/my-feature/page.tsx
```

2. **Create page component**:
```typescript
// app/my-feature/page.tsx
export default function MyFeaturePage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">My Feature</h1>
      {/* ... content */}
    </div>
  );
}
```

3. **Add navigation link**:
```typescript
// components/Header.tsx
<Link href="/my-feature">My Feature</Link>
```

### Adding a New Contract Interaction

1. **Add function to useContracts.ts**:
```typescript
export function useMyNewFunction() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const myFunction = async (param1: string, param2: bigint) => {
    return writeContract({
      address: CONTRACTS.GigEscrow,
      abi: GigEscrowABI,
      functionName: 'myNewFunction',
      args: [param1, param2],
    });
  };

  return { myFunction, isPending, isConfirming, isSuccess };
}
```

2. **Use in component**:
```typescript
function MyComponent() {
  const { myFunction, isPending } = useMyNewFunction();

  const handleClick = async () => {
    try {
      await myFunction("test", 100n);
      toast.success("Success!");
    } catch (error) {
      toast.error("Failed!");
    }
  };

  return (
    <Button onClick={handleClick} disabled={isPending}>
      {isPending ? "Processing..." : "Execute"}
    </Button>
  );
}
```

### Adding a New Component

1. **Create component file**:
```typescript
// components/MyComponent.tsx
'use client';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onAction}>Action</Button>
      </CardContent>
    </Card>
  );
}
```

2. **Export from components**:
```typescript
// components/index.ts
export { MyComponent } from './MyComponent';
```

3. **Use in pages**:
```typescript
import { MyComponent } from '@/components/MyComponent';

<MyComponent title="Test" onAction={() => console.log('clicked')} />
```

---

## 🎨 Styling Guide

### Tailwind CSS

Use utility classes for styling:

```typescript
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
  <h2 className="text-xl font-bold text-gray-900">Title</h2>
  <Button className="bg-blue-500 hover:bg-blue-600">Action</Button>
</div>
```

### Custom Classes

Use Tailwind's @apply in CSS modules:

```css
/* styles/custom.module.css */
.myCard {
  @apply rounded-lg shadow-lg p-6 bg-white;
  @apply hover:shadow-xl transition-shadow;
}
```

### Theme Customization

Edit `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
    },
  },
};
```

### Responsive Design

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Wallet connection works
- [ ] Faucet claims tokens successfully
- [ ] Gigs load from blockchain
- [ ] Create gig functionality works
- [ ] Milestone submission works
- [ ] Payment withdrawal works
- [ ] UI is responsive on mobile
- [ ] Loading states show correctly
- [ ] Error messages display properly

### Testing with Different Networks

```bash
# Test with localhost
NEXT_PUBLIC_USE_LOCALHOST=true npm run dev

# Test with testnet
npm run dev
```

### Browser Testing

Test in multiple browsers:
- Chrome/Brave (Recommended)
- Firefox
- Safari
- Edge

### Wallet Testing

Test with different wallets:
- MetaMask (Primary)
- Coinbase Wallet
- WalletConnect

---

## 🐛 Troubleshooting

### Issue: "Hydration Error"

**Cause**: Mismatch between server and client rendering.

**Solution**:
- Use `'use client'` for components with Web3 hooks
- Check for window/document usage in server components
- Use `useEffect` for client-only code

### Issue: "Hook call error"

**Cause**: Using hooks outside of React components or in wrong order.

**Solution**:
- Only use hooks in component functions
- Don't use hooks in loops or conditions
- Keep hook call order consistent

### Issue: "Contract call failed"

**Cause**: Various reasons (wrong network, insufficient funds, etc.)

**Solution**:
```typescript
const { writeContract } = useWriteContract({
  mutation: {
    onError: (error) => {
      console.error('Contract error:', error);
      // Check error message for specific issue
    }
  }
});
```

### Issue: "Wallet not connecting"

**Checklist**:
- [ ] MetaMask installed?
- [ ] Correct network selected?
- [ ] Site permissions granted?
- [ ] Wallet unlocked?

**Solution**:
```typescript
// Check if wallet is available
if (typeof window.ethereum === 'undefined') {
  alert('Please install MetaMask!');
  return;
}
```

### Issue: "Transactions timing out"

**Cause**: Network congestion or wrong gas settings.

**Solution**:
- Check network status
- Increase gas limit
- Try again later

---

## 📚 Additional Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Wagmi Docs](https://wagmi.sh)
- [Viem Docs](https://viem.sh)
- [Radix UI Docs](https://www.radix-ui.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Guides

- [FRONTEND_INTEGRATION.md](../FRONTEND_INTEGRATION.md) - Integration guide
- [LOCAL_TESTING.md](../LOCAL_TESTING.md) - Local testing guide
- [OVERVIEW.md](../OVERVIEW.md) - Complete project overview

---

## 🤝 Contributing

When contributing to the frontend:

1. **Follow TypeScript best practices**
2. **Use existing components when possible**
3. **Add proper error handling**
4. **Test on multiple devices**
5. **Document complex logic**
6. **Keep components focused and small**

---

**Happy Coding! 🚀**
