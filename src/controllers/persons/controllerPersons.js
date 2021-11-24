import Person from "../../models/Person.js";
import { v4 as uuidv4 } from 'uuid';


const persons = [];

export const controllerPersons = {

    createPerson(require, response){
        const { cpf } = require.body;

        const personAlreadyExists = persons.some(
            (person) => person.cpf === cpf
        );

        if (personAlreadyExists) {
            response.status(400).json({ error: "person already exists!" })
        } else {

            //const person = new Person();
            const person = ({
                id: uuidv4(),
                cpf,
                created_at: new Date()
            });

            persons.push(person);
            return response.status(201).json(person); //json({sucess: 'Custumer created sucessfuly'});
        }
    },
    showPerson(require, response){
        const arrPersons = [
            { name: 'Dieison', age: 14 },
            { name: 'Jonathan', age: 14.001 }
        ];
    
        response.json(arrPersons);
    }
}
