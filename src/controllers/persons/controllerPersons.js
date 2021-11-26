import Person from "../../models/Person.js";
import { v4 as uuidv4 } from 'uuid';


export const persons = [];

export const controllerPersons = {

    createPerson(request, response){
        const { cpf } = request.body;

        const personAlreadyExists = persons.some(
            (person) => person.cpf === cpf
        );

        if (personAlreadyExists) {
            response.status(400).json({ error: "Person already exists!" })
        } else {

            //const person = new Person();
            const person = ({
                person_id: uuidv4(),
                cpf,
                created_at: new Date()
            });

            persons.push(person);
            return response.status(201).json(person); 
        }
    },

    listPersons(request, response){
        if (persons == null || persons == "") {
            return response.json({error: "Persons not found!"})
        }
        else{
            return response.json(persons);
        }
    },

    showPersonByCPF(request, response){
        const { person } = request;    
        response.json(person);
    }
}
