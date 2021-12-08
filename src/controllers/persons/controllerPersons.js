import Person from "../../models/Person.js";
import mongodb from "mongodb";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';


export const controllerPersons = {

    async createPerson(request, response) {
        try {
            const { cpf, full_name, email, phone, username, password } = request.body;

            const dataPerson = new Person({
                cpf,
                full_name,
                email,
                phone,
                username,
                password
            });

            const query = await Person.find({});
            const personAlreadyExists = query
                .find(person => person.cpf === cpf || person.username === username);

            if (!personAlreadyExists) {
                const person = await dataPerson.save();
                return response.status(200).json({ succes: "Created successfully!", person });
            } 
            else {
                return response.status(400).json({ message: "Person already exists" });
            }
        } 
        catch (error) {
            return response.status(400).json({ error });
        }
    },

    async updatePersonByID(request, response) {
        try {
            const { id } = request.query;

            const dataPerson = request.body;

            const updatedPerson = await Person.findByIdAndUpdate(id, dataPerson);
        
            response.json(updatedPerson);
        }
        catch (err) {
            response.json({ error: "Person not found" });
        }
    },

    async deletePersonByID(request, response) {
        try {
            const { id } = request.query;
            const deletedPerson = await Person.findByIdAndDelete(id);

            response.json({ message: "Person deleted", deletedPerson });
        } 
        catch {
            response.json({ error: "Person not found" });
        }
    },

    registerDocument(request, response) {

    },

    async listPersons(request, response) {
        try {
            const people = await Person.find({});
            response.json({ people });
        } 
        catch (err) {
            response.json({ error: "People not found!" });
        }
    },

    async showPersonByID(request, response) {
        try {
            const { id } = request.query;
            const person = await Person.findById(id);
        
            response.json(person);
        } 
        catch (err) {
            response.json({ error: "Person not found" })
        }
    },

    async authPerson(request, response){
        try {
            const { cpf, email, password } = request.body;

            const dataPerson = {
                cpf,
                email,
                password
            }
            console.log(dataPerson)

            const { id } = request.query;
            const person = await Person.findById(id);
            console.log(person)

            if(dataPerson.cpf && dataPerson.email && dataPerson.password === 
                person.cpf && person.email && person.password){
                    console.log("é igual sa mizera")
            }
            else{
                console.log("é diferente sa mizera")
            }
           /*  console.log(person) */
            
            /* const authPerson = person
            .find(
                person => person.cpf === cpf || 
                person.email === email || 
                person.password === password
            ); */
           /*  console.log(authPerson) */
            
        }
        catch (err) {

        }
    }
}