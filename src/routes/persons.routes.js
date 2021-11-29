import express, { request } from 'express'
const personsRoutes = express.Router();
import { controllerPersons, persons } from "../controllers/persons/controllerPersons.js";
import { verifyIfExistsPersonCPF } from "../middleware/middlewareError.js"

personsRoutes.post('/register', controllerPersons.createPerson);

personsRoutes.post('/registers', verifyIfExistsPersonCPF, controllerPersons.registerPerson);

personsRoutes.post('/document', controllerPersons.registerDocument);

personsRoutes.get('/list', controllerPersons.listPersons);

personsRoutes.get('/show', verifyIfExistsPersonCPF, controllerPersons.showPersonByCPF);

export default personsRoutes;