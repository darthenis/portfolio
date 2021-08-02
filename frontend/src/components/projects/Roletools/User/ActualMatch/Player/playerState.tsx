import React, { useEffect, useState } from 'react'
import PlayerContext from './playerContext'
import { registerText, playerInitOrder, playerStats, playerAttacks} from '../../../Interfaces/interfaces'
import {useRegisterText} from '../registerText'


type Props = {
    children : React.ReactNode
}

const playerInitial = {

    name : '',
    init : 0,
    initRolled : false,
    playerId : Math.floor((1 + Math.random()) * 0x10000),  
    AC : 0,
    hitPoint : 1

}

const playerAttackInitial = [{
                name : '',
                attack : 0,
                diceDmg : 4,
                bonusDmg : 0,
                selected : false,
                id: 1}]


const PlayerState = ({children} : Props) => {

    const [playerStats, setPlayerStats] = useState<playerStats>((JSON.parse(sessionStorage.getItem('playerStat')!)|| playerInitial))

    const [playerInitOrder, setPlayerInitOrder] = useState<playerInitOrder[]>(JSON.parse(sessionStorage.getItem('playerInitOrder')!)|| [])

    const [playerAttacks, setPlayerAttacks] = useState<playerAttacks[]>(JSON.parse(sessionStorage.getItem('playerAttacks')!)|| playerAttackInitial)

    const {registerText, addRegisterText, resetRegister} = useRegisterText()

    useEffect(()=>{  

        sessionStorage.setItem('playerStat', JSON.stringify(playerStats))
        
    }, [playerStats])

    useEffect(()=>{  

        sessionStorage.setItem('playerAttacks', JSON.stringify(playerAttacks))
        
    }, [playerAttacks])

    useEffect(() => {

        sessionStorage.setItem('playerInitOrder', JSON.stringify(playerInitOrder))

    }, [playerInitOrder])

    
    const resetPlayerSession = () => {

        sessionStorage.removeItem('playerStat')
        sessionStorage.removeItem('playerInitOrder')
        sessionStorage.removeItem('playerAttacks')

        resetRegister()
        setPlayerStats(playerInitial)
        setPlayerInitOrder([])
        setPlayerAttacks([])

    }

    const selectUnitInitOrder = (id : number) => {

        let newInitOrder = playerInitOrder.map(e => {

                            if(e.id === id) return {...e, selected : e.selected!}

                            return {...e, selected : false}

        })

        setPlayerInitOrder([...newInitOrder])

    }


    return(
                <PlayerContext.Provider value={{playerStats, 
                                                setPlayerStats,
                                                playerAttacks,
                                                setPlayerAttacks, 
                                                playerInitOrder, 
                                                setPlayerInitOrder,
                                                selectUnitInitOrder, 
                                                registerText, 
                                                addRegisterText, 
                                                resetRegister}}> 
                                                
                                                
                                                {children} </PlayerContext.Provider>

    )

}


export default PlayerState;