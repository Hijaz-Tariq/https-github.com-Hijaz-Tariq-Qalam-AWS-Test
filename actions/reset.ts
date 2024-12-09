"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { sendPasswordResetSMS } from "@/lib/sms";  // Importing SMS sending function
import { generatePasswordResetToken } from "@/lib/tokens";
import { emailOrPhone } from "@/lib/utils";

const normalizePhoneNumber = (phone: string): string => {
  phone = phone.replace(/\D/g, ""); // Remove any non-digit characters

  const phoneStartIndex = phone.indexOf("5");

  if (phoneStartIndex === -1) {
    return phone;
  }

  return "970" + phone.slice(phoneStartIndex); // Normalize phone number to a valid format
};

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email or phone number!" };
  }

  let { email } = validatedFields.data;
  const emailOrPhoneValue = emailOrPhone(email);  // Check if the value is email or phone

  if (emailOrPhoneValue === "phone") {
    // Normalize the phone number and send SMS
    email = `${normalizePhoneNumber(email)}@phone.com`;  // Format it as a phone number with domain
    const phoneNumber = normalizePhoneNumber(email); // We need the normalized phone number

    const existingUser = await getUserByEmail(email);
    
    if (!existingUser) {
      return { error: "لم تقم بالتسجيل سابقاً" };  // If the user does not exist with this phone number
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    
    // Send SMS for password reset
    await sendPasswordResetSMS(phoneNumber, passwordResetToken.token); // Send SMS instead of email
    
    return { success: "تم ارسال الرابط الى هاتفك" };  // Inform the user
  } else {
    // For email, continue with the email reset flow
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "Email not found!" };  // If the user does not exist with this email
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    
    // Send the password reset email
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
    
    return { success: "Password reset email sent!" };  // Inform the user
  }
};
