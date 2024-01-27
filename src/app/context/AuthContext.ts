import { createContext, useContext } from "react";

import { type Claims } from "next-firebase-auth-edge/lib/auth/claims";
import { type UserInfo } from "firebase/auth";

export interface User extends Omit<UserInfo, "providerId"> {
  emailVerified: boolean;
  customClaims: Claims;
}

export interface AuthContextValue {
  user: User | null;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);
