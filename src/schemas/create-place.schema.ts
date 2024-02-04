import { z } from 'zod';
import { emojiRegex } from '@/constants/emojiRegex';

export const createPlaceSchema = z.object({
  name: z.string().min(6, 'name.min').max(60, 'name.max'),
  icon: z.string().regex(emojiRegex, 'icon'),
  description: z
    .string()
    .min(100, 'description.min')
    .max(3000, 'description.max'),
  status: z.enum(['PUBLIC', 'PRIVATE']),
  category: z.object({
    uuid: z.string().min(1, 'category'),
    name: z.string().min(2, 'category'),
  }),
  tags: z
    .array(z.string().min(3, 'tag.min').max(20, 'tag.max'))
    .max(16, 'tags.max'),
  location: z.object({
    lat: z.number({
      required_error: 'location',
      invalid_type_error: 'location',
    }),
    lng: z.number({
      required_error: 'location',
      invalid_type_error: 'location',
    }),
  }),
});
