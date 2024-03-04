import { readUserSession, signOut } from "../(auth)/actions";

import { Button } from "./ui/button";
import React from "react";
import Session from "~/lib/session";
import { redirect } from "next/navigation";
import { toast } from "./ui/use-toast";

async function handleSignout() {
  "use server";
  const { error } = await signOut();

  if (error?.message) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{error.message}</code>
        </pre>
      ),
    });
  } else {
    toast({
      title: "Sucessfully Logged Out:",
    });
    redirect("/login");
  }
}

async function AuthButton() {
  const ironSession = await Session.getSession();
  console.log("ironSession", ironSession);
  const {
    data: { session },
  } = await readUserSession();
  if (!session && !ironSession.address)
    return (
      <form>
        <Button variant={"outline"}>Sign Ins</Button>
      </form>
    );
  return (
    <form action={handleSignout}>
      <Button variant={"outline"}>Sign Out</Button>
    </form>
  );
}

export default AuthButton;
