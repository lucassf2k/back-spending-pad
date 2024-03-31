import { z } from 'zod'

export const GetUserValidation = z.object({
  id: z.string().uuid('id é obrigatório'),
})

export type GetUserDTO = z.infer<typeof GetUserValidation>
