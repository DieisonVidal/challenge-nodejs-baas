import express from 'express';
const transactionsRoutes = express.Router();
import { transactionsController } from '../controllers/transactionsController.js';
import { Authentication } from '../middleware/middlewareAuth.js';

transactionsRoutes
    .post('/P2P', Authentication.verifyJWT, transactionsController.transactionP2P);


export default transactionsRoutes;