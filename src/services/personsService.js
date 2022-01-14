import Person from "../models/Person.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { authConfig } from "../config/auth-config.js";

export const personsService = {

    async create(data){
        const { cpf } = data

        const personAlreadyExists = await Person.findOne({cpf}).lean();
        
        if(personAlreadyExists) throw {error:"Person already exists."};

        const dataResult = await Person.create({
            cpf: data.cpf,
            full_name: data.full_name,
            email: data.email,
            phone: data.phone,
            username: data.username,
            password: encryptPassword(data.password)
        });

        return dataResult;
    },

    async update(id, data){ 
        if(id === "" || id === null)
            throw {error: "Person not found. Inform the id of the record to be changed"}

        if(data.full_name === "" || data.username === "" 
            || data.email === "" || data.phone === "")
                throw {error: "Fill in all registration data"}
            
        const updatedPerson = await Person.findByIdAndUpdate(id, data);
        return updatedPerson;
    },

    async list(){
        const people = await Person.find();

        if(!people)
            throw {error: "Record listing error" };
            
        return people;
    },

    async show(id){
        const person = await Person.findById(id);

        const dataResult = {
            person_id: person.id,
            cpf: person.cpf,
            full_name: person.full_name,
            email: person.email,
            phone: person.phone,
            username: person.username
        };

        return dataResult;
    },

    async delete(id){
        if(id === "" || id === null)
            throw {error: "Person not found. Inform the id of the record to be changed"}
        
        const deletedPerson = await Person.findByIdAndDelete(id);

        return deletedPerson;
    },

    async auth(email, password){
        const person = await Person.findOne({ email });

        if (!person) 
           throw {error: "Invalid data, please check your information"};

        const verifyPassword = await bcrypt.compare(password, person.password);
        if(!verifyPassword)
            throw {error: "Incorrect password"};
       
        const { id } = person;

        const authPerson = {
            person:{
                id: person.id,
                name: person.full_name,
                email
            },
            token_person: jwt.sign({ id }, authConfig.secret, {expiresIn: 3600})
        };

        return authPerson;
    }
}

export function encryptPassword(password) {
    const cryptoPassword = bcrypt.hashSync(password, 10);
    return cryptoPassword; 
}