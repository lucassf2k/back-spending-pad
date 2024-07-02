import { z } from 'zod';

export const GetUserOfIdValidation = z.object({
  id: z
    .string({ required_error: 'ID do usuário é obrigatório' })
    .uuid('UUID inválido'),
});

export type GetUserOfIdDTO = z.infer<typeof GetUserOfIdValidation>;
