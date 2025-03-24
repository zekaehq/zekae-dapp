import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/sonner"

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'ZeKae',
  description: 'All inclusive DeFi platform',
  metadataBase: new URL('https://www.zekae.com'),
  openGraph: {
    title: 'ZeKae',
    description: 'All inclusive DeFi platform',
    url: 'https://www.zekae.com',
    siteName: 'ZeKae',
    images: [
      {
        url: '/zekae-tbn.png',
        width: 1200,
        height: 630,
        alt: 'og-image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeKae',
    description: 'All inclusive DeFi platform',
    creator: '@zekaeHQ',
    images: ['/zekae-tbn.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans3.className} antialiased`}>
        <Providers>
          <main>
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
