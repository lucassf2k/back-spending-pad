import { z } from 'zod';

export const CreateUserValidation = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }).min(1),
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .email('E-mail inválido'),
  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(8, 'Senha dever ter no mínimo 8 caracteres'),
});

export type CreateUserDTO = z.infer<typeof CreateUserValidation>;
