import { z } from 'zod'

export const DeleteTransactionValidation = z.object({
  id: z.string().uuid('id é obrigatório'),
})

export type DeleteTransactionDTO = z.infer<typeof DeleteTransactionValidation>
