import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import stc from "string-to-color";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const stringToColor = (str: string) => {
//   return stc(str);
// };

// Temporary replacement for stc to test
export const stringToColor = (str: string) => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

// Regular expression for validating email
 const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Regular expression for validating phone number (international support)
 const phoneRegex = /^[+]?[0-9]{10,15}$/;

 export const emailOrPhone = (input: string) => {
  if (emailRegex.test(input)) {
      return 'email';
  } else if (phoneRegex.test(input)) {
      return 'phone';
  } else {
      return 'invalid';  // In case it's neither an email nor a phone number
  }
};