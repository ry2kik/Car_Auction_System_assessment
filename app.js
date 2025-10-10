import express from 'express'
import dotenv from 'dotenv'
import appRoutes from './routes/app.routes.js';
import mongoose from 'mongoose';

dotenv.config({ path: '.env' });
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auction', appRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Successfully connected to the DB');
    app.listen(port, (err) => {
        if (err) {
            return console.log('Something wrong happened: ', err);
        }
        console.log(`You are listening at port number ${port}.....`);
    });
}).catch(err => {
    console.log('Error in connecting to the DB: ', err);
});

export default app;


