"use client";

import * as React from "react";
import {
  type IdTokenResult,
  onIdTokenChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";
import { AuthContext, type User } from "../context/AuthContext";
import { auth } from "../lib/firebase/client";

export interface AuthProviderProps {
  serverUser: User | null;
  children: React.ReactNode;
}

function toUser(user: FirebaseUser, idTokenResult: IdTokenResult): User {
  return {
    ...user,
    customClaims: filterStandardClaims(idTokenResult.claims),
  };
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  serverUser,
  children,
}) => {
  const [user, setUser] = React.useState(serverUser);

  const handleIdTokenChanged = async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      const idTokenResult = await firebaseUser.getIdTokenResult();

      // Sets authenticated user cookies
      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idTokenResult.token}`,
        },
      });

      setUser(toUser(firebaseUser, idTokenResult));
      return;
    }

    // Removes authenticated user cookies
    await fetch("/api/logout");

    setUser(null);
  };

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return onIdTokenChanged(auth, handleIdTokenChanged);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
