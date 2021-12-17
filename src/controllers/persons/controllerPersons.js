import Person from "../../models/Person.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {authConfig} from "../../config/auth-config.js"


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
                password: encryptPassword(password)
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

            return response.json(updatedPerson);
        }
        catch (err) {
            return response.json({ error: "Person not found" });
        }
    },

    async deletePersonByID(request, response) {
        try {
            const { id } = request.query;
            const deletedPerson = await Person.findByIdAndDelete(id);

            return response.json({ message: "Person deleted", deletedPerson });
        }
        catch {
            return response.json({ error: "Person not found" });
        }
    },

    async listPersons(request, response) {
        try {
            const people = await Person.find({});
            return response.json({ people });
        }
        catch (err) {
            return response.json({ error: "People not found!" });
        }
    },

    async showPersonByID(request, response) {
        try {
            const { id } = request.query;
            const person = await Person.findById(id);

            return response.json(person);
        }
        catch (err) {
            return response.json({ error: "Person not found" });
        }
    },

    async authPerson(request, response) {
        try {
            const { email, password } = request.body;

            const person = await Person.findOne({ email });
            if (!person) {
                return response.status(401).json({error: "Invalid data, please check your information"});
            }

            const verifyPassword = await bcrypt.compare(password, person.password);
            if(!verifyPassword){
                return response.status(401).json({error: "Incorrect password"});
            }
            /* onst authConfig = authconfig; */
            /* const { id } = person; */
            const token = jwt.sign(
                          {id: person.id}, 
                          authConfig.secret, 
                          {expiresIn: "120",}
            );

            return response.json({
                person:{
                    id: person.id,
                    name: person.full_name,
                    email
                },
                token_person: token,
            });
        }
        catch (err) {
            return response.status(401).send('Invalid login!'); 
        }
    }

}

export function encryptPassword(password) {
    const cryptoPassword = bcrypt.hashSync(password, 10);
    return cryptoPassword; 
}