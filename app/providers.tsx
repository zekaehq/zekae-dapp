'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  trustWallet,
  ledgerWallet,
  uniswapWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { mainnet, kairos, moonbaseAlpha, sepolia, baseSepolia } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http, createConfig } from 'wagmi';
import { Provider as JotaiProvider } from 'jotai';


// SigpassKit config
export const localConfig = createConfig({
  chains: [
    moonbaseAlpha,
    sepolia,
    mainnet,
    baseSepolia,
  ],
  transports: {
    [moonbaseAlpha.id]: http(),
    [sepolia.id]: http(),
    [mainnet.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true,
});

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "ZeKae", // Name your app
  appDescription: "All inclusive DeFi platform",
  appUrl: "https://app.zekae.com", // your app's url
  appIcon: "https://app.zekae.com/logo.svg", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, // Enter your WalletConnect Project ID here
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [uniswapWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
    sepolia,
    baseSepolia,
    kairos,
    moonbaseAlpha,
    mainnet,
  ],
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
    [kairos.id]: http(),
    [moonbaseAlpha.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true, // Because it is Nextjs's App router, you need to declare ssr as true
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </JotaiProvider>
  );
}
