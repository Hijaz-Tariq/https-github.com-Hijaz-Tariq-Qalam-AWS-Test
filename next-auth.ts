import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { generateUsername } from "unique-username-generator";

import { db } from "@/lib/db";
import authConfig from "./next-auth.config";

import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.username) {
        session.user.username = token.username as string;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name?.replace(/ /g, "_");
        session.user.email = token.email!;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      const id = token.sub;

      if (!id) return token;

      const dbUser = await db.user.findUnique({
        where: { id },
        select: {
          username: true,
        },
      });

      if (!dbUser) return token;

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name?.replace(/ /g, "_");
      token.username = existingUser.username;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return {
        ...token,
        username: dbUser.username,
      };
    },
  },
  events: {
    createUser: async ({ user }) => {
      const email = user.email || "";
      const username = user.name?.replace(/ /g, "_");
      await db.user.update({
        where: { email, id: user.id },
        data: {
          emailVerified: new Date(),
          username: username,
          stream: {
            create: {
              name: `${username}'s stream`,
            },
          },
        },
      });
    },
  },
  ...authConfig,
});
