import * as z from "zod";
import { UserRole } from "@prisma/client";
import { emailOrPhone } from "@/lib/utils";  // Utility to check if input is email or phone

// Settings Schema
export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.TEACHER, UserRole.BROKER]),
    email: z.optional(z.string().email()),  // Allow optional email for settings update
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

// New Password Schema
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
  passwordConfirm: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
})
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password and confirmation must match",
    path: ["passwordConfirm"], 
  });

export const ResetSchema = z.object({
  email: z.string().refine((value) => emailOrPhone(value) !== "invalid", {
    message: "Invalid email or phone number",
  }).refine(
    (value) => {
      return emailOrPhone(value) === "email"
        ? z.string().email().safeParse(value).success
        : true;
    },
    { message: "Invalid email format" }
  ),
});

// Login Schema (Handles both email and phone number)
export const LoginSchema = z.object({
  email: z.string().refine((value) => emailOrPhone(value) !== "invalid", {
    message: "Invalid email or phone number",
  }).refine(
    (value) => {
      return emailOrPhone(value) === "email"
        ? z.string().email().safeParse(value).success
        : true;
    },
    { message: "Invalid email format" }
  ),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),  // Optional 2FA code
});

// Register Schema (Handles both email and phone number)
export const RegisterSchema = z
  .object({
    email: z
      .string()
      .refine((value) => emailOrPhone(value) !== "invalid", {
        message: "Invalid email or phone number",
      })
      .refine(
        (value) => {
          return emailOrPhone(value) === "email"
            ? z.string().email().safeParse(value).success
            : true;
        },
        { message: "Invalid email format" }
      ),
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    passwordConfirm: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
      message: "Name is required",
    }),
    birthday: z
      .date()
      .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
        message: "Invalid date",
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password and confirmation must match",
    path: ["passwordConfirm"],
  });
