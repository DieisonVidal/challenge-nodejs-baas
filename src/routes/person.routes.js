import express from 'express'
const personRoutes = express.Router();
import { controllerPersons } from "../controllers/individual/controllerPersons.js";

const verifyIfExistsPersonCPF = (req, res, next) => {
    //desestruturação atraves do headers para obter o cpf do cliente
    const { cpf } = req.headers;

    // Verificando no Array de individuals/clientes se existe algum cliente com o cpf informado. 
    const individual = individuals.find(individual => individual.cpf === cpf);

    if (!individual) {
        return res.status(400).json({ error: "Individual not found" });
    }
    // Inserindo info dentro do req(request)
    req.individual = individual;

    return next();
}

personRoutes.post('/create', controllerPersons.createPerson);

personRoutes.get('/show', controllerPersons.showPerson);

personRoutes.get('/list', (req, res) => {
    return res.json(individuals);
});

export default personRoutes;