import { z } from 'zod';

export const GetTransactionValidation = z.object({
  id: z.string({ required_error: 'User ID is required' }).uuid('Invalid UUID'),
});

export type GetTransactionDTO = z.infer<typeof GetTransactionValidation>;
