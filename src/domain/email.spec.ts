import { Email } from './email';

describe('Email', () => {
  test('should create a valid email correctly', () => {
    const email = new Email('user@domain.com');
    expect(email.value).toBe('user@domain.com');
  });

  test('should throw an error for email without "@" symbol', () => {
    expect(() => new Email('userdomain.com')).toThrow('Invalid email');
  });

  test('should throw an error for email missing part before "@"', () => {
    expect(() => new Email('@domain.com')).toThrow('Invalid email');
  });

  test('should throw an error for email missing part after "@"', () => {
    expect(() => new Email('user@')).toThrow('Invalid email');
  });

  test('should throw an error for empty string', () => {
    expect(() => new Email('')).toThrow('Invalid email');
  });

  test('should accept emails with subdomains', () => {
    const email = new Email('user@mail.domain.com');
    expect(email.value).toBe('user@mail.domain.com');
  });
});
