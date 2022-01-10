import bcrypt from "bcrypt"
import Admin from '../../models/Admin.js'

export const controllerAdmins = {
    async createAdmin(request,response){
        const {name, email, password, role} = request.body;

        const dataAdmin = new Admin ({
            name,
            email,
            password: encryptPassword(password),
            role
        }).save();
        console.log(dataAdmin)
        return response.status(200).json(dataAdmin);
        
    },

    async authAdmin(request, response){

    }
}

export function encryptPassword(password) {
    const cryptoPassword = bcrypt.hashSync(password, 10);
    return cryptoPassword; 
}