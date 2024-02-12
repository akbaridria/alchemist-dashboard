import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alchemist 4.0",
  description: "",
  icons: {
    icon: '/alchemist-logo.jpeg'
  },
  openGraph: {
    title: 'Alchemist 4.0 NFT Collection',
    description: 'Special-made NFTs for Alchemists that have shown above and beyond contributions to the ecosystem and community.',
    images: 'https://www.datocms-assets.com/86369/1697820116-alchemists_background.jpg?dpr=0.5&fm=webp'
  },
  twitter: {
    title: 'Alchemist 4.0 NFT Collection',
    description: 'Special-made NFTs for Alchemists that have shown above and beyond contributions to the ecosystem and community.',
    card: "summary_large_image",
    images: 'https://www.datocms-assets.com/86369/1697820116-alchemists_background.jpg?dpr=0.5&fm=webp'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          <div className="max-w-[1665px] mx-auto px-4 lg:px-8 xl:px-16">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
