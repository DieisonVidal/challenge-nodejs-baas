import { request } from 'express';
import { persons } from '../persons/controllerPersons.js';
import { v4 as uuidv4 } from 'uuid';


export const accounts = []; 

export const controllerAccounts = {
    
    createAccount(request, response){
        const { cpf } = request.body;
        
        const personAlreadyExists = persons.some(
            (person) => person.cpf === cpf
        );

        if (personAlreadyExists) {
            const accounts = ({
                account_id: uuidv4(),
                number_account: accountNumberGenerator(),
                persons,
                created_at: new Date()
            });
            /* return response.json({message: "funfo!"}) */
            return response.json(accounts)
        } 
        else {
            return response.status(400).json({error: "Person not found!"})
        }
        
    },
    
    listAccounts(request, response){

    },

    showAccount(request, response){
        
    },

    
};

export function accountNumberGenerator(){
    return Math.floor(Math.random() * 99999) ;
}