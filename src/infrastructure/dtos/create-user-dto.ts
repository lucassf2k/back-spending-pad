import { z } from 'zod'

export const CreateUserValidation = z.object({
  name: z.string().min(1, 'nome é obrigatório'),
  email: z.string().email('e-mail é obrigatório'),
  password: z.string().min(8, 'senha é no minímo 8 caracteres'),
})

export type CreateUserDTO = z.infer<typeof CreateUserValidation>
