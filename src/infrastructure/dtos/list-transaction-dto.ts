import z from 'zod';

export const ListTransactionValidation = z.object({
  userId: z
    .string({ required_error: 'User ID is required' })
    .uuid('Invalid UUID'),
  page: z
    .number({ invalid_type_error: 'An integer is expected' })
    .int('Skip must be an integer')
    .nonnegative('Skip cannot be negative'),
  pageSize: z
    .number({ invalid_type_error: 'An integer is expected' })
    .int('Take must be an integer')
    .optional(),
});

export type ListTransactionDTO = z.infer<typeof ListTransactionValidation>;
