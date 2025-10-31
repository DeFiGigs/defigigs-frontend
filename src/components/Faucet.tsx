"use client";

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Loader2, CheckCircle, AlertCircle, Wallet } from 'lucide-react';
import { CONTRACTS, formatTokenAmount, type Address } from '@/lib/contracts';
import { useClaimFaucet, useCanClaimFaucet, useTokenBalance } from '@/hooks/useContracts';
import { toast } from 'sonner';

interface TokenFaucetProps {
  tokenAddress: Address;
  tokenName: string;
  tokenSymbol: string;
  decimals?: number;
}

function TokenFaucet({ tokenAddress, tokenName, tokenSymbol, decimals = 6 }: TokenFaucetProps) {
  const { address } = useAccount();
  const { claimFaucet, isPending, isConfirming, isSuccess } = useClaimFaucet(tokenAddress);
  const { canClaim, isLoading: checkingClaim, refetch: refetchCanClaim } = useCanClaimFaucet(tokenAddress, address);
  const { balance, isLoading: loadingBalance, refetch: refetchBalance } = useTokenBalance(tokenAddress, address);

  const handleClaim = async () => {
    try {
      await claimFaucet();
      toast.success(`${tokenSymbol} claimed successfully!`);

      // Refetch data after successful claim
      setTimeout(() => {
        refetchCanClaim();
        refetchBalance();
      }, 2000);
    } catch (error: any) {
      console.error('Claim error:', error);
      toast.error(error?.message || 'Failed to claim tokens');
    }
  };

  const formattedBalance = balance ? formatTokenAmount(balance, decimals) : '0';
  const isProcessing = isPending || isConfirming;

  return (
    <Card className="p-4 hover:border-primary/50 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Coins className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{tokenName}</h3>
            <Badge variant="outline" className="text-xs mt-1">{tokenSymbol}</Badge>
          </div>
        </div>

        {address && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Your Balance</p>
            <p className="font-semibold">
              {loadingBalance ? '...' : `${formattedBalance} ${tokenSymbol}`}
            </p>
          </div>
        )}
      </div>

      <Button
        onClick={handleClaim}
        disabled={!address || !canClaim || isProcessing}
        className="w-full"
        variant={isSuccess ? "outline" : "default"}
      >
        {isProcessing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {isSuccess && <CheckCircle className="w-4 h-4 mr-2" />}
        {!address && <Wallet className="w-4 h-4 mr-2" />}

        {!address
          ? "Connect Wallet First"
          : isProcessing
          ? "Claiming..."
          : isSuccess
          ? "Claimed Successfully!"
          : !canClaim
          ? "Already Claimed"
          : `Claim 1000 ${tokenSymbol}`
        }
      </Button>

      {!canClaim && address && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          You've already claimed your test tokens
        </p>
      )}
    </Card>
  );
}

export default function Faucet() {
  const { address, isConnected } = useAccount();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Test Token Faucet</h2>
        <p className="text-muted-foreground">
          Claim free test tokens to try out DeFi Gigs on Base Sepolia
        </p>
      </div>

      {!isConnected && (
        <Card className="p-6 border-amber-500/50 bg-amber-500/5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-500">Wallet Not Connected</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please connect your wallet to claim test tokens
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <TokenFaucet
          tokenAddress={CONTRACTS.MockUSDC}
          tokenName="Mock USDC"
          tokenSymbol="mUSDC"
          decimals={6}
        />

        <TokenFaucet
          tokenAddress={CONTRACTS.MockDAI}
          tokenName="Mock DAI"
          tokenSymbol="mDAI"
          decimals={18}
        />
      </div>

      <Card className="p-4 bg-primary/5 border-primary/20">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary" />
          How to Use
        </h3>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• Each faucet gives you 1000 test tokens</li>
          <li>• Tokens are free and for testing only</li>
          <li>• Use them to create gigs, deposit collateral, or test financing</li>
          <li>• No cooldown - claim as many times as you need!</li>
        </ul>
      </Card>

      {isConnected && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Connected: <span className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
          </p>
        </div>
      )}
    </div>
  );
}
