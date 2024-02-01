import { unknown, z } from 'zod';

export const createListingSchema = z.object({
  name: z.string().min(6).max(60),
  description: z.string().min(100).max(3000),
  type: z.enum(['PRODUCT', 'SERVICE']),
  price: z.number().min(0).max(100000),
  rental: z.boolean(),
  negotiable: z.boolean(),
  status: z.enum(['PUBLIC', 'PRIVATE']),
  state: z.enum(['NEW', 'LIKE_NEW', 'USED', 'REFURBISHED']),
  category: z.object({
    uuid: z.string().min(1),
    name: z.string().min(2),
  }),
  tags: z.array(z.string().min(2).max(20)),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export const createListingImagesSchema = z.object({
  images: z.array(unknown()).min(0).max(6),
});
