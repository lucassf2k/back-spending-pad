import { z } from 'zod';

export const GetUserOfIdValidation = z.object({
  id: z.string({ required_error: 'User ID is required' }).uuid('Invalid UUID'),
});

export type GetUserOfIdDTO = z.infer<typeof GetUserOfIdValidation>;
