"use server";

import supabaseServer from "~/lib/supabase/server";

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  confirm: string;
}) {
  const supabase = await supabaseServer();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  return result;
}
