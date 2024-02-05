import React, { useContext, type ReactNode } from "react";
import supabaseBrowser from "../supabase/browser";
import { type Session } from "@supabase/supabase-js";

const SessionContext = React.createContext<Session | null>(null);

const supabase = supabaseBrowser();

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        console.log("session", session);
        setSession(session);
      }
    });

    return () => {
      subscription.data.subscription.unsubscribe;
    };
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(SessionContext);
};
