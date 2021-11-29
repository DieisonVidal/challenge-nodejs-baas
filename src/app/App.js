import { json } from 'express'
import app from '../config/custom-express.js';
import accountsRoutes from '../routes/accounts.routes.js';
import personsRoutes from '../routes/persons.routes.js'
// const registerIndividualRoutes = require('../routes/resgisterIndividual.routes');

app.use(json());
app.use('/person', personsRoutes);
app.use('/account', accountsRoutes);
//app.use('/auth', authRoutes);

app.listen(3000, () => { console.log("Server is running!") });