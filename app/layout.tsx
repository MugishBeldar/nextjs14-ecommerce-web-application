'use client';
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { NextAuthProvider } from "@/app/providers";
import "./globals.css";
import { Header } from "@/components/user";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className={path.split('/').includes('admin')?'':'flex flex-col h-screen'}>
            <div className="sticky top-0 w-full z-50 bg-black ">
              <Header />
            </div>
            <div className="bg-primary-dark flex-1">{children}</div>
          </div>
        </NextAuthProvider>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
