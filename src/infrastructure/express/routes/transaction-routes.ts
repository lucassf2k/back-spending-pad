import { Router, type Request, type Response } from 'express';
import {
  createTransactionControllerFactory,
  deleteTransactionControllerFactory,
  getTransactionControllerFactory,
  listTransactionControllerFactory,
  updateTransactionControllerFactory,
} from '../../../main/factories/transaction-factories';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';

const transactionRoutes = Router();
transactionRoutes.post(
  '/',
  authenticationMiddleware,
  (request: Request, response: Response) => {
    createTransactionControllerFactory().handle(request, response);
  },
);
transactionRoutes.get(
  '/',
  authenticationMiddleware,
  (request: Request, response: Response) => {
    listTransactionControllerFactory().handle(request, response);
  },
);
transactionRoutes.get(
  '/:id',
  authenticationMiddleware,
  (request: Request, response: Response) => {
    getTransactionControllerFactory().handle(request, response);
  },
);
transactionRoutes.delete(
  '/:id',
  authenticationMiddleware,
  (request: Request, response: Response) => {
    deleteTransactionControllerFactory().handle(request, response);
  },
);
transactionRoutes.put(
  '/:id',
  authenticationMiddleware,
  (request: Request, response: Response) => {
    updateTransactionControllerFactory().handle(request, response);
  },
);
export { transactionRoutes };
