import app from './app';
import './database';
import config from './config'
import { Socket } from 'socket.io'
import reloj, {horarios, revisarhora} from './horarios'


const httpServer = require("http").createServer(app);

export const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://webpersonal-darthenis.vercel.app/",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

httpServer.listen(config.PORT);

io.on("connection", (socket: Socket) => {

      socket.on('conectado', (arg) =>{

          console.log(arg);

    })

      socket.on('reload', () => {


          socket.broadcast.emit('reloading');

    })

      socket.on('userchat', (arg) =>{

          console.log(arg)

      })


});


setInterval (revisarhora, 60000)



export default httpServer;
