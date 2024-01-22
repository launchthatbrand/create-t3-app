"use client";

import { Button } from "~/components/ui/button";
import React from "react";
import { auth } from "~/lib/firebase/client";
import { firebaseAdminCreateCustomToken } from "~/lib/actions";
import { signInWithCustomToken } from "firebase/auth";

async function handleSubmit() {
  const uid = "0x123456789123456789123456789";
  const token = await firebaseAdminCreateCustomToken({ uid });
  console.log("token", token);
  const user = await signInWithCustomToken(auth, token);
  console.log("user", user);
}

function page() {
  return (
    <div className="flex min-h-64 flex-col items-center gap-y-6 rounded-md bg-slate-300 p-5 shadow-sm">
      Add New User As Admin Page
      <Button onClick={handleSubmit}>Add New User As Admin</Button>
    </div>
  );
}

export default page;
