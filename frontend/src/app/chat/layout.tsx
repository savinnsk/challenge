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
        <div className="grid  min-h-screen lg:grid-cols-app">
          <AuthProvider>
            <main className="lg:col-start-2 lg:pt8">{children}</main>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
