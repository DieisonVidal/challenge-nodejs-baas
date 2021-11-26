import express from 'express'
const personsRoutes = express.Router();
import { controllerPersons } from "../controllers/persons/controllerPersons.js";
import { verifyIfExistsPersonCPF } from "../middleware/middlewareError.js"

personsRoutes.post('/create', controllerPersons.createPerson);

personsRoutes.get('/list', controllerPersons.listPersons);

personsRoutes.get('/show', verifyIfExistsPersonCPF, controllerPersons.showPersonByCPF);

export default personsRoutes;