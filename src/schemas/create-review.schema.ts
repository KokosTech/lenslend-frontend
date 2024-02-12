import { z } from 'zod';

export const CreateReviewSchema = z.object({
  content: z.optional(
    z
      .string()
      .min(3, {
        message: 'errors.min_length',
      })
      .max(480, {
        message: 'errors.max_length',
      })
      .refine((val) => val.trim().length > 3, {
        message: 'errors.min_length',
      }),
  ),
  rating: z
    .number()
    .min(1, {
      message: 'errors.min',
    })
    .max(5, {
      message: 'errors.max',
    })
    .refine((val) => val % 1 === 0, {
      message: 'errors.integer',
    }),
});
