import express from 'express'
const personsRoutes = express.Router();
import { personsController } from "../controllers/personsController.js";
import { Authentication } from "../middleware/middlewareAuth.js"



personsRoutes
    .post('/register', personsController.createPerson)
    .post('/auth', personsController.authPerson)

personsRoutes
    .get('/show', personsController.showPersonByID)

personsRoutes
    .put('/update', personsController.updatePersonByID)


export default personsRoutes;