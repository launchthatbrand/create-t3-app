"use client";

import { AuthProvider } from "~/lib/context/AuthContext";
import { Provider } from "react-supabase";
import supabaseBrowser from "~/lib/supabase/browser";

const client = supabaseBrowser();

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider value={client}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
