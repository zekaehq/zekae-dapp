import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { MOONBASE_ALPHA_ADDRESSES, SEPOLIA_ADDRESSES, BASE_SEPOLIA_ADDRESSES } from "@/lib/addresses";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateHash(hash: string, startLength: number = 6, endLength: number = 4) {
  return `${hash.slice(0, startLength)}...${hash.slice(-endLength)}`;
}

export function formatBalance(balance: string) {
  // Convert string to number and format with thousand separators
  return Number(balance).toLocaleString();
}

export function getAddressesBasedOnChainId(chainId: number | undefined) {
  switch (chainId) {
    case 1287:
      return MOONBASE_ALPHA_ADDRESSES;
    case 11155111:
      return SEPOLIA_ADDRESSES;
    case 84532:
      return BASE_SEPOLIA_ADDRESSES;
    default:
      return MOONBASE_ALPHA_ADDRESSES;
  }
}
