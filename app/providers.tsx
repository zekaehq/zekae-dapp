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
import { kairos, moonbaseAlpha, sepolia } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http, createConfig } from 'wagmi';
import { Provider as JotaiProvider } from 'jotai';


// SigpassKit config
export const localConfig = createConfig({
  chains: [
    moonbaseAlpha,
    sepolia,
  ],
  transports: {
    [moonbaseAlpha.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
});

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "ZeKae", // Name your app
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
    kairos,
    moonbaseAlpha,
  ],
  transports: {
    [sepolia.id]: http(),
    [kairos.id]: http(),
    [moonbaseAlpha.id]: http(),
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
