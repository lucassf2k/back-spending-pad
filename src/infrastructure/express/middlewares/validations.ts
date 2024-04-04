import z from 'zod'

export const AuthorizationValidation = z.string({
  required_error: 'header authorization é obrigatório',
  invalid_type_error: 'espera-se uma string',
})
