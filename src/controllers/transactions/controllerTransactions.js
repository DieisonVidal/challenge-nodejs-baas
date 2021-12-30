import Transaction from "../../models/Transaction.js";
import Account from '../../models/Account.js';
import DateFns, { getDate } from 'date-fns'


export const controllerTransactions = {
    async transactionP2P(request, response){
        try{
            // Debtor account
            const accounts = await Account.find();
            const debtorAccount = accounts.find(account => request.personId === String(account.person._id));

            // Receiver account
            const { id_receiver, type, amount } = request.body;
            const receiverAccount = await Account.findById(id_receiver);
            
            if(!receiverAccount){
                response.status(400).json({error: "Account not found. Check the data entered."});
            }

            if(amount < 10){
                response.status(400).json({error:"Minimum amount to carry out the transaction is 10"})
            }
            
            if(debtorAccount.balance < amount){
                response.status(400).json({error: "Insufficient balance for transaction."});
            }

            const { id: debtorAccountID } = debtorAccount;
            const { id: receiverAccountID } = receiverAccount;

            await Account.findByIdAndUpdate(debtorAccountID,{$inc:{ balance: - amount},},);
            await Account.findByIdAndUpdate(receiverAccountID,{$inc:{ balance: + amount},},);

            /* const dateFormat = new Date( date + " 00:00"); */

            const transaction = await Transaction({
                data_receiver:{
                    receiver_account_id: receiverAccountID,
                    name: receiverAccount.person.full_name
                },
                debtor_account_id: debtorAccountID,
                type: type,
                amount: amount,
                date: new Date()
            }).save();
            console.log(debtorAccount.balance);
            console.log(receiverAccount.balance);
            console.log(transaction)

            response.status(200).json({ message:"Successful transaction", transaction});
        }
        catch{
            response.status(400).json({error: "Resquest failed"});
        }
    },

    async listTransaction(request, response){
        try{
            const {debtor_account_id, type, date} = request.query;
            
            console.log(debtor_account_id)
            if(debtor_account_id){
                const transactions = await Transaction.find({debtor_account_id});
                response.status(200).json({transactions});
            }
            console.log(type)
            if(type){
                const transactions = await Transaction.find({type});
                response.status(200).json({transactions});
            }
            console.log(date)
            if(date){               
                const data = {
                    $gte: DateFns.startOfDay(new Date(date)),
                    $lte: DateFns.endOfDay(new Date(date))
                }
                const transactions = await Transaction.find({date:data});
                response.status(200).json({transactions});
            }

            response.status(400).json({error:"Check the parameters entered in the listing"})           
        }
        catch{
            response.status(200).json({error:"Transfer listing failed"});
        }
    }
};