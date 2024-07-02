import { z } from 'zod';

export const GetTransactionValidation = z.object({
  id: z
    .string({ required_error: 'ID do usuário é obrigatório' })
    .uuid('UUID inválido'),
});

export type GetTransactionDTO = z.infer<typeof GetTransactionValidation>;
