import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { ToastProvider } from "@/providers/toast-provider";
import { CartProvider } from "@/providers/cartProvider";
import { LoaderProvider } from '@/contacts/loaderContact';

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hungry",
  description: "Have food & share love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <CartProvider>
        <html lang="en">
          <body
            className={`cn("bg-background antialiased", "${urbanist.variable}") px-10`}
          >
            <ToastProvider />
            <Navbar />
            <LoaderProvider >
              {children}
            </LoaderProvider>
            <Footer />
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
