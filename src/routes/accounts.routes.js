import express from 'express';
const accountsRoutes = express.Router();
import { controllerAccounts } from '../controllers/accounts/controllerAccounts.js';

accountsRoutes
    .post('/create', controllerAccounts.createAccount)
    .post('/p2p', controllerAccounts.p2pService)

accountsRoutes
    .get('/list', controllerAccounts.listAccounts)
    .get('/show', controllerAccounts.showAccount)
    .get('/balance', controllerAccounts.balance)
    

export default accountsRoutes;