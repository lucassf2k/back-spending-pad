import { Email } from './email';
import { PBKDF2Password } from './pbkdf2-password';
import { User } from './user';

describe('User', () => {
  test('should create a valid user correctly', () => {
    const user = User.create({
      email: new Email('user@mail.com'),
      name: 'Fulano de Tal',
      password: PBKDF2Password.create('password'),
      transactions: [],
    });
    expect(user._id).toBeDefined();
    expect(user.props.email.value).toBe('user@mail.com');
    expect(user.props.name).toBe('Fulano de Tal');
    expect(user.props.password.value).not.toBe('password');
    expect(user.props.password.salt).toBeDefined();
    expect(user.props.password.algorithm).toBe('PBKDF2');
    expect(user.props.transactions).toStrictEqual([]);
  });

  test('should restore a user', () => {
    const user = User.restore('id', {
      email: new Email('user@mail.com'),
      name: 'Fulano de Tal',
      password: PBKDF2Password.create('password'),
      transactions: [],
    });
    expect(user._id).toBe('id');
    expect(user.props.email.value).toBe('user@mail.com');
    expect(user.props.name).toBe('Fulano de Tal');
    expect(user.props.password.value).not.toBe('password');
    expect(user.props.password.salt).toBeDefined();
    expect(user.props.password.algorithm).toBe('PBKDF2');
    expect(user.props.transactions).toStrictEqual([]);
  });
});
