import express from 'express'
const personsRoutes = express.Router();
import { controllerPersons } from "../controllers/persons/controllerPersons.js";
import { verifyIfExistsPersonCPF } from "../middleware/middlewareError.js"


personsRoutes
    .post('/register', controllerPersons.createPerson)
    .post('/document', controllerPersons.registerDocument)

personsRoutes
    .get('/list', controllerPersons.listPersons)
    .get('/show', controllerPersons.showPersonByID)

personsRoutes
    .put('/update', controllerPersons.updatePersonByID)

personsRoutes
    .delete('/delete', controllerPersons.deletePersonByID)

export default personsRoutes;