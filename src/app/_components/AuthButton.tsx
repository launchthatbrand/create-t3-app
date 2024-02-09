import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import readUserSession, { signOut } from "~/lib/actions/auth";

import { Button } from "./ui/button";
import React from "react";
import UserAvatar from "./UserAvatar";
import { redirect } from "next/navigation";
import { toast } from "./ui/use-toast";

async function AuthButton() {
  async function signOutUser() {
    "use server";
    console.log("signout submitted");
    const result = await signOut();
    const { error } = result;

    if (error?.message) {
      toast({
        title: "Error:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Sucessfully Logged Out:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            Sucessfully Logged Out
          </pre>
        ),
      });
      redirect("/login");
    }
  }
  const {
    data: { session },
  } = await readUserSession();
  const user = session?.user;

  if (!session)
    return (
      <form>
        <Button variant={"outline"}>Sign In</Button>
      </form>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          name={user?.user_metadata?.firstName ?? "Dev"}
          // image={user?.user_metadata?.profileImage}
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
          <form action={signOutUser}>
            <Button variant="link" className="p-0">
              Sign Out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AuthButton;
