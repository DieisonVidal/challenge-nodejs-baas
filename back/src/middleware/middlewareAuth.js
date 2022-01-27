import  promisify  from 'util'
import jwt from "jsonwebtoken"
import { authConfig } from "../config/auth-config.js";

export const Authentication = {
  
  async verifyJWT(request, response, next) {
    try{
        const authHeader = request.headers.authorization;
       
        if (!authHeader) return response.status(401).json({ auth: false, message: 'No token provided.' });

        const [,token] = authHeader.split(' ');

        jwt.verify(token, authConfig.secret, function(err, decoded) {
          if (err) 
            return response.status(401).json({ auth: false, 
              message: 'Failed to authenticate token' });
          // se tudo estiver ok, salva no request para uso posterior
          request.personId = decoded.id;
           
          /* console.log(request.personId) */         
          next();
        });
    }
    catch {
      return response.status(401).json({ auth: false, message: "Invalid token"});
    }
  }
}