import {Socket} from 'socket.io'
import {io} from '../index'
import {adduser, chatroomusers, deleteUser} from './chatroom'
import { user, chatroom } from './interface'


module.exports = () => {

        io.on('connection', (socket : Socket) =>{

                    socket.on('userchat', (user) => {

                        const newuser:user={nombre: user.nombre, id : socket.id}

                        const result = adduser(newuser)

                        if (result==='correct') {
                                
                                socket.join('chatRoom'); 
                                socket.emit('done', 'completed')
                                socket.to('chatRoom').emit('newUser', user.nombre)

                            }else{ 
                                socket.emit('done', 'error')
                                }

                    })

                    socket.on('getUsers', (user) => {

                        const actualUsers = chatroomusers.map(users => users.nombre)
                                let i = actualUsers.indexOf(user.nombre)
                                actualUsers.splice(i, 1)

                        socket.emit('users', actualUsers)

                    })

                    socket.on('sendmsg', (msg) => {

                        socket.to('chatRoom').emit('newmsg', msg)


                    })

                    socket.on('privatemsg', (msg, user) => {

                            let userid = chatroomusers.filter(chatUser => {return chatUser.nombre === user})

                            console.log('usuario id: ', userid[0])

                            socket.to(userid[0].id).emit('privatemsgin', msg)


                    })

                    socket.on('disconnect', () =>{

                        let userDisconnect = chatroomusers.filter((user)=>{return user.id === socket.id})

                        if(userDisconnect.length===1){

                        deleteUser(userDisconnect[0].nombre)

                        socket.to('chatRoom').emit('disconnectuser', userDisconnect[0].nombre)}


                    })
        
        })

    


}
