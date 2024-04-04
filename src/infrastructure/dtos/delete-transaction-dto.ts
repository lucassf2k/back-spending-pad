import { z } from 'zod'

export const DeleteTransactionValidation = z.object({
  id: z
    .string({ required_error: 'ID do usuário é obrigatório' })
    .uuid('UUID inválido'),
})

export type DeleteTransactionDTO = z.infer<typeof DeleteTransactionValidation>
