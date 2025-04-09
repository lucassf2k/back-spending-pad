import { pbkdf2Sync } from 'node:crypto';
import { PBKDF2Password } from './pbkdf2-password';

describe('PBKDF2Password', () => {
  const rawPassword = 'secure-password';

  test('should create a hashed password and a salt', () => {
    const hashed = PBKDF2Password.create(rawPassword);

    expect(hashed).toBeInstanceOf(PBKDF2Password);
    expect(typeof hashed.value).toBe('string');
    expect(typeof hashed.salt).toBe('string');
    expect(hashed.value.length).toBeGreaterThan(0);
    expect(hashed.salt.length).toBeGreaterThan(0);
  });

  test('should validate the correct password', () => {
    const password = PBKDF2Password.create(rawPassword);
    const isValid = password.validate(rawPassword);

    expect(isValid).toBe(true);
  });

  test('should not validate an incorrect password', () => {
    const password = PBKDF2Password.create(rawPassword);
    const isValid = password.validate('wrong-password');

    expect(isValid).toBe(false);
  });

  test('should restore a password and validate it correctly', () => {
    const original = PBKDF2Password.create(rawPassword);

    const restored = PBKDF2Password.restore(original.value, original.salt);

    expect(restored.validate(rawPassword)).toBe(true);
    expect(restored.validate('wrong-password')).toBe(false);
  });

  test('should use PBKDF2 algorithm with correct parameters', () => {
    const password = 'my-password';
    const salt = 'my-salt';
    const expectedHash = pbkdf2Sync(password, salt, 100, 64, 'sha512').toString(
      'hex',
    );

    const restored = PBKDF2Password.restore(expectedHash, salt);
    expect(restored.validate(password)).toBe(true);
  });

  test('should have algorithm name "PBKDF2"', () => {
    const hashed = PBKDF2Password.create('test');
    expect(hashed.algorithm).toBe('PBKDF2');
  });
});
