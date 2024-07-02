import { z } from 'zod';

export const UpdateTransactionValidation = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    title: z.string().optional(),
    value: z.number().optional(),
    type: z.boolean().optional(),
  }),
});

export type UpdateTransactionDTO = z.infer<typeof UpdateTransactionValidation>;
