import express from 'express';
import router from './routes/routes.js'
import connectDB from './config/db.js'

const port = 5000;
connectDB();

const app = express();

app.use('/api/',router );

app.listen(port, () => {
    console.log('listening on port ' + port)
});
