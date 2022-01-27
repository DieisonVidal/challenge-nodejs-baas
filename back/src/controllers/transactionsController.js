import {transactionsService} from '../services/transctionsService.js'

export const transactionsController = {
    async transactionP2P(request, response){
        try{
            const { receiver_account_id, type, amount } = request.body;

            const personID = request.personId

            const transaction = await transactionsService
                .P2P(receiver_account_id, type, amount, personID);

            return response.status(200).json({ message:"Successful transaction", transaction});
        }
        catch (err) {
            return response.status(400).json(err);
        }
    },

    async listTransaction(request, response){
        try{
            const {debtor_account_id, type, date} = request.query;

            const transactions = await transactionsService.list(debtor_account_id, type, date)

            return response.status(400).json(transactions);           
        }
        catch (err) {
            return response.status(200).json(err);
        }
    }
};