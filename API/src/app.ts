const express = require('express');
import cors from 'cors';
import morgan from 'morgan';
import dataroutes from './routes/data.routes';


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(dataroutes);



export default app;