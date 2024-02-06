import { redirect } from "next/navigation";

import { Button } from "./ui/button";
import React from "react";
import readUserSession from "~/lib/actions";
import supabaseServer from "~/lib/supabase/server";
import { type User } from "@supabase/supabase-js";

// interface UserMetadata {
//   first_name: string;
//   // Add other metadata fields as needed
// }

// interface ExtendedUser extends User {
//   user_metadata?: UserMetadata | undefined;
// }

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
  const user = session?.user;

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
          name={user?.user_metadata?.firstName}
          image={user?.user_metadata?.profileImage}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-col space-y-1">
          <span>{user?.user_metadata?.firstName}</span>
          <sub>{user?.id}</sub>
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
        <DropdownMenuItem>
          <form action={handleAuthAction}>
            <Button variant="link" className="p-0">
              Sign Out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SignInSignOutButton;
