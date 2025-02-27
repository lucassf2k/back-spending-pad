import { PBKDF2Password } from '@/domain/pbkdf2-password';

export type MakePasswordOutput = typeof PBKDF2Password;

export function makePassword(algorithm: string): MakePasswordOutput {
  if (algorithm === 'PBKDF2') return PBKDF2Password;
  throw new Error('Algorithm used in the password is not implemented');
}
