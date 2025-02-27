import { CreateTransaction } from '@/application/use-case/create-transaction';
import { IController } from '@/infrastructure/express/controllers/icontoller';
import { CreateTransactionController } from '@/infrastructure/express/controllers/create-transaction-controller';
import { PrismaTransactionRepository } from '@/infrastructure/repositories/prisma/prisma-transaction-repository';
import { ListTransactionController } from '@/infrastructure/express/controllers/list-transaction-controller';
import { ListTransaction } from '@/application/use-case/list-transaction';
import { GetTransactionController } from '@/infrastructure/express/controllers/get-transaction-controller';
import { GetTransaction } from '@/application/use-case/get-transaction';
import { PrismaUserRepository } from '@/infrastructure/repositories/prisma/prisma-user-repository';
import { DeleteTransactionController } from '@/infrastructure/express/controllers/delete-transaction-controller';
import { DeleteTransaction } from '@/application/use-case/delete-transaction';
import { UpdateTransactionController } from '@/infrastructure/express/controllers/update-transaction-controller';
import { UpdateTransaction } from '@/application/use-case/update-transaction';

const transactionRepository = new PrismaTransactionRepository();

export function createTransactionControllerFactory(): IController {
  const userRepository = new PrismaUserRepository();
  const createTransaction = new CreateTransaction(
    transactionRepository,
    userRepository,
  );
  return new CreateTransactionController(createTransaction);
}

export function listTransactionControllerFactory(): IController {
  const listTransaction = new ListTransaction(transactionRepository);
  return new ListTransactionController(listTransaction);
}

export function getTransactionControllerFactory(): IController {
  const getTransaction = new GetTransaction(transactionRepository);
  return new GetTransactionController(getTransaction);
}

export function deleteTransactionControllerFactory(): IController {
  const deleteTransaction = new DeleteTransaction(transactionRepository);
  return new DeleteTransactionController(deleteTransaction);
}

export function updateTransactionControllerFactory(): IController {
  const updateTransaction = new UpdateTransaction(transactionRepository);
  return new UpdateTransactionController(updateTransaction);
}
