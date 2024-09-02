"use server";

import { signOut } from "@/next-auth";

export const logout = async () => {
  await signOut();
};
