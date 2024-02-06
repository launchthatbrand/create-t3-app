import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import React from "react";
import UserAvatar from "./UserAvatar";
import readUserSession from "~/lib/actions";

async function AuthButton() {
  const {
    data: { session },
  } = await readUserSession();
  const user = session?.user;

  if (!session)
  return (
    <form >
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
          <form >
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
