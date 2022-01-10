import mongoose from 'mongoose';
/* import {AdminRules} from '../rules/adminRules.js'

const ADMIN = AdminRules.getRules(); */


const AdminModel = {
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    role:{
        type: String,
        /* enum: [ADMIN] */
    } 
}

const Admin = mongoose.model('Admin', AdminModel);
export default Admin;