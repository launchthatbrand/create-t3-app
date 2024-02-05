import { redirect, useRouter } from "next/navigation";

import { Button } from "./ui/button";
import React from "react";
import readUserSession from "~/lib/actions";
import supabaseServer from "~/lib/supabase/server";
import { useAuth } from "~/lib/context/AuthContext";

async function SignInSignOutButton() {
  const { data } = await readUserSession();

  console.log("button_readUserSession", data);
  async function handleAuthAction() {
    "use server";
    const supabase = await supabaseServer();
    if (data) {
      // If a user is detected, sign out
      await supabase.auth.signOut();
      console.log("Signed Out");
      redirect("/login"); // Optionally redirect to login page after signing out
    } else {
      // If no user is detected, redirect to sign-in page
      redirect("/login"); // Adjust the path to your sign-in page as necessary
    }
  }

  // if (loading) return <div>Loading...</div>;

  return (
    <form action={handleAuthAction}>
      <Button>{data.session ? "Sign Out" : "Sign In"}</Button>
    </form>
  );
}

export default SignInSignOutButton;
