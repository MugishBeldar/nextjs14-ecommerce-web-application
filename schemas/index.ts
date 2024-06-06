import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string()
    .min(1, { message: 'Email is required' })
    .refine(email => email.endsWith('.com'), {
      message: "Email must end with .com"
    }),
  password: z.string()
    .min(4, { message: "Password must be at least 4 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" })
    .regex(/\d/, { message: "Password must contain at least one number" })
});

export const ProductSchema = z.object({
  productName: z.string().min(1, {
    message: "Product name required",
  }),
  description: z.string().min(1, {
    message: "Product description required",
  }),
  category: z.string().min(1, {
    message: "Category required",
  }),
  price: z.string().min(1, {
    message: "Price required",
  }),
  discount: z.string().min(0).max(100),
  qty: z.string().min(1, {
    message: "Quantity required",
  }),
});