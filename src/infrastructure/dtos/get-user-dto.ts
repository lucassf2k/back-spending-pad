import { z } from 'zod'

export const GetUserValidation = z.object({
  id: z.string({ required_error: 'ID é obrigatório' }).uuid('UUID inválido'),
})

export type GetUserDTO = z.infer<typeof GetUserValidation>
