import express from 'express'
const personsRoutes = express.Router();
import { controllerPersons } from "../controllers/persons/controllerPersons.js";
import { verifyJWT } from "../middleware/middlewareError.js"


personsRoutes
    .post('/register', controllerPersons.createPerson)
    .post('/auth', controllerPersons.authPerson)

personsRoutes
    .get('/list', verifyJWT, controllerPersons.listPersons)
    .get('/show', controllerPersons.showPersonByID)

personsRoutes
    .put('/update', controllerPersons.updatePersonByID)

personsRoutes
    .delete('/delete', controllerPersons.deletePersonByID)

export default personsRoutes;