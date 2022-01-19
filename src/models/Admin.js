import mongoose from 'mongoose';
import {AdminRules} from '../rules/adminRules.js' 
const ADMIN = new AdminRules().getRules()

const AdminModel = {
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: [ADMIN]
    } 
}

const Admin = mongoose.model('Admin', AdminModel);
export default Admin;