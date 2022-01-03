import express from 'express';
const accountsRoutes = express.Router();
import { controllerAccounts } from '../controllers/accounts/controllerAccounts.js';
import { Authentication } from '../middleware/middlewareAuth.js';

accountsRoutes
    .post('/create', controllerAccounts.createAccount)

accountsRoutes
    .get('/list', controllerAccounts.listAccounts)
    .get('/show', controllerAccounts.showAccount)
    .get('/balance', controllerAccounts.balance)

accountsRoutes
    .delete('/delete', controllerAccounts.deleteAccount)
  
export default accountsRoutes;