import {Socket} from 'socket.io'
import {io} from '../index'



module.exports= () => {

        io.on('connection', (socket : Socket) => {

            socket.on('joinMatch', (match) =>{

                socket.join(match)

            })

            socket.on('newInitOrder', (initOrder) => {

                    io.to(initOrder.match).emit('newInitOrder', initOrder.data)                

            })

            socket.on('initRolled', (playerStats) => {

                console.log('rolledInit: ', playerStats)


               io.to(playerStats.match).emit('initRolled', playerStats.data)

            })


        })


}