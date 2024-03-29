import { z } from 'zod'
import { TransactionTypes } from '../../domain/transaction'

export const CreateTransactionValidation = z.object({
  value: z.number({ required_error: 'valor é obrigatório' }),
  type: z.nativeEnum(TransactionTypes),
  description: z.string().optional(),
})

export type CreateTransactionDTO = z.infer<typeof CreateTransactionValidation>
