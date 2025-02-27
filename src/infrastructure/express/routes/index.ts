import { Router } from 'express';
import { userRoutes } from '@/infrastructure/express/routes/user-routes';
import { transactionRoutes } from '@/infrastructure/express/routes/transaction-routes';

const routes = Router();
routes.use('/users', userRoutes);
routes.use('/transactions', transactionRoutes);
export { routes };
