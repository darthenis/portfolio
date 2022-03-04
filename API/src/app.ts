const express = require('express');
import cors from 'cors';
import morgan from 'morgan';
import dataroutes from './routes/data.routes';


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: 'https://webpersonal-3vlahi64v-darthenis.vercel.app/',
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["my-custom-header", "Content-Type", "Authorization", "X-Requested-Wit"],
    credentials: true
}));
app.use(dataroutes);



export default app;