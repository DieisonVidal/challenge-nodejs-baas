import express from 'express';
const accountsRoutes = express.Router();
import { accountsController } from '../controllers/accountsController.js';
import { Authentication } from '../middleware/middlewareAuth.js';
    
    //Accounts POST
accountsRoutes
    .post('/create', accountsController.createAccount)
    
    //Accounts GET
accountsRoutes
    .get('/list', accountsController.listAccounts)
    .get('/show', accountsController.showAccount)
    .get('/balance', accountsController.balance)

    //Accounts DELETE
accountsRoutes
    .delete('/delete', accountsController.deleteAccount)
  
export default accountsRoutes;