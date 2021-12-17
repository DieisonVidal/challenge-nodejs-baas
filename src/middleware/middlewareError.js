
import jwt from "jsonwebtoken"
import { authConfig } from "../config/auth-config.js";

export const verifyJWT = (request, response, next) => {
    const token = request.headers['Authorization'];
    if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, authConfig.secret, function(err, decoded) {
      if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      request.id = decoded.id;
      console.log("rodou o VerifyJWT" + id)
      next();
    });
}