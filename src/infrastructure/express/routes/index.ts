import { Router } from 'express';
import { userRoutes } from '@/infrastructure/express/routes/user-routes';
import { transactionRoutes } from '@/infrastructure/express/routes/transaction-routes';

const routes = Router();
routes.use('/v1/users', userRoutes);
routes.use('/v1/transactions', transactionRoutes);
export { routes };
