import express from 'express'
const personsRoutes = express.Router();
import { controllerPersons } from "../controllers/persons/controllerPersons.js";
import { verifyIfExistsPersonCPF } from "../middleware/middlewareError.js"


personsRoutes
    .post('/register', controllerPersons.createPerson)
    .post('/registers', verifyIfExistsPersonCPF, controllerPersons.registerPerson)
    .post('/document', controllerPersons.registerDocument)

personsRoutes
    .get('/list', controllerPersons.listPersons)
    .get('/show/:id', verifyIfExistsPersonCPF, controllerPersons.showPersonByCPF);

export default personsRoutes;