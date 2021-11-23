import { json } from 'express'
import app from '../config/custom-express.js';
import individualRoutes from '../routes/individual.routes.js'
// const registerIndividualRoutes = require('../routes/resgisterIndividual.routes');

app.use(json());
app.use('/individual', individualRoutes);
// app.use('/resgister', registerIndividualRoutes);

app.listen(3000, () => { console.log("Server is running!") });