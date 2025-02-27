import { z } from 'zod';

export const DeleteTransactionValidation = z.object({
  id: z.string({ required_error: 'User ID is required' }).uuid('Invalid UUID'),
});

export type DeleteTransactionDTO = z.infer<typeof DeleteTransactionValidation>;
