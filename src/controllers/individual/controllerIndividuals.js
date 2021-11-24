import Individual from "../../models/Individual.js";
import { v4 as uuidv4 } from 'uuid';

const individuals = [];

export const controllerIndividuals = {

    createIndividual(require, response){
        const { cpf } = require.body;

        const individualAlreadyExists = individuals.some(
            (individual) => individual.cpf === cpf
        );

        if (individualAlreadyExists) {
            response.status(400).json({ error: "Individual already exists!" })
        } else {
            const individual = ({
                id: uuidv4(),
                cpf,
                created_at: new Date()
            });

            individuals.push(individual);
            return response.status(201).json(individual); //json({sucess: 'Custumer created sucessfuly'});
        }
    },
    showIndividual(require, response){
        const arrIndividuals = [
            { name: 'Dieison', age: 14 },
            { name: 'Jonathan', age: 14.001 }
        ];
    
        response.json(arrIndividuals);
    }
}

/* export const createIndividual = (require, response)=>{
    const { cpf } = require.body;

    const individualAlreadyExists = individuals.some(
        (individual) => individual.cpf === cpf
    );

    if (individualAlreadyExists) {
        response.status(400).json({ error: "Individual already exists!" })
    } else {
        const individual = ({
            id: uuidv4(),
            cpf,
            created_at: new Date()
        });

        individuals.push(individual);
        return response.status(201).json(individual); //json({sucess: 'Custumer created sucessfuly'});
    }

}

export const showIndividuals = (require, response)=>{
 
    const arrIndividuals = [
        { name: 'Dieison', age: 14 },
        { name: 'Jonathan', age: 14.001 }
    ];

    response.json(arrIndividuals);
}; */
