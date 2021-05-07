import {Socket} from 'socket.io'
import {io} from '../index'
import {adduser} from './chatroom'


module.exports = () => {

        io.on('connection', (socket : Socket) =>{

                    socket.on('userchat', (arg) => {

                        console.log(arg)
                    })
        
        })

    


}
