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
                person:person,
                balance: 0
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
                    name: person.person[0].full_name,
                    cpf: person.person[0].cpf
                }
            });

            response.status(200).json({Accounts})
        }
        catch{
            response.status(400).json({error: "Error listing accounts"});
        }
    },

    async showAccount(request, response){
        try{
            const  number_account  = request.query;
            const account = await Account.findOne(number_account);

            response.json({
                account_id: account._id,
                number_account: account.number_account,
                person_id: account.person[0]._id,
                full_name: account.person[0].full_name,
                email: account.person[0].email,
                phone: account.person[0].phone,
                balance: account.balance,
                statement: account.statement 
            });
        }
        catch{
            response.status(400).json({error: "Account not found"});
        }
    },

    
};

export function accountNumberGenerator(){
    return Math.floor(Math.random() * 99999) ;
}