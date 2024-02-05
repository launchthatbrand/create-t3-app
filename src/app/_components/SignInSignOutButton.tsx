import { redirect } from "next/navigation";

import { Button } from "./ui/button";
import React from "react";
import readUserSession from "~/lib/actions";
import supabaseServer from "~/lib/supabase/server";
import { type User } from "@supabase/supabase-js";

interface UserMetadata {
  name: string;
  // Add other metadata fields as needed
}

interface ExtendedUser extends User {
  user_metadata?: UserMetadata;
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserAvatar from "./UserAvatar";

async function SignInSignOutButton() {
  const {
    data: { session },
  } = await readUserSession();
  const user = session?.user as ExtendedUser;

  async function handleAuthAction() {
    "use server";
    const supabase = await supabaseServer();
    if (session) {
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

  if (!session)
    return (
      <form action={handleAuthAction}>
        <Button variant={"outline"}>Sign In</Button>
      </form>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          name={user.user_metadata?.name}
          image={user.user_metadata?.name}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-col">
          {session.user?.user_metadata.first_name}
          <sub>{session.user?.id}</sub>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* {subscription === undefined && (
            <DropdownMenuItem>
              <Loader2 className="mr-2 h-4 w-full animate-spin items-center" />
            </DropdownMenuItem>
          )}

          {subscription?.role === "pro" && (
            <>
              <DropdownMenuLabel className="flex animate-pulse items-center justify-center space-x-1 text-xs text-[#e035c1]">
                <StarIcon fill="#E935c1" />
                <p>PRO</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <ManageAccountButton />
              </DropdownMenuItem>
            </>
          )} */}
        <DropdownMenuItem>Dashboard</DropdownMenuItem>
        <DropdownMenuItem>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SignInSignOutButton;
