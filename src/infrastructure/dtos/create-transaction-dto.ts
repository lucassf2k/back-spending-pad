import { z } from 'zod';

export const CreateTransactionValidation = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'A string is expected',
    })
    .min(1, 'Title must have at least 1 character'),
  value: z.number({
    required_error: 'Transaction value is required',
    invalid_type_error: 'A number is expected',
  }),
  type: z.boolean({
    required_error: 'Transaction type is required',
    invalid_type_error: 'A boolean is expected',
  }),
});

export type CreateTransactionDTO = z.infer<
  typeof CreateTransactionValidation
> & { userId: string };
