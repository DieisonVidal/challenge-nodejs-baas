import express from 'express';
const transactionsRoutes = express.Router();
import { controllerTransactions } from '../controllers/transactions/controllerTransactions.js';
import { Authentication } from '../middleware/middlewareAuth.js';

transactionsRoutes
    .post('/P2P', Authentication.verifyJWT,controllerTransactions.transactionP2P);

transactionsRoutes
    .get('/list-transaction', controllerTransactions.listTransaction);

export default transactionsRoutes;