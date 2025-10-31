import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import { WagmiProvider } from "@/components/providers/WagmiProvider";

export const metadata: Metadata = {
  title: "DeFi Gigs - Freelance with Crypto Payments",
  description:
    "Access instant financing for your projects with decentralized escrow protection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <WagmiProvider>{children}</WagmiProvider>
      </body>
    </html>
  );
}
