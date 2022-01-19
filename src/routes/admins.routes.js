import express from 'express'
const adminsRoutes = express.Router();
import {adminsController} from '../controllers/adminsController.js'
import {personsController} from '../controllers/personsController.js';
import {accountsController} from '../controllers/accountsController.js'
import { transactionsController } from '../controllers/transactionsController.js';
import { Authentication } from '../middleware/middlewareAuth.js';

//Admins
adminsRoutes
    //POST
    .post('/create', adminsController.createAdmin)
    .post('/auth', adminsController.authAdmin)
    //GET
    .get('/list', Authentication.verifyJWT, adminsController.listAdmins)

//Persons
adminsRoutes
    //GET
    .get('/list-persons', Authentication.verifyJWT, personsController.listPersons)
    .get('/show-person', Authentication.verifyJWT, personsController.showPersonByID)
    //PUT
    .put('/update-person', Authentication.verifyJWT, personsController.updatePersonByID)
    //DELETE
    .delete('/delete-person', Authentication.verifyJWT, personsController.deletePersonByID)

//Accounts
adminsRoutes
    //GET
    .get('/list-accounts', Authentication.verifyJWT, accountsController.listAccounts)
    .get('/show-account', Authentication.verifyJWT, accountsController.showAccount)
    .get('/balance', Authentication.verifyJWT, accountsController.balance)
    //DELETE
    .delete('/delete-account', Authentication.verifyJWT, accountsController.deleteAccount)

//Transactions
adminsRoutes
    //GET
    .get('/list-transactions', Authentication.verifyJWT, transactionsController.listTransaction)


export default adminsRoutes