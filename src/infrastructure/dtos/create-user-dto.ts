import { z } from 'zod'

export type CreateUserDTO = {
  name: string
  email: string
  password: string
}

export const CreateUserValidation = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})
