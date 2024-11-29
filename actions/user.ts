"use server";

import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const updateUser = async (values: Partial<User>) => {
  const self = await getSelf();

  const validData = {
    bio: values.bio,
    username: values.username,
    image: values.image,
    phone: values.phone,
    birthday: values.birthday,
    sex: values.sex,
    // city: values.cityId,
    village: values.village,
    job: values.job,
    jobRequest: values.jobRequest,
    // idNumber: values.idNumber,
    // idImages:values.idImages,
  };

  if (validData.username === "" || validData.username === null) {
    throw new Error("Username is required");
  }

  const user = await db.user.update({
    where: { id: self.id },
    data: { ...validData },
  });

  revalidatePath(`/${self.username}`);
  revalidatePath(`/u/${self.username}`);

  return user;
};
