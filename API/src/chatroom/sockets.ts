import {Socket} from 'socket.io'
import {io} from '../index'
import {adduser, chatroomusers} from './chatroom'
import { user, chatroom } from './interface'


module.exports = () => {

        io.on('connection', (socket : Socket) =>{

                    socket.on('userchat', (user) => {

                        const newuser:user={nombre: user.nombre, id : socket.id}

                        const result = adduser(newuser)

                        if (result==='correct') {

                                const actualUsers = chatroomusers.map(users => users.nombre)
                                let i = actualUsers.indexOf(user.nombre)
                                actualUsers.splice(i, 1)
                                
                                socket.join('chatRoom'); 
                                socket.emit('done', 'completed')
                                socket.emit('users', actualUsers)
                                socket.to('chatRoom').emit('newUser', user.nombre) //mandar a los usuarios

                            }else{ 
                                socket.emit('done', 'error')
                                }

                    })

                    socket.on('sendmsg', (msg) => {
                        console.log('mensaje recibido: ', msg)

                        socket.to('chatRoom').emit('newmsg', msg)


                    })

                    socket.on('disconnect', () =>{



                        socket.to('chatRoom').emit('disconnectuser', socket.id)


                    })
        
        })

    


}
