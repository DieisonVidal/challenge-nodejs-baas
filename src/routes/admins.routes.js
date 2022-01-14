import express from 'express'
const adminsRoutes = express.Router();
import {adminsController} from '../controllers/adminsController.js'
import {personsController} from '../controllers/personsController.js';
import {accountsController} from '../controllers/accountsController.js'

    //Admins POST
adminsRoutes
    .post('/create', adminsController.createAdmin)
    .post('/auth', adminsController.authAdmin)
    //Admins GET
    .get('/list', adminsController.listAdmins)

    //Person GET
adminsRoutes
    .get('/list-persons', personsController.listPersons)
    .get('/show-person', personsController.showPersonByID)
    //Persons PUT
    .put('/update-person', personsController.updatePersonByID)
    //Persons DELETE
    .delete('/delete-person', personsController.deletePersonByID)

    //Accounts GET
adminsRoutes
    .get('/list-accounts', accountsController.listAccounts)

export default adminsRoutes