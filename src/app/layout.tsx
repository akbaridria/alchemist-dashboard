import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alchemist 4.0",
  description: "",
  icons: {
    icon: '/alchemist-logo.jpeg'
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
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <div className="max-w-[1665px] mx-auto px-4 lg:px-8 xl:px-16">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
