import { Email } from '@/domain/email';

test('', () => {
  const name = new Email('mail@mail.com');
  expect(name.value).toBe('email@email');
});
