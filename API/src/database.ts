import config from './config';

const mongoose = require('mongoose');

// const url = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASS}@cluster0.pwdwr.mongodb.net/basededatos?retryWrites=true&w=majority`;

const url = 'mongodb://'+config.MONGO_USER+':'+config.MONGO_PASS+'@cluster0-shard-00-00.pwdwr.mongodb.net:27017,cluster0-shard-00-01.pwdwr.mongodb.net:27017,cluster0-shard-00-02.pwdwr.mongodb.net:27017/basededatos?ssl=true&replicaSet=atlas-hx58lj-shard-0&authSource=admin&retryWrites=true&w=majority'

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}


 mongoose.connect(url,connectionParams)
     .then( () => {
         console.log('Connected to database to port: ',process.env.PORT)
     })
     .catch( (e?: Error) => {
         console.error(`Error connecting to the database. \n${e}`);
     })
