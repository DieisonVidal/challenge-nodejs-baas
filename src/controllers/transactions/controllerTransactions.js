import Transaction from "../../models/Transaction.js";
import Account from '../../models/Account.js';
import DateFns from 'date-fns'


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
                return response.status(400).json({error: "Account not found. Check the data entered."});
            }

            if(amount < 10){
                return response.status(400).json({error:"Minimum amount to carry out the transaction is 10"})
            }
            
            if(debtorAccount.balance < amount){
                return response.status(400).json({error: "Insufficient balance for transaction."});
            }

            const { id: debtorAccountID } = debtorAccount;
            const { id: receiverAccountID } = receiverAccount;

            await Account.findByIdAndUpdate(debtorAccountID,{$inc:{ balance: - amount},},);
            await Account.findByIdAndUpdate(receiverAccountID,{$inc:{ balance: + amount},},);

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

            return response.status(200).json({ message:"Successful transaction", transaction});
        }
        catch{
            return response.status(400).json({error: "Resquest failed"});
        }
    },

    async listTransaction(request, response){
        try{
            const {debtor_account_id, type, date} = request.query;

            if(debtor_account_id){
                const transactions = await Transaction.find({debtor_account_id});
                return response.status(200).json({transactions});
            }
            
            if(type){
                const transactions = await Transaction.find({type});
                return response.status(200).json({transactions});
            }
            
            if(date){  
                
                const gte = DateFns.addHours(new Date(date), 3)
               
                const data = {
                    $gte: DateFns.subHours(DateFns.startOfDay(gte), 3),
                    $lte: DateFns.subHours(DateFns.endOfDay(gte), 3)
                }
                console.log(data)
                const transactions = await Transaction.find({date:data});
                return response.status(200).json({transactions});
            }

            return response.status(400).json({error:"Check the parameters entered in the listing"})           
        }
        catch{
            return response.status(200).json({error:"Transfer listing failed"});
        }
    }
};