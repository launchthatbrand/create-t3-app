"use server";

import supabaseServer from "./supabase/server";

export default async function readUserSession() {
  const supabase = await supabaseServer();
  return supabase.auth.getSession();
}
