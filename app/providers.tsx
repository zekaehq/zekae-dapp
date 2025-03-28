'use client';

import * as React from 'react';
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { moonbaseAlpha, sepolia } from 'viem/chains';
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


// ConnectKit config
const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [
      moonbaseAlpha,
      sepolia,
    ],
    transports: {
      // RPC URL for each chain
      [moonbaseAlpha.id]: http("https://moonbase-alpha.drpc.org"),
      [sepolia.id]: http("https://sepolia.drpc.org"),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required App Info
    appName: "ZeKae",



    // Optional App Info
    appDescription: "All inclusive DeFi platform",
    appUrl: "https://app.zekae.com", // your app's url
    appIcon: "https://app.zekae.com/logo.svg", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    ssr: true,
  }),
);

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider
            theme="midnight"
          >
            {children}
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </JotaiProvider>
  );
}
