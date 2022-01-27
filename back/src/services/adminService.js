import Admin from "../models/Admin.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { authConfig } from "../config/auth-config.js";

export const adminService = {

    async create(data){
        const {email, password} = data;
        
        const adminAlreadyExists = await Admin.findOne({email}).lean();
        
        if(adminAlreadyExists) throw {error:"Admin already exists."};
        
        const dataResult = await Admin.create({
            name: data.name,
            email: data.email,
            password: encryptPassword(password),
            role: data.role
        });
       
        return dataResult;
    },

    async authAdmin(email, password){
        const admin = await Admin.findOne({ email });

        if (!admin) 
           throw {error: "Invalid data, please check your information"};

        const verifyPassword = await bcrypt.compare(password, admin.password);

        if(!verifyPassword)
            throw {error: "Incorrect password"};
       
        const { id } = admin;

        const authAdmin = {
            admin:{
                id: admin.id,
                name: admin.name,
                email: admin.email,
                role: "Admin"
            },
            token_admin: jwt.sign({ id }, authConfig.secret, {expiresIn: 3600})
        };

        return authAdmin;
    },

    async list(){
        const admins = await Admin.find();

        if(!admins) throw {error:"Admins list error"}

        return admins;
    }
}

export function encryptPassword(password) {
    const cryptoPassword = bcrypt.hashSync(password, 10);
    return cryptoPassword; 
}