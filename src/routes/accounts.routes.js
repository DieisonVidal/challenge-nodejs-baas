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
    .put('/p2p', Authentication.verifyJWT, controllerAccounts.p2pService)
    

export default accountsRoutes;