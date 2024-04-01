import { z } from 'zod'

export const CreateUserValidation = z.object({
  name: z.string({ required_error: 'nome é obrigatório' }).min(1),
  email: z
    .string({ required_error: 'e-mail é obrigatório' })
    .email('e-mail inválido'),
  password: z
    .string({ required_error: 'senha é obrigatória' })
    .min(8, 'senha dever ter no mínimo 8 caracteres'),
})

export type CreateUserDTO = z.infer<typeof CreateUserValidation>
