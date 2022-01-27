import Person from '../models/Person.js';
import Account from '../models/Account.js';

export const accountService = {
    async create(dataPerson){
        const person = await Person.findOne(dataPerson); 

        if(!person || person === "") 
            throw {error: "Person not found"};

        const dataAccount = await Account.findOne({person: person});

        if(dataAccount) 
            throw {error: "This person already has an account"}
        
        const createAccount = await Account.create({
            number_account:accountNumberGenerator(), 
            person:person,
            balance: 0
        });
       
        return createAccount;
    },

    async list(){
        const accounts = await Account.find();

        if(!accounts)
        throw {error: "Error listing accounts" };

        const Accounts = accounts.map((person)=> {
            return {
                account_id: person._id,
                number_account: person.number_account,
                person_id: person.person._id,
                name: person.person.full_name,
                cpf: person.person.cpf
            }
        });

        return Accounts;
    },

    async show(number_account){
        const account = await Account.findOne(number_account);

        if(!account)
            throw {error: "Account not found"};

        const dataResult = {
            account_id: account._id,
            number_account: account.number_account,
            person_id: account.person._id,
            full_name: account.person.full_name,
            email: account.person.email,
            phone: account.person.phone,
            statement: account.statement 
        };

        return dataResult
    },

    async balance(number_account, account_id){
        if(number_account){

            const account = await Account.findOne({number_account});

            if(!account || account === "")
            throw {error: "Account not found"};

            const result = {
                account_id: account._id,
                number_account: account.number_account,
                balance: account.balance
            };

            return result;
        }
        
        if(account_id){
            const account = await Account.findById(account_id);
           
            if(!account)
                throw {error: "Account not found"};

            const result = {
                account_id: account._id,
                number_account: account.number_account,
                balance: account.balance
            };

            return result;
        }
    },

    async delete(id){
        if(id === "" || id === null)
            throw {error: "Person not found. Inform the id of the record to be changed"}
        
        const queryBalance = await Account.findById(id)

        if(queryBalance.balance > 0)
            throw {error:"Request failed, account with available balance."}

        const deletedPerson = await Account.findByIdAndDelete(id);

        return deletedPerson;
    }
}

export function accountNumberGenerator(){
    return Math.floor(Math.random() * 99999) ;
}