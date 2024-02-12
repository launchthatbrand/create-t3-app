/* eslint-disable @typescript-eslint/require-await */
"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { SiweMessage } from "siwe";
import { mainnet } from "wagmi/chains";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ConnectKitProvider,
  type SIWEConfig,
  SIWEProvider,
  getDefaultConfig,
  type SIWESession,
} from "connectkit";

async function afterSiweSignin(session: SIWESession | undefined) {
  if (!session) return Error;
  try {
    console.log("afterSiweSigninStart", session);
    // const token = await firebaseAdminCreateCustomToken({
    //   uid: session.address,
    // });
    // console.log("afterSiweSigninToken", token);
    // const user = await signInWithCustomToken(auth, token);
    // console.log("afterSiweSigninUser", user);
  } catch (error) {
    console.log("afterSiweSigninError", error);
  }
}

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const siweConfig = {
  getNonce: async () => {
    const res = await fetch(`/siwe`, { method: "PUT" });
    if (!res.ok) throw new Error("Failed to fetch SIWE nonce");

    return res.text();
  },
  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      nonce,
      chainId,
      address,
      version: "1",
      uri: window.location.origin,
      domain: window.location.host,
      statement: "Sign In With Ethereum to prove you control this wallet.",
    }).prepareMessage();
  },
  verifyMessage: ({ message, signature }) => {
    return fetch(`/siwe`, {
      method: "POST",
      body: JSON.stringify({ message, signature }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.ok);
  },
  getSession: async () => {
    const res = await fetch(`/siwe`);
    if (!res.ok) throw new Error("Failed to fetch SIWE session");

    const { address, chainId } = (await res.json()) as SIWESession;
    return address && chainId ? { address, chainId } : null;
  },
  signOut: () => fetch(`/siwe`, { method: "DELETE" }).then((res) => res.ok),
} satisfies SIWEConfig;

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <SIWEProvider
        {...siweConfig}
        onSignIn={(session?: SIWESession) => afterSiweSignin(session)}
      >
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </SIWEProvider>
    </WagmiProvider>
  );
};
