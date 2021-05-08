import {Socket} from 'socket.io'
import {io} from '../index'
import {adduser} from './chatroom'
import { user } from './interface'


module.exports = () => {

        io.on('connection', (socket : Socket) =>{

                    socket.on('userchat', (user) => {

                        const newuser:user={nombre: user.nombre, id : socket.id}

                        const result = adduser(newuser)

                        socket.emit('callback', result)
                    })

                    socket.on('disconnect', () =>{

                        //deleteuser(socket.id)


                    })
        
        })

    


}
