import { json } from 'express'
import app from '../config/custom-express.js';
import accountsRoutes from '../routes/accounts.routes.js';
import personsRoutes from '../routes/persons.routes.js'
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/challenge_baas',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use('/person', personsRoutes);
app.use('/account', accountsRoutes);
//app.use('/auth', authRoutes);

app.listen(3000, () => { console.log("Server is running!") });