import React, { useEffect, useState } from 'react'
import PlayerContext from './playerContext'
import {useRegisterText} from '../registerText'
import { usePlayerStats } from './customHooks/playerStats'
import { usePlayerInitOrder } from './customHooks/initOrder'
import { useAttacks } from './customHooks/attacks'
import socket from '../../../../../service/socket'



type Props = {
    children : React.ReactNode
}


const PlayerState = ({children} : Props) => {

    const playerStats  = usePlayerStats()

    const initOrder = usePlayerInitOrder()

    const attacks = useAttacks()

    const registerText = useRegisterText()

    const [actualMatch, setActualMatch] = useState<string>(sessionStorage.getItem('actualMatch')! || '')

    const [CD, setCD] = useState(0)

    useEffect(()=>{

        socket.on('newCD', (cd : number) => {

            console.log('llegando CD')

            cd > 0 ? setCD(cd)
                    : setCD(0)

        })


    }, [])


    const checkActualMatch = (match : string) => {

        if (actualMatch !== match) {

            resetPlayerSession()

            setActualMatch(match)
        }

    }

    useEffect(() => {
        
        sessionStorage.setItem('actualMatch', actualMatch)
      
    }, [actualMatch])

    useEffect(()=>{

        if(!initOrder.myStateRef.current.length) playerStats.switchInitRolled() 
    
    }, [initOrder.myStateRef.current])


    const resetPlayerSession = () => {

        registerText.resetRegister()
        playerStats.reset()
        initOrder.reset()
        attacks.reset()

    }

    


    return(
                <PlayerContext.Provider value={{checkActualMatch, 
                                                playerStats, 
                                                initOrder, 
                                                attacks, 
                                                registerText, 
                                                resetPlayerSession,
                                                CD}}> 
                                                
                                                
                                                {children} </PlayerContext.Provider>

    )

}


export default PlayerState;