import { z } from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const signupSchemas = [
  z
    .object({
      email: z.string().email({
        message: 'email',
      }),
      username: z
        .string()
        .min(3, {
          message: 'username.min_length',
        })
        .max(16, {
          message: 'username.max_length',
        }),
      password: z.string().min(8, {
        message: 'password',
      }),
      confirmPassword: z.string().min(8, {
        message: 'password',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'confirmPassword',
      path: ['confirmPassword'],
    }),
  z.object({
    firstName: z
      .string()
      .min(1, {
        message: 'firstName.min_length',
      })
      .max(20, {
        message: 'firstName.max_length',
      }),
    lastName: z
      .string()
      .min(1, {
        message: 'lastName.min_length',
      })
      .max(20, {
        message: 'lastName.max_length',
      }),
    dateOfBirth: z.string(),
    phone: z.string().regex(phoneRegex, {
      message: 'phone',
    }),
  }),
];
export { signupSchemas };
