import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { IPassword } from '@/domain/ipassword';

export class PBKDF2Password implements IPassword {
  readonly algorithm = 'PBKDF2';

  private constructor(
    readonly value: string,
    readonly salt: string,
  ) {}

  static create(password: string): PBKDF2Password {
    const salt = randomBytes(20).toString('hex');
    const value = pbkdf2Sync(password, salt, 100, 64, 'sha512').toString('hex');
    return new PBKDF2Password(value, salt);
  }

  static restore(password: string, salt: string): PBKDF2Password {
    return new PBKDF2Password(password, salt);
  }

  validate(password: string): boolean {
    const passwordToValidate = pbkdf2Sync(
      password,
      this.salt,
      100,
      64,
      'sha512',
    ).toString('hex');
    return this.value === passwordToValidate;
  }
}
