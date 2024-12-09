"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { sendVerificationSMS } from "@/lib/sms";
import { generateVerificationToken } from "@/lib/tokens";
import { emailOrPhone } from "@/lib/utils";
const normalizePhoneNumber = (phone: string): string => {
  // Remove any non-numeric characters first
  phone = phone.replace(/\D/g, "");

  // Find the first occurrence of '5' and remove everything before it
  const phoneStartIndex = phone.indexOf("5");

  if (phoneStartIndex === -1) {
    // If no '5' is found, return the phone as is or handle as needed
    return phone;
  }

  // Take everything from the first "5" onwards and add the "970" prefix
  return "970" + phone.slice(phoneStartIndex);
};
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, birthday } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

 const existingUserByEmail = await getUserByEmail(email);
   const normalizedPhone = normalizePhoneNumber(email);
   const existingUserByPhone = await db.user.findUnique({
     where: { phone: normalizedPhone },
   });
 
   if (existingUserByEmail || existingUserByPhone) {
     return { error: "Email or Phone number already in use!" };
   }

 const emailOrPhoneValue = emailOrPhone(email);

  // Building the user data dynamically
  const userData: any = {
    name,
    password: hashedPassword,
    birthday,
    username: name.replace(/ /g, "_"),
    stream: {
      create: {
        name: `${name.replace(/ /g, "_")}'s stream`,
      },
    },
  };

  if (emailOrPhoneValue === "email") {
    userData.email = email;
  } else if (emailOrPhoneValue === "phone") {
    const normalizedPhone = normalizePhoneNumber(email);
    userData.phone = normalizedPhone; // Storing the normalized phone number
    userData.email = normalizedPhone + `@phone.com`;
}
 await db.user.create({
    data: userData, // Pass the dynamic userData object
  });

 const verificationToken = await generateVerificationToken(emailOrPhoneValue === 'phone' ? normalizedPhone+'@phone.com' : email);

if (emailOrPhoneValue === 'email') {
  await sendVerificationEmail(verificationToken.email, verificationToken.token); // Send the email verification
} else if (emailOrPhoneValue === 'phone') {
  await sendVerificationSMS(userData.phone, verificationToken.token); // Send the verification link via SMS
  console.log(userData.phone, verificationToken)
}

  return { success: emailOrPhoneValue == 'email'? "Confirmation email sent!": "Confirmation SMS sent!"};
};