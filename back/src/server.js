import app from './app/app.js';
import accountsRoutes from './routes/accounts.routes.js';
import personsRoutes from './routes/persons.routes.js'
import transactionsRoutes from './routes/transactions.routes.js';
import adminsRoutes from './routes/admins.routes.js'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './swagger.json';
import cors from 'cors';

try {
    console.log('realizou a conexão com o mongodb')
    mongoose.connect('mongodb://localhost:27017/challenge_baas', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} 
catch (error) {
    console.log('error -> ', error)
};

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(bodyParser.json());
app.use('/person', personsRoutes);
app.use('/account', accountsRoutes);
app.use('/admin', cors(), adminsRoutes);
 
app.use('/transactions', transactionsRoutes);

app.listen(3000, () => { console.log("Server is running!") });