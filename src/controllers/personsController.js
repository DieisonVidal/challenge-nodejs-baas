import Person from "../models/Person.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {authConfig} from "../config/auth-config.js"
import {personsService} from "../services/personsService.js"


export const personsController = {

    async createPerson(request, response) {
        try {
            const data  = request.body;

            const dataPerson = await personsService.create(data);

            return response.status(200).json({ message: "Record created successfully", dataPerson});
        }
        catch (err) {
            return response.status(400).json(err);
        }
    },

    async updatePersonByID(request, response) {
        try {
            const { id } = request.query;

            const dataPerson = request.body;

            const updatedPerson = await personsService.update(id, dataPerson)

            return response.status(200).json({ message:"Updated data", updatedPerson});
        }
        catch (err) {
            return response.status(404).json(err);
        }
    },

    async deletePersonByID(request, response) {
        try {
            const { id } = request.query;

            const deletedPerson = await personsService.delete(id);

            return response.status(200).json({ message: "Person deleted", deletedPerson });
        }
        catch (err) {
            return response.status(404).json(err);
        }
    },

    async listPersons(request, response) {
        try {
            const people = await personsService.list();

            return response.status(200).json(people);
        }
        catch (err) {
            return response.status(404).json(err);
        }
    },

    async showPersonByID(request, response) {
        try {
            const { id } = request.query;

            const person = await personsService.show(id);

            return response.status(200).json(person);
        }
        catch (err) {
            return response.status(404).json(err);
        }
    },

    async authPerson(request, response) {
        try {
            const { email, password } = request.body;

            const authPerson = await personsService.auth(email, password);

            return response.status(200).json(authPerson);
        }
        catch (err) {
            return response.status(401).json(err); 
        }
    }
}