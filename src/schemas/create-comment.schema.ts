import { z } from 'zod';

export const CreateCommentSchema = z.object({
  content: z
    .string()
    .min(3, {
      message: 'errors.min_length',
    })
    .max(240, {
      message: 'errors.max_length',
    })
    .refine((val) => val.trim().length > 3, {
      message: 'errors.min_length',
    }),
});
