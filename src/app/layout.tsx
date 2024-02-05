import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alchemist 4.0",
  description: "",
  icons: {
    icon: '/alchemist-logo.webp'
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
        <div className="w-[1440px] max-w-full mx-auto p-4">
          <ThemeProvider attribute="class" defaultTheme="system">
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
