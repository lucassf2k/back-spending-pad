import z from 'zod';

export const SignInValidation = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'A string is expected',
    })
    .email('Invalid email'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'A string is expected',
    })
    .min(8, 'Password must have at least 8 characters'),
});

export type SignInDTO = z.infer<typeof SignInValidation>;
