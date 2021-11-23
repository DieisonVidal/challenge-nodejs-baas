import express from 'express'
const individualRoutes = express.Router();
import { getIndividuals } from "../controllers/individual/controllerIndividuals.js";
import { list } from '../controllers/individual/index.js';
import { v4 as uuidv4 } from 'uuid'

const individuals = [];

const verifyIfExistsIndividualCPF = (req, res, next) => {
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

individualRoutes.post('/create', (req, res) => {
    const { cpf } = req.body;

    const individualAlreadyExists = individuals.some(
        (individual) => individual.cpf === cpf
    );

    if (individualAlreadyExists) {
        res.status(400).json({ error: "Individual already exists!" })
    } else {
        const individual = ({
            id: uuidv4(),
            cpf,
            created_at: new Date()
        });

        individuals.push(individual);
        return res.status(201).json(individual); //json({sucess: 'Custumer created sucessfuly'});
    }

});

individualRoutes.get('/show', getIndividuals);
// individualRoutes.get('/show', verifyIfExistsIndividualCPF, (req, res) => {
/* individualRoutes.get('/show', (request, response) => {
    console.log(request.query)
    console.log('chamou o show na rota...')
    response.json(list());
    // const { individual } = req;
    // return res.json(individual);
}); */

individualRoutes.get('/list', (req, res) => {
    return res.json(individuals);
});

export default individualRoutes;