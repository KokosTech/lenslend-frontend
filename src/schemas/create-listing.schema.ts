import { unknown, z } from 'zod';

export const createListingSchema = z.object({
  name: z.string().min(6, 'name.min').max(60, 'name.max'),
  description: z
    .string()
    .min(100, 'description.min')
    .max(3000, 'description.max'),
  type: z.enum(['PRODUCT', 'SERVICE']),
  price: z
    .number({
      required_error: 'price',
      invalid_type_error: 'price',
    })
    .min(0, 'price')
    .max(100000, 'price'),
  rental: z.boolean(),
  negotiable: z.boolean(),
  status: z.enum(['PUBLIC', 'PRIVATE']),
  state: z.enum(['NEW', 'LIKE_NEW', 'USED', 'REFURBISHED']),
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

export const createListingImagesSchema = z
  .array(unknown())
  .min(1, 'images.min')
  .max(6, 'images.max');
