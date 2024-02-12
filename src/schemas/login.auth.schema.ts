import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({
    message: 'errors.invalid_email',
  }),
  password: z.string().min(8, {
    message: 'errors.min_length',
  }),
});
