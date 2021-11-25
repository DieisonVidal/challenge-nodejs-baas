import express from 'express';
const accountsRoutes = express.Router();
import { controllerAccounts } from '../controllers/accounts/controllerAccounts.js';

accountsRoutes.post('/create', controllerAccounts.createAccount)

accountsRoutes.get('/list', controllerAccounts.listAccounts);

accountsRoutes.get('/show', controllerAccounts.showAccount);

export default accountsRoutes;