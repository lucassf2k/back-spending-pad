import { ApiError } from '@/common/api-error';
import { Transaction, TransactionTypes } from './transaction';
import { StatusCode } from '@/common/status-code';

describe('Transaction', () => {
  test('should create a valid transaction correctly of type INCOME', () => {
    const transaction = Transaction.create({
      title: 'test',
      type: TransactionTypes.INCOME,
      value: 100,
    });
    expect(transaction._id).toBeDefined();
    expect(transaction.props.title).toBe('test');
    expect(transaction.props.type).toBe('INCOME');
    expect(transaction.props.value).toBe(100);
  });

  test('should create a valid transaction correctly of type EXPENSE', () => {
    const transaction = Transaction.create({
      title: 'Test',
      type: TransactionTypes.EXPENSE,
      value: 100,
    });
    expect(transaction._id).toBeDefined();
    expect(transaction.props.title).toBe('Test');
    expect(transaction.props.type).toBe('EXPENSE');
    expect(transaction.props.value).toBe(100);
  });

  test('should restore a transaction', () => {
    const transaction = Transaction.restore('id', {
      title: 'test',
      type: TransactionTypes.INCOME,
      value: 100,
    });
    expect(transaction._id).toBe('id');
    expect(transaction.props.title).toBe('test');
    expect(transaction.props.type).toBe('INCOME');
    expect(transaction.props.value).toBe(100);
  });

  test("should get the type from it's string form", () => {
    expect(Transaction.getType('INCOME')).toBe(TransactionTypes.INCOME);
    expect(Transaction.getType('EXPENSE')).toBe(TransactionTypes.EXPENSE);
  });

  test('should get the transaction type when passing a string as a parameter and should return the corresponding boolean', () => {
    expect(Transaction.typeFromStringToBoolean('INCOME')).toBe(true);
    expect(Transaction.typeFromStringToBoolean('EXPENSE')).toBe(false);
  });

  test('should get the type of the transaction when passing a boolean as a parameter and should return the corresponding type', () => {
    expect(Transaction.typeFromBooleanToString(true)).toBe(
      TransactionTypes.INCOME,
    );
    expect(Transaction.typeFromBooleanToString(false)).toBe(
      TransactionTypes.EXPENSE,
    );
  });

  test('should throw an ApiError of invalid type when passed an invalid string', () => {
    expect(() => Transaction.getType('invalid')).toThrow(
      new ApiError('Transaction type invalid', StatusCode.BAD_REQUEST),
    );
    expect(() => Transaction.typeFromStringToBoolean('invalid')).toThrow(
      new ApiError('Transaction type invalid', StatusCode.BAD_REQUEST),
    );
  });
});
