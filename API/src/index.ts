import app from './app';
import './database';
import config from './config'
import { Socket } from 'socket.io'
import moment from 'moment-timezone'
import reloj, {horarios, revisarhora} from './horarios'
import {restaurarmotos} from './routes/data.controller'


const httpServer = require("http").createServer(app);

export const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://webpersonal-darthenis.vercel.app/",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

let prueba=true;

httpServer.listen(config.PORT);

console.log(config.MONGO_PASS)

io.on("connection", (socket: Socket) => {

      socket.on('conectado', (arg) =>{

          console.log(arg);

    })

      socket.on('reload', () => {


          socket.broadcast.emit('reloading');

    })


});


setInterval (revisarhora, 60000)



export default httpServer;
