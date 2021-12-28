import mongoose from 'mongoose';

const TransactionModel = {

    data_receiver:{
        type: Object,
        required: true
    },
    id_debtor: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}

const Transaction = mongoose.model('Transaction', TransactionModel);

export default Transaction;