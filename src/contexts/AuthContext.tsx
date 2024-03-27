"use client";
import { type User as SupabaseUserType } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import Session from "~/lib/session";
import { supabaseBrowser } from "~/lib/supabase/browser";
import { AuthContextTest } from "./actions";

const AuthContext = createContext({});
const supabase = supabaseBrowser();

type User = SupabaseUserType;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Placeholder function to update based on actual auth check logic
  const checkAuth = async () => {
    try {
      // const web3session = await AuthContextTest();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("authcontext_user", user);
      return user; // Should include information on whether the user is authenticated and their data
    } catch (error) {
      console.error("Failed to verify auth:", error);
      return null;
    }
  };

  useEffect(() => {
    void checkAuth().then((userData) => {
      setUser(userData);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
