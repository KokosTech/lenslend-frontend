import { unknown, z } from 'zod';

export const createImagesSchema = z
  .array(unknown())
  .min(1, 'images.min')
  .max(6, 'images.max');
