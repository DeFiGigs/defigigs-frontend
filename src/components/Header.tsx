"use client";

import { Bell, Wallet, User, ChevronDown, LayoutDashboard, TrendingUp, Briefcase, Building2, LogOut, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Header() {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleBrowseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open('/browse', '_blank', 'noopener,noreferrer');
  };

  const handleConnectWallet = () => {
    setShowWalletModal(true);
  };

  const handleSelectConnector = (connector: any) => {
    connect({ connector });
    setShowWalletModal(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-effect">
        <div className="container flex h-16 items-center justify-between px-8 mx-auto max-w-[1400px]">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg crypto-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">DF</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                DeFi Gigs
              </h1>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                    Platform
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/investor" className="flex items-center gap-2 cursor-pointer">
                      <TrendingUp className="h-4 w-4" />
                      Investor Pool
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/worker" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Worker Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/employer" className="flex items-center gap-2 cursor-pointer">
                      <Building2 className="h-4 w-4" />
                      Employer Panel
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/my-gigs" className="flex items-center gap-2 cursor-pointer">
                      <Briefcase className="h-4 w-4" />
                      My Gigs
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <a 
                href="/browse" 
                onClick={handleBrowseClick}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Browse Gigs
              </a>
              <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            {isConnected && address ? (
              <>
                <div className="hidden md:flex flex-col items-end text-xs">
                  <div className="flex items-center gap-1 text-accent">
                    <CheckCircle className="h-3 w-3" />
                    <span>Connected to Base Sepolia</span>
                  </div>
                  <span className="text-muted-foreground font-mono">{formatAddress(address)}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 border-primary/50">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="hidden sm:inline">{formatAddress(address)}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/worker">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wallet className="mr-2 h-4 w-4" />
                      {formatAddress(address)}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => disconnect()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button 
                className="crypto-gradient text-white hover:opacity-90"
                onClick={handleConnectWallet}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Wallet Connection Modal */}
      <Dialog open={showWalletModal} onOpenChange={setShowWalletModal}>
        <DialogContent className="sm:max-w-[425px] glass-effect border-border/40">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>
              Choose a wallet to connect to Base Sepolia testnet
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {connectors.map((connector) => (
              <Button
                key={connector.id}
                onClick={() => handleSelectConnector(connector)}
                className="w-full justify-start"
                variant="outline"
              >
                <Wallet className="mr-2 h-5 w-5" />
                {connector.name}
              </Button>
            ))}
          </div>
          <div className="text-xs text-muted-foreground text-center">
            Make sure you're connected to Base Sepolia testnet
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}