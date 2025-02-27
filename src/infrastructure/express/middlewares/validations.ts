import z from 'zod';

export const AuthorizationValidation = z.string({
  required_error: 'header authorization is required',
  invalid_type_error: 'a string is expected',
});
