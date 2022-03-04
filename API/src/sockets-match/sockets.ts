import {Socket} from 'socket.io'
import {io} from '../index'
import {checkNewConection, seekID, matches, deleteID} from './matches'



module.exports= () => {

        io.on('connection', (socket : Socket) => {

            socket.on('joinMatch', (data) =>{

                socket.join(data.match)

                checkNewConection(data.match, data.type, socket.id)

            })

            socket.on('newInitOrder', (initOrder) => {

                    let match = seekID(socket.id)

                    match && socket.to(match).emit('newInitOrder', initOrder)           

            })

            socket.on('newStats', (data) => {

                let match = seekID(socket.id)

                match && socket.to(match).emit('newStatsPlayer', data)

            })

            socket.on('initRolled', (playerStats) => {

                let match = seekID(socket.id)

                match && socket.to(match).emit('playerInit', playerStats.data)

            })

            socket.on('attackRolled', (result) => {

                let match = seekID(socket.id)

                match && socket.to(match).emit('playerAttack', {data : result.data, combatients : result.combatients})
            })

            socket.on('dmg', data => {

                let match = seekID(socket.id)

                match && socket.to(match).emit('dmg', {id : data.id, dmg : data.dmg})

            })

            socket.on('passTurn', () => {

                let match = seekID(socket.id)

                match && socket.to(match).emit('passTurn')

            })

            socket.on('newRegisterText', data => {

                let match = seekID(socket.id)

                match && socket.to(match).emit('newRegisterText', data)

            })

            socket.on('newCD', cd => {

                let match = seekID(socket.id)

                match && socket.to(match).emit('newCD', cd)

            })

            socket.on('customRoll', result => {

                let match = seekID(socket.id)

                match && socket.to(match).emit('customRoll', result)

            })

            socket.on('disconnect', args => {

                deleteID(socket.id)

                console.log('actual Matches on: ', matches)

            })


        })

}