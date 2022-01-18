import express from 'express'
const adminsRoutes = express.Router();
import {adminsController} from '../controllers/adminsController.js'
import {personsController} from '../controllers/personsController.js';
import {accountsController} from '../controllers/accountsController.js'

    
adminsRoutes
    //Admins POST
    .post('/create', adminsController.createAdmin)
    .post('/auth', adminsController.authAdmin)
    //Admins GET
    .get('/list', adminsController.listAdmins)

    
adminsRoutes
    //Person GET
    .get('/list-persons', personsController.listPersons)
    .get('/show-person', personsController.showPersonByID)
    //Persons PUT
    .put('/update-person', personsController.updatePersonByID)
    //Persons DELETE
    .delete('/delete-person', personsController.deletePersonByID)

    
adminsRoutes
    //Accounts GET
    .get('/list-accounts', accountsController.listAccounts)
    .get('/show-account', accountsController.showAccount)
    //Persons DELETE
    .delete('/delete-account', accountsController.deleteAccount)


export default adminsRoutes