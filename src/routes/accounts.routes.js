import express from 'express';
const accountsRoutes = express.Router();
import { accountsController } from '../controllers/accountsController.js';
import { Authentication } from '../middleware/middlewareAuth.js';
    
    //Accounts POST
accountsRoutes
    .post('/create', accountsController.createAccount)
    
    //Accounts GET
accountsRoutes
    .get('/show', Authentication.verifyJWT, accountsController.showAccount)
    .get('/balance', Authentication.verifyJWT, accountsController.balance)

  
export default accountsRoutes;