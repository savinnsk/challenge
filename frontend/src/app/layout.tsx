import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SideBar } from "./components/sidebar/sidebar";
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
            <SideBar />
            <main className="px-4 pb-12 pt-24 lg:col-start-2 lg:px-8 lg:pt8">
              {children}
            </main>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
