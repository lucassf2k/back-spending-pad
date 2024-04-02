import { z } from 'zod'
import { TransactionTypes } from '../../domain/transaction'

export const CreateTransactionValidation = z.object({
  userId: z
    .string({ required_error: 'userId é obrigatório' })
    .uuid('UUID inválido'),
  title: z.string({ required_error: 'titulo é obrigatótio' }).min(1),
  value: z.number({ required_error: 'valor é obrigatório' }),
  type: z.nativeEnum(TransactionTypes, {
    required_error: 'tipo de transacação é obrigatório',
  }),
})

export type CreateTransactionDTO = z.infer<typeof CreateTransactionValidation>
