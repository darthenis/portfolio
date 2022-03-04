import {useEffect, useRef, useState} from 'react'
import { playerStats } from '../../../../../../Interfaces/interfaces'
import { returnDice } from '../../../logic-dice'
import  socket  from '../../../../../../service/socket'


const playerInitial = {

    name : '',
    bonusInit : 0,
    initRolled : false,
    id : Math.floor((1 + Math.random()) * 0x10000),  
    AC : 0,
    totalHP : 1,
    actualHP : 1

}


export const usePlayerStats = () => {

    const [stats, _setStats] = useState<playerStats>((JSON.parse(sessionStorage.getItem('playerStat')!)|| playerInitial))

    const myStateRef = useRef(stats)
        const setStats = (data : playerStats) => {
                myStateRef.current = data
                _setStats(data)
        }

    useEffect(()=>{  

        sessionStorage.setItem('playerStat', JSON.stringify(myStateRef.current))

        let data = {
            name : myStateRef.current.name,
            hitPoint : myStateRef.current.actualHP,
            AC : myStateRef.current.AC,
            id : myStateRef.current.id
        }

        socket.emit('newStats', data)
        
    }, [myStateRef.current])

    useEffect(()=>{

        socket.on('dmg', data => {

            console.log('llego dmg: ', data.dmg)

            if(myStateRef.current.id === data.id){
                
                let result = myStateRef.current.actualHP - data.dmg

                if(result < 0) result = 0

                setStats({...stats, actualHP : result })

            }

        })

    }, [])

    const reset = () => {

        sessionStorage.removeItem('playerStat')

        setStats(playerInitial)

    }

    const rollInit = () =>{

            let result = returnDice(20, myStateRef.current.bonusInit)

            return {
                name : stats.name,
                bonusInit : stats.bonusInit,
                init : result.result,
                id : stats.id,
                AC : stats.AC,
                totalHP : stats.totalHP,
                actualHP : stats.actualHP
            }

    }

    const switchInitRolled = () => {

        setStats ({...myStateRef.current, initRolled : myStateRef.current.initRolled! })

    }

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) =>{

        setStats({...myStateRef.current, [e.currentTarget.name] : e.currentTarget.value})


    }

    return {
        myStateRef,
        reset,
        onChange,
        switchInitRolled,
        rollInit
    }

}