"use client";

import { SiweMessage } from "siwe";
import { type Config, WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  type SIWEConfig,
  SIWEProvider,
  getDefaultConfig,
  type SIWESession,
} from "connectkit";
import { firebaseAdminCreateCustomToken } from "~/lib/actions";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "~/lib/firebase/client";

async function afterSiweSignin(session: SIWESession | undefined) {
  if (!session) return Error;
  try {
    console.log("afterSiweSigninStart", session);
    const token = await firebaseAdminCreateCustomToken({
      uid: session.address,
    });
    console.log("afterSiweSigninToken", token);
    const user = await signInWithCustomToken(auth, token);
    console.log("afterSiweSigninUser", user);
  } catch (error) {
    console.log("afterSiweSigninError", error);
  }
}

const wagmiConfig = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required
    appName: "Your App Name",

    // Optional
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

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <SIWEProvider
        {...siweConfig}
        onSignIn={(session?: SIWESession) => afterSiweSignin(session)}
      >
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </SIWEProvider>
    </WagmiConfig>
  );
}
