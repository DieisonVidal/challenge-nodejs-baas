import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import DateFns from 'date-fns';


export const transactionsService = {
    async P2P(receiver_account_id, type, amount, personID){     
        // Receiver account
        const receiverAccount = await Account.findById(receiver_account_id);   

         // Debtor account
        const accounts = await Account.find();
        const debtorAccount = accounts.find(account => personID === String(account.person._id));
        
        if(!receiverAccount)
            throw {error:"Account not found. Check the data entered."};

        if(amount < 10)
            throw {error:"Minimum amount to carry out the transaction is 10"};
        
        if(debtorAccount.balance < amount)
            throw {error: "Insufficient balance for transaction."};

        const { id: debtorAccountID } = debtorAccount;
        const { id: receiverAccountID } = receiverAccount;

        await Account.findByIdAndUpdate(debtorAccountID,{$inc:{ balance: - amount},},);
        await Account.findByIdAndUpdate(receiverAccountID,{$inc:{ balance: + amount},},);

        const transaction = await Transaction.create({
            data_receiver:{
                receiver_account_id: receiverAccountID,
                name: receiverAccount.person.full_name
            },
            debtor_account_id: debtorAccountID,
            type: type,
            amount: amount,
            date: new Date()
        });

        return transaction;
    },

    async list(debtor_account_id, type, date){
        if(debtor_account_id){
            const transactions = await Transaction.find({debtor_account_id});
            return transactions;
        }
        
        if(type){
            const transactions = await Transaction.find({type});
            return transactions;
        }
        
        if(date){  
            const gte = DateFns.addHours(new Date(date), 3);
           
            const data = {
                $gte: DateFns.subHours(DateFns.startOfDay(gte), 3),
                $lte: DateFns.subHours(DateFns.endOfDay(gte), 3)
            }
            console.log(data)
            const transactions = await Transaction.find({date:data});
            return transactions;
        }

        throw {error:"Check the parameters entered in the listing"};
    }
};