import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      role: UserRole;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
    } & DefaultSession["user"];
  }
}
