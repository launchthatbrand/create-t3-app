"use client";

import { Config, WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, SIWESession, getDefaultConfig } from "connectkit";

import { siweClient } from "@/utils/siweClient";

const wagmiConfig = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID!,

    // Required
    appName: "Your App Name",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig config={wagmiConfig as unknown as Config<any, any>}>
      <siweClient.Provider>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </siweClient.Provider>
    </WagmiConfig>
  );
}
