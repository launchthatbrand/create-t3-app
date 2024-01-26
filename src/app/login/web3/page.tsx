"use client";

import { Button } from "~/components/ui/button";
import { ConnectKitButton } from "connectkit";
import React from "react";
import { auth } from "~/lib/firebase/client";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Web3Login() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex flex-col justify-center">
        <p>Current User: {user.uid}</p>
        <Button onClick={() => signOut(auth)}>Log Out</Button>
      </div>
    );
  }
  return (
    <div>
      Web3Login
      <ConnectKitButton />
    </div>
  );
}

export default Web3Login;
