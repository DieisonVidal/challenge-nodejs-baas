import Person from "../../models/Person.js";
import { v4 as uuidv4 } from 'uuid';


export const persons = [];

export const controllerPersons = {

    async createPerson(request, response) {

        const { cpf, full_name, email, phone, username, password } = request.body;
        
         {
            try {
                const personAlreadyExists = await Person.findBy("cpf", cpf)
                console.log(personAlreadyExists)
                 if (!personAlreadyExists) {
                response.status(400).json({ error: "Person already exists!" });
                } else{ 

                }

                const person = new Person({
                    cpf,
                    full_name,
                    email,
                    phone,
                    username,
                    password
                });
                const data = await person.save();
                
                if (data) {
                    return response.status(200).json({ succes: "Created successfully!" });
                }
            } catch (error) {
                return response.status(400).json({ error });
            }
        }

        

        // const personAlreadyExists = persons.some(
        //     (person) => person.cpf === cpf
        // );

        // if (personAlreadyExists) {
        //     response.status(400).json({ error: "Person already exists!" });
        // } else {

        //     //const person = new Person();
        //     const person = ({
        //         person_id: uuidv4(),
        //         cpf,
        //         register_person: [],
        //         created_at: new Date()
        //     });

        //     persons.push(person);
        //     return response.status(201).json(person); 
        // }
    },

   /*  registerPerson(request, response) {
        const { full_name, username, email, phone } = request.body;

        const { person } = request;

        const register_person = ({
            full_name,
            username,
            email,
            phone
        });

        person.register_person.push(register_person);
        return response.status(201).json(person);
    }, */

    registerDocument(request, response) {

    },

    async listPersons(request, response) {
        try{
            const people = await Person.find({});
            response.json({people});
        } catch (err) {
            response.json({error: "People not found!"});
        }
        /* if (persons == null || persons == "") {
            return response.json({ error: "Persons not found!" })
        } else {
            return response.json(persons);
        } */
    },

    async showPersonByID(request, response) {
        try{
            const { id } = request.query;
           
            const person = await Person.findById(id);
            
            response.json(person);
        } catch (err) {
            response.json({error: "Person not found"})
        }
    }
}