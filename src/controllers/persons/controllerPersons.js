import Person from "../../models/Person.js";
import mongodb from "mongodb";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';


export const persons = [];

export const controllerPersons = {

    async createPerson(request, response) {
        try {
            const { cpf, full_name, email, phone, personname, password } = request.body;
            
            /* const personAlreadyExists = await Person.findBy("cpf", cpf)
            console.log(personAlreadyExists)
            if (!personAlreadyExists) {
                response.status(400).json({ error: "Person already exists!" });
            } else{ 

            } */
            const dataPerson = new Person({
                cpf,
                full_name,
                email,
                phone,
                personname,
                password
            });

            const  query = await Person.find({}, {cpf: 1});
            console.log(query[{cpf}])
            console.log(dataPerson)

            /* if(dataPerson == query){
                return response.json({message: "Person already exists!"})
            } 
            else{
                const person = await dataPerson.save();
                return response.status(200).json({ succes: "Created successfully!", person });
            }  */        
            


            /* const personSchema = new Schema({
                cpf: {
                  type: String,
                  validate: {
                    validator: function(v, cb) {
                      Person.find({cpf: v}, function(err,docs){
                         cb(docs.length == 0);
                      });
                    },
                    message: 'User already exists!'
                  }
                }
              });

              /* console.log(personSchema) */
              /* if(personSchema){
                const person = await dataPerson.save();
                return response.status(200).json({ succes: "Created successfully!", person });
              } 
              else {
                return response.json({message: "Person already exists!"})
              } */

              


            /* const PersonSchema = new Schema({
                cpf: {type:String}
            });

            const PersonModel = mongoose.model('PersonModel',PersonSchema);
            const achou = PersonModel.find({cpf : cpf})
                console.log(achou.length) */
            /* function updateperson(person,cb){
                PersonModel.find({cpf : person.cpf}, function (err, docs) {
                    console.log(person.cpf)
                    
                    if (docs.length){
                        cb('per exists already',null);
                    }else{
                        person.save(function(err){
                            cb(err,person);
                        });
                    }
                });
            } */


            /* if() {

            } else {

            }

            const person = await dataPerson.save();
                
            if (person) {
                return response.status(200).json({ succes: "Created successfully!", person });
            } */
            } catch (error) {
                return response.status(400).json({ error });
            }
        
    },

    async updatePersonByID(request, response){
        try{
            const { id } = request.query;
        
            const dataPerson = request.body;
           
            const updatedPerson = await Person.findByIdAndUpdate(id, dataPerson);
            //console.log(updatedPerson);
            response.json(updatedPerson);
        } catch(err) {
            response.json({error: "Person not found"});
        }
    },

    async deletePersonByID(request, response){
        try{
            const { id } = request.query;
           
            const deletedPerson = await Person.findByIdAndDelete(id);
            
            response.json({message: "Person deleted", deletedPerson});
        } catch {
            response.json({error: "Person not found"});
        }
    },

    registerDocument(request, response) {

    },

    async listPersons(request, response) {
        try{
            const people = await Person.find({});
            response.json({people});
        } catch (err) {
            response.json({error: "People not found!"});
        }
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