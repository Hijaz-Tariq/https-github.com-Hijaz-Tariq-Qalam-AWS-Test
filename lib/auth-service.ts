import { currentLiveUser } from "./auth";

import { db } from "@/lib/db";

export const getSelf = async () => {
  const self = await currentLiveUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { id: self.id },
  });

  if (!user) {
    throw new Error("Not found");
  }

  return user;
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentLiveUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { username }
  });

  if (!user) {
    return user
  }

  if (self.username !== user.username) {
    throw new Error("Unauthorized");
  }

  return user;
};
