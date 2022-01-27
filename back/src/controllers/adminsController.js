import bcrypt from "bcrypt"
import Admin from '../models/Admin.js'
import {authConfig} from '../config/auth-config.js'
import { AdminRules } from "../rules/adminRules.js";
import  {adminService}  from "../services/adminService.js"


export const adminsController = {
    async createAdmin(request,response){
        try{
            const data = request.body;
         
            const dataAdmin = await adminService.create(data);
      
            return response.status(200).json(dataAdmin);
        }
        catch(err){
            return response.status(400).json(err);
        }        
    },

    async authAdmin(request, response){
        try {
            const { email, password } = request.body;

            const authAdmin = await adminService.authAdmin(email, password);

            return response.status(200).json(authAdmin);
        }
        catch (err) {
            return response.status(401).json(err); 
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

