import z from 'zod'

export const SignInValidation = z.object({
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
      invalid_type_error: 'Espera-se uma string',
    })
    .email('E-mail inválido'),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
      invalid_type_error: 'Espera-se uma string',
    })
    .min(8, 'Senha precisa ter no mínimo 8 caracteres'),
})

export type SignInDTO = z.infer<typeof SignInValidation>
