"use client";

import { redirect } from "next/navigation";
import supabaseServer from "~/lib/supabase/server";

export default async function PrivatePage() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.getUser();
  if (error ?? !data?.user) {
    redirect("/login");
  }

  return <p>Hello {data.user.email}</p>;
}
