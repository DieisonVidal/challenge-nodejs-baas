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
                response.status(400).json({error: "Person not found"});
            }

            const dataAccount = await Account.findOne({person: person});
            if(dataAccount) {
                return response.status(400).json({error: "This person already has an account"});
                
            }
            
            const createAccount = await Account({
                number_account:accountNumberGenerator(), 
                person:person
            });

           
                const accountPerson = await createAccount.save();
                response.json({message: "Account created", accountPerson});
        

        } 
        catch (err) {
            response.json({error: "Error creating account"});
        }
    },
    
    async listAccounts(request, response){
        try{
            const accounts = await Account.find();
            const Accounts = accounts.map((person)=> {
                return {
                    account_id: person._id,
                    number_account: person.number_account,
                    person_id: person.person[0]._id,
                    nome: person.person[0].full_name,
                    cpf: person.person[0].cpf
                }
            });

            response.json({Accounts})
        }
        catch{
            response.json({error: "Error listing accounts"});
        }
    },

    async showAccount(request, response){
        try{
            const cpf = request.boby;
            const accountPerson = await Account.findOne({});
            console.log(accountPerson)
        }
        catch{

        }
    },

    
};

export function accountNumberGenerator(){
    return Math.floor(Math.random() * 99999) ;
}