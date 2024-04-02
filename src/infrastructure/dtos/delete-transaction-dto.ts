import { z } from 'zod'

export const DeleteTransactionValidation = z.object({
  id: z.string({ required_error: 'ID é obrigatório' }).uuid('UUID inválido'),
})

export type DeleteTransactionDTO = z.infer<typeof DeleteTransactionValidation>
