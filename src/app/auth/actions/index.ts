"use server";

import supabaseServer from "~/lib/supabase/server";

export async function signUpWithEmailAndPassword(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
}) {
  const supabase = await supabaseServer();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        firstName: data?.firstName,
        lastName: data?.lastName,
      },
    },
  });

  return result;
}

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await supabaseServer();
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return result;
}

export async function signOut() {
  const supabase = await supabaseServer();
  const result = await supabase.auth.signOut();
  return result;
}
