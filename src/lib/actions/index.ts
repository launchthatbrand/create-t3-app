"use server";

import { adminAuth } from "../firebase/server";

export async function firebaseAdminCreateCustomToken(data: { uid: string }) {
  const result = await adminAuth.createCustomToken(data.uid);

  return result;
}
