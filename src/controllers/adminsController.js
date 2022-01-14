import bcrypt from "bcrypt"
import Admin from '../models/Admin.js'
import {authConfig} from '../config/auth-config.js'
import { AdminRules } from "../rules/adminRules.js";
import  {adminService}  from "../services/adminService.js"


export const adminsController = {
    async createAdmin(request,response){
        try{
            const data = request.body;
           /*  console.log(data) */
            const dataAdmin = await adminService.create(data)
            /* console.log(dataAdmin) */
            return response.status(200).json(dataAdmin)

        }
        catch(err){
            return response.status(400).json(err);
        }        
    },

    async authAdmin(request, response){
        try {
            const { name, email, password } = request.body;

            const admin = await Admin.findOne({ email });
            console.log(admin)
            if (!admin) {
                return response.status(401).json({error: "Invalid data, please check your information"});
            }
            
            const verifyPassword = await bcrypt.compare(password, admin.password);
            if(!verifyPassword){
                return response.status(401).json({error: "Incorrect password"});
            }
           
            const { id } = admin;
            console.log(id)

            return response.status(200).json({
                admin:{
                    id: admin.id,
                    name: admin.name,
                    email
                },
                token_admin: jwt.sign({ id }, authConfig.secret, {expiresIn: 3600})
            });
        }
        catch (err) {
            return response.status(401).send('Invalid login!'); 
        }
    },

    async listAdmins(request,response){
        try {
            const admins = await adminService.list();
            return response.status(200).json(admins);
        }
        catch (err) {
            return response.status(404).json(err);
        }
    }
}

