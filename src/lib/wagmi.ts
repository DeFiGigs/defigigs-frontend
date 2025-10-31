import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors";

// Force module resolution
import "@/lib/wagmi-exports";

// WalletConnect Project ID - get from https://cloud.walletconnect.com
const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id";

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId,
      showQrModal: true,
    }),
    coinbaseWallet({
      appName: "DeFi Gigs",
      appLogoUrl: "https://example.com/logo.png",
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
  },
});
