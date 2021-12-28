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
            response.status(200).json({message: "Account created", accountPerson});
        } 
        catch (err) {
            response.status(400).json({error: "Error creating account"});
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

            response.satatu(200).json({
                account_id: account._id,
                number_account: account.number_account,
                person_id: account.person._id,
                full_name: account.person.full_name,
                email: account.person.email,
                phone: account.person.phone,
                statement: account.statement 
            });
        }
        catch{
            response.status(400).json({error: "Account not found"});
        }
    },

    /* async p2pService(request, response){
        try{
            const accounts = await Account.find();
            const debtorAccount = accounts.find(account => request.personId === String(account.person._id));
           

            const { number_account, amount } = request.body;
            const receiverAccount = await Account.findOne({number_account});
            console.log(debtorAccount.balance);
            console.log(receiverAccount.balance);
            
            if(!receiverAccount){
                response.status(400).json({error: "Account not found. Check the data entered."});
            }
            
            if(debtorAccount.balance < amount){
                response.status(400).json({error: "Insufficient balance for transaction."});
            }

            const { id: debtorAccountID } = debtorAccount;
            const { id: receiverAccountID } = receiverAccount;

            await Account.findByIdAndUpdate(debtorAccountID,{$inc:{ balance: - amount},},);
            await Account.findByIdAndUpdate(receiverAccountID,{$inc:{ balance: + amount},},);
            console.log(debtorAccount.balance);
            console.log(receiverAccount.balance);

            response.status(200).json({ message:"Successful transaction", balance: debtorAccount.balance});
        }
        catch{
            response.status(400).json({error: "Resquest failed"});
        }
    }, */
    
    async balance(request, response){
        try{
            const  number_account  = request.query;
            const account = await Account.findOne(number_account);

            if(account){
                response.status(200).json({
                    account_id: account._id,
                    number_account: account.number_account,
                    balance: account.balance
                })
            }
            else {
                response.status(400).json({error: "Account not fount"});
            }
        }
        catch{
            response.status(400).json({error: "Resquest failed"});
        }
    }
};

export function accountNumberGenerator(){
    return Math.floor(Math.random() * 99999) ;
}