import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(8, {
    message: "Enter a password with at least 8 characters",
  }),
});
