import app from './app';
import './database';
import './chatroom/sockets'
import config from './config'
import {checkHour} from './horarios'



const httpServer = require("http").createServer(app);


export const io = require("socket.io")(httpServer, {
  cors: {
    origin: config.WEBURL,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

require('./chatroom/sockets')(io)

require('./sockets-motos/sockets')(io)

require('./sockets-match/sockets')(io)



httpServer.listen(config.PORT)

console.log('server connected')

checkHour()

export default httpServer;
