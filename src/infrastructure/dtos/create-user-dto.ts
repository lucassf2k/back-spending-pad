import { z } from 'zod';

export const CreateUserValidation = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must have at least 8 characters'),
});

export type CreateUserDTO = z.infer<typeof CreateUserValidation>;
