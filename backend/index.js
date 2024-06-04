import express, { response } from 'express';
import { PORT, MONGO_URI } from './config.js';
import mongoose from 'mongoose';
import bookroute from './routes/bookroute.js';



import { Book } from './models/bookmodel.js';
const app = express();
app.use(express.json());
app.get('/', (req, res) => { console.log(req); res.send('Hello World!'); });


app.use('/books', bookroute);
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

