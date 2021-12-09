import { ObjectId } from 'bson';
import mongoose from 'mongoose';

const AccountModel = {
    number_account:{
        type: Number
    },
    person:{
        type: Array
    },
    statement:{
        type: Array
    }
}

const Account = mongoose.model('Account', AccountModel);
export default Account;
