import { ObjectId } from 'bson';
import { v4 as uuidv4 } from 'uuid';
import Account from '../../models/Account.js';
import Person from '../../models/Person.js';


export const controllerAccounts = {
    
    async createAccount(request, response){
        try {
            const dataPerson = request.body;

            const person = await Person.findOne(dataPerson);
            
            if(!person) {
                response.json({message: "Person not found"});
            }
            else {
                const createAccount = await Account({
                    number_account:accountNumberGenerator(), 
                    person:person
                });
                console.log(createAccount);
                response.json({message: "Person exists"});
            }
        } 
        catch (err) {

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