import express from 'express'
const personsRoutes = express.Router();
import { personsController } from "../controllers/personsController.js";
import { Authentication } from "../middleware/middlewareAuth.js"



personsRoutes
    .post('/register', personsController.createPerson)
    .post('/auth', personsController.authPerson)

personsRoutes
    .get('/show', Authentication.verifyJWT, personsController.showPersonByID)

personsRoutes
    .put('/update', Authentication.verifyJWT, personsController.updatePersonByID)


export default personsRoutes;