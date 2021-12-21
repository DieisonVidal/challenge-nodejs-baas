import express from 'express'
const personsRoutes = express.Router();
import { controllerPersons } from "../controllers/persons/controllerPersons.js";
import { Authentication } from "../middleware/middlewareAuth.js"



personsRoutes
    .post('/register', controllerPersons.createPerson)
    .post('/auth', controllerPersons.authPerson)

personsRoutes
    .get('/list', Authentication.verifyJWT, controllerPersons.listPersons)
    .get('/show', controllerPersons.showPersonByID)

personsRoutes
    .put('/update', controllerPersons.updatePersonByID)

personsRoutes
    .delete('/delete', controllerPersons.deletePersonByID)

export default personsRoutes;