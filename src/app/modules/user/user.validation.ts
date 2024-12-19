import { z } from 'zod';

// Define the zod schema for user validation
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email address'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters long')
      .max(20, 'Password must be at least 20 characters'),
    role: z.enum(['admin', 'user']).optional(),
    isBlocked: z.boolean().optional(),
  }),
});

export const userValidation = {
  createUserValidationSchema,
};
