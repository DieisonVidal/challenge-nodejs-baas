import express from 'express'
const adminsRoutes = express.Router();
import {controllerAdmins} from '../controllers/admins/controllerAdmins.js'


adminsRoutes
    .post('/create', controllerAdmins.createAdmin)
    .post('auth', controllerAdmins.authAdmin)

export default adminsRoutes