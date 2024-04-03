import { z } from 'zod'

export const CreateTransactionValidation = z.object({
  userId: z
    .string({
      required_error: 'userId é obrigatório',
      invalid_type_error: 'espera-se uma string',
    })
    .uuid('UUID inválido'),
  title: z
    .string({
      required_error: 'titulo é obrigatótio',
      invalid_type_error: 'espera-se uma string',
    })
    .min(1, 'título necessita de no mínimo 1 caractere'),
  value: z.number({
    required_error: 'valor é obrigatório',
    invalid_type_error: 'espara-se um number',
  }),
  type: z.boolean({
    required_error: 'tipo de transacação é obrigatório',
    invalid_type_error: 'espera-se um boolean',
  }),
})

export type CreateTransactionDTO = z.infer<typeof CreateTransactionValidation>
