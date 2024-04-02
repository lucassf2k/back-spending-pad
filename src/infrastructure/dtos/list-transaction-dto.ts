import z from 'zod'

export const ListTransactionValidation = z.object({
  userId: z
    .string({ required_error: 'ID do usuário é obrigatório' })
    .uuid('UUID inválido'),
})

export type ListTransactionDTO = z.infer<typeof ListTransactionValidation>
