import { v4 as uuidv4 } from 'uuid';
import Account from '../models/Account.js';
import Person from '../models/Person.js';


export const accountsController = {
    
    async createAccount(request, response){
        try {
            const dataPerson = request.body;
            const person = await Person.findOne(dataPerson); 

            if(!person || person === "") {
                return response.status(400).json({error: "Person not found"});
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
            return response.status(200).json({message: "Account created", accountPerson});
        } 
        catch (err) {
            return response.status(400).json({error: "Error creating account"});
        }
    },
    
    async listAccounts(request, response){
        try{
            const accounts = await Account.find();
            const Accounts = accounts.map((person)=> {
                return {
                    account_id: person._id,
                    number_account: person.number_account,
                    person_id: person.person._id,
                    name: person.person.full_name,
                    cpf: person.person.cpf
                }
            });

            return response.status(200).json({Accounts})
        }
        catch (err) {
            return response.status(400).json({error: "Error listing accounts"});
        }
    },

    async showAccount(request, response){
        try{
            const  number_account  = request.query;
            const account = await Account.findOne(number_account);

            return response.status(200).json({
                account_id: account._id,
                number_account: account.number_account,
                person_id: account.person._id,
                full_name: account.person.full_name,
                email: account.person.email,
                phone: account.person.phone,
                statement: account.statement 
            });
        }
        catch (err) {
            return response.status(400).json({error: "Account not found"});
        }
    },
    
    async balance(request, response){
        try{
            const  {number_account, account_id}  = request.query;

            if(number_account){
                const account = await Account.findOne({number_account});
                return response.status(200).json({
                    account_id: account._id,
                    number_account: account.number_account,
                    balance: account.balance
                });
            }
            if(account_id){
                const account = await Account.findById(account_id);
                return response.status(200).json({
                    account_id: account._id,
                    number_account: account.number_account,
                    balance: account.balance
                });
            }
        }
        catch (err) {
            return response.status(400).json({error: "Account not found"});
        }
    },

    async deleteAccount(request, response){
        try{
            const { id } = request.query;

        }
        catch (err) {
            return response.status(400).json({})
        }
    }
};

export function accountNumberGenerator(){
    return Math.floor(Math.random() * 99999) ;
}