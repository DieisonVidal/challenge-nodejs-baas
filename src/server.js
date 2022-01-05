import app from './app/app.js';
import accountsRoutes from './routes/accounts.routes.js';
import personsRoutes from './routes/persons.routes.js'
import transactionsRoutes from './routes/transactions.routes.js';
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
app.use('/transactions', transactionsRoutes)

app.listen(3000, () => { console.log("Server is running!") });