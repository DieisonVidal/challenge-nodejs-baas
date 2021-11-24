import { json } from 'express'
import app from '../config/custom-express.js';
import personRoutes from '../routes/person.routes.js'
// const registerIndividualRoutes = require('../routes/resgisterIndividual.routes');

app.use(json());
app.use('/person', personRoutes);
// app.use('/resgister', registerIndividualRoutes);

app.listen(3000, () => { console.log("Server is running!") });