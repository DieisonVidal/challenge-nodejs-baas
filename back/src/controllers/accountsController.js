import { v4 as uuidv4 } from 'uuid';
import Account from '../models/Account.js';
import Person from '../models/Person.js';
import { accountService } from '../services/accountService.js';


export const accountsController = {
    
    async createAccount(request, response){
        try {
            const dataPerson = request.body;

            const accountPerson = await accountService.create(dataPerson)

            return response.status(200).json({message: "Account created", accountPerson});
        } 
        catch (err) {
            return response.status(400).json(err);
        }
    },
    
    async listAccounts(request, response){
        try{
            const Accounts = await accountService.list()

            return response.status(200).json({Accounts})
        }
        catch (err) {
            return response.status(400).json(err);
        }
    },

    async showAccount(request, response){
        try{
            const  number_account  = request.query;

            const account = await accountService.show(number_account)

            return response.status(200).json(account);
        }
        catch (err) {
            return response.status(400).json(err);
        }
    },
    
    async balance(request, response){
        try{
            const  {number_account, account_id}  = request.query;

            const balance = await accountService.balance(number_account, account_id);

            return response.status(200).json(balance)
        }
        catch (err) {
            return response.status(400).json(err);
        }
    },

    async deleteAccount(request, response){
        try{
            const { account_id } = request.query;

            const accountDeleted = await accountService.delete(account_id);

            return response.status(200).json({ message: "Account deleted", accountDeleted });

        }
        catch (err) {
            return response.status(400).json(err)
        }
    }
};

export function accountNumberGenerator(){
    return Math.floor(Math.random() * 99999) ;
}