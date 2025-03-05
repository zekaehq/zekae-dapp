"use client";

import Navbar from "@/components/navbar";
import SwapComponent from "@/components/swap-component";

export default function SwapPage() {
  return (
    <div className="flex flex-col gap-8 p-2 md:p-8">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-8">
        <SwapComponent />
      </div>
    </div>
  );
}
