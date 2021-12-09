import express from 'express';
const accountsRoutes = express.Router();
import { controllerAccounts } from '../controllers/accounts/controllerAccounts.js';
import { verifyIfExistsPersonCPF } from '../middleware/middlewareError.js'

accountsRoutes
    .post('/create', controllerAccounts.createAccount);

accountsRoutes
    .get('/list', controllerAccounts.listAccounts);

accountsRoutes
    .get('/show', controllerAccounts.showAccount);

export default accountsRoutes;