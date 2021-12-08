import { json } from 'express'
import app from '../config/custom-express.js';
import accountsRoutes from '../routes/accounts.routes.js';
import personsRoutes from '../routes/persons.routes.js'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

try {
    console.log('realizou a conexão com o mongodb')
    mongoose.connect('mongodb://localhost:27017/challenge_baas', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} 
catch (error) {
    console.log('error -> ', error)
}

app.use(bodyParser.json());
app.use('/person', personsRoutes);
app.use('/account', accountsRoutes);

app.listen(3000, () => { console.log("Server is running!") });