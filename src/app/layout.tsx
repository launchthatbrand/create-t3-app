import "~/styles/globals.css";

import ClientProvider from "./_components/ClientProvider";
import Header from "./_components/Header";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "@/components/ui/toaster";
import { headers } from "next/headers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} flex min-h-screen flex-col`}
      >
        <ClientProvider>
          <TRPCReactProvider headers={headers()}>
            <Header />
            <div className="flex min-h-screen flex-1 flex-col items-center justify-center">
              {children}
            </div>
          </TRPCReactProvider>
          <Toaster />
        </ClientProvider>
      </body>
    </html>
  );
}
