import Admin from '../models/Admin.js'
import bcrypt from 'bcrypt'

export const adminService = {

    async create(data){
        const {email, password} = data
        
        const adminAlreadyExists = await Admin.findOne({email}).lean()
        
        if(adminAlreadyExists) throw {error:"Admin already exists."}
        
        const dataResult = await Admin.create({
            name: data.name,
            email: data.email,
            password: encryptPassword(password),
            role: data.role
        })
       
        return dataResult
    },

    async authAdmin(){
        
    },

    async list(){
        const admins = await Admin.find();
        return admins;
    }
}

export function encryptPassword(password) {
    const cryptoPassword = bcrypt.hashSync(password, 10);
    return cryptoPassword; 
}