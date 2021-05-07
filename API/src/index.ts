import app from './app';
import './database';
import './chatroom/sockets'
import config from './config'
import reloj, {horarios, revisarhora} from './horarios'



const httpServer = require("http").createServer(app);




export const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

require('./chatroom/sockets')(io)
require('./sockets-motos/sockets')(io)





httpServer.listen(config.PORT);

setInterval (revisarhora, 60000)


export default httpServer;
