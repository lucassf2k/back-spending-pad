import { z } from 'zod';

export const CreateTransactionValidation = z.object({
  title: z
    .string({
      required_error: 'Titulo é obrigatótio',
      invalid_type_error: 'Espera-se uma string',
    })
    .min(1, 'Título necessita de no mínimo 1 caractere'),
  value: z.number({
    required_error: 'Valor da transação é obrigatório',
    invalid_type_error: 'Espara-se um number',
  }),
  type: z.boolean({
    required_error: 'Tipo de transacação é obrigatório',
    invalid_type_error: 'Espera-se um boolean',
  }),
});

export type CreateTransactionDTO = {
  userId: string;
  title?: string;
  value?: number;
  type?: boolean;
};
