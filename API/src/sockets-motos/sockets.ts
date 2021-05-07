import {io} from '../index'
import {Socket} from 'socket.io'


module.exports = () => {

            io.on("connection", (socket: Socket) => {

                    socket.on('conectado', (arg) =>{

                        console.log(arg);

                    })

                    socket.on('reload', () => {


                        socket.broadcast.emit('reloading');

                    })


            })

}
