import Transaction from "../../models/Transaction.js";
import Account from '../../models/Account.js';


export const controllerTransactions = {
    async transactionP2P(request, response){
        try{
            //Debtor account
            const accounts = await Account.find();
            const debtorAccount = accounts.find(account => request.personId === String(account.person._id));

            // Receiver account
            const { number_account, amount } = request.body;
            const receiverAccount = await Account.findOne({number_account});
           
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

            const transaction = await Transaction({
                number_account
            });
            console.log(debtorAccount.balance);
            console.log(receiverAccount.balance);

            response.status(200).json({ message:"Successful transaction", balance: debtorAccount.balance});
        }
        catch{
            response.status(400).json({error: "Resquest failed"});
        }
    },

    async listTransaction(request, response){
        try{

        }
        catch{

        }
    }
};