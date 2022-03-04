import app from './app';
import './database';
import './chatroom/sockets'
import config from './config'
import reloj, {horarios, revisarhora} from './horarios'



const httpServer = require("http").createServer(app);


export const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://webpersonal-darthenis.vercel.app",
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

setInterval (revisarhora, 60000)


export default httpServer;
