import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SideBar } from "./components/sidebar/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid  min-h-screen grid-cols-app">
          <SideBar />
          <main className="px-4 pb-12 pt-24 lg:col-start-2 lg:px-8 lg:pt8">
            {" "}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
