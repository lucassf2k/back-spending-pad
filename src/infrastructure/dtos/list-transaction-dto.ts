import z from 'zod';

export const ListTransactionValidation = z.object({
  userId: z
    .string({ required_error: 'ID do usuário é obrigatório' })
    .uuid('UUID inválido'),
  page: z
    .number({ invalid_type_error: 'Espera-se um inteiro' })
    .int('O skip deve ser inteiro')
    .nonnegative('skip não poder ser negativo'),
  pageSize: z
    .number({ invalid_type_error: 'Espera-se um inteiro' })
    .int('O take deve ser inteiro')
    .optional(),
});

export type ListTransactionDTO = z.infer<typeof ListTransactionValidation>;
