import express from 'express'
const personsRoutes = express.Router();
import { personsController } from "../controllers/personsController.js";
import { Authentication } from "../middleware/middlewareAuth.js"

    //Persons POST
personsRoutes
    .post('/register', personsController.createPerson)
    .post('/auth', personsController.authPerson)

    //Persons GET
personsRoutes
    .get('/show', Authentication.verifyJWT, personsController.showPersonByID)

    //Persons PUT
personsRoutes
    .put('/update', Authentication.verifyJWT, personsController.updatePersonByID)


export default personsRoutes;