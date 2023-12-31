import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/store/context-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Play for a cause chat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gray-500 min-h-screen  flex items-center justify-center">
          <AuthProvider>
            <main className="lg:col-start-2 ">{children}</main>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
