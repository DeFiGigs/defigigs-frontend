import { http, createConfig } from 'wagmi'
import { baseSepolia, localhost } from 'wagmi/chains'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'

// Force module resolution
import '@/lib/wagmi-exports'

// WalletConnect Project ID - get from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

// Determine which chains to use based on environment
const isDevelopment = process.env.NODE_ENV === 'development'
const useLocalhost = process.env.NEXT_PUBLIC_USE_LOCALHOST === 'true'

const chains = useLocalhost
  ? [localhost, baseSepolia]
  : [baseSepolia]

export const config = createConfig({
  chains: chains as any,
  connectors: [
    injected(),
    walletConnect({
      projectId,
      showQrModal: true,
    }),
    coinbaseWallet({
      appName: 'DeFi Gigs',
      appLogoUrl: 'https://example.com/logo.png',
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
    ...(useLocalhost ? { [localhost.id]: http() } : {}),
  },
})