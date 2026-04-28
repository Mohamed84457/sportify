import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .nonempty("email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "This is not valid email format"),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
      `At least 8 characters includes an uppercase, 1 lowercase, 1 number, 1 special character`,
    ),
});
