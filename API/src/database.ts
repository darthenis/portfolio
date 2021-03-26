import config from './config';

const mongoose = require('mongoose');

const url = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASS}@cluster0.pwdwr.mongodb.net/basededatos?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}


mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (e?: Error) => {
        console.error(`Error connecting to the database. \n${e}`);
    })
