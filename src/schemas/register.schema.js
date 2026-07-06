import * as z from 'zod';

export const registerSchema = z.object({
  name: z.string().nonempty('Name is required').min(3, 'Min length is 3'),

  username: z.string().nonempty('Username is required'),

  email: z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address"),

  dateOfBirth: z.coerce.date().refine(
    (val) => new Date().getFullYear() - val.getFullYear() > 16,
    "Age must be above 16 years"
  ).transform(
    (date) => `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
  ),

  gender: z.enum(['male', 'female'], 'Gender must be male or female'),

  password: z.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    .nonempty('Password is required'),

  rePassword: z.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
});