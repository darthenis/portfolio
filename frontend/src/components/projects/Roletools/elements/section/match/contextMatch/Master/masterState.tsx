import React, { useEffect, useState } from 'react'
import MasterContext from './masterContext'
import { useRegisterText } from '../registerText'
import { useMonsterStats } from './customHooksStates/monsterStat'
import { useInitOrder } from './customHooksStates/initOrder'
import { usePlayerStats } from './customHooksStates/playerStats'
import socket from '../../../../../service/socket'
import { player, resultAttack } from '../../../../../Interfaces/interfaces'





type Props = {
    children : React.ReactNode
}

const MasterState = ({children}  : Props) => {

    const monsterStats = useMonsterStats()

    const initOrder = useInitOrder()

    const registerText = useRegisterText()

    const playerStats = usePlayerStats()

    const [actualMatch, setActualMatch] = useState<string>(sessionStorage.getItem('actualMatch')! || '')


    const checkActualMatch = (match : string) => {

        if (actualMatch !== match) {

            initOrder.resetInitOrder()
            playerStats.reset()
            registerText.resetRegister()
            monsterStats.resetMonsterStat()

            setActualMatch(match)
        }

    }

    useEffect(() => {
        
        sessionStorage.setItem('actualMatch', actualMatch)
      
    }, [actualMatch])
    
    
    useEffect(()=>{

        socket.on('playerInit', (data : player) => {

            playerStats.addPlayerStats(data)

        })

    }, [])

    useEffect(()=>{

        socket.emit('newRegisterText', registerText.myStateRef.current)

    }, [registerText.myStateRef.current])

    useEffect(()=>{

        initOrder.newInitOrder(playerStats.myStateRef.current) 

    }, [playerStats.myStateRef.current])

    useEffect(()=>{

        let newInitOrder = initOrder.myStateRef.current.map(e => {

            return {name :searchName(e.id),
                    init : e.init,
                    AC : e.AC,
                    state : generateState(e.id),
                    selected : false,
                    id : e.id}

            })

        socket.emit('newInitOrder', newInitOrder)

        let dead = monsterStats.myStateRef.current.find(e => e.actualHP <= 0)

        if(dead){ 
            
            monsterStats.deleteMonster(dead.id)

            initOrder.deleteInit(dead.id)
        
        }
    

    }, [initOrder.myStateRef.current, playerStats.myStateRef.current, monsterStats.myStateRef.current])

    const generateState = (id : number) => {

        let monster = monsterStats.findId(id)

        let player = playerStats.findId(id)

        if(monster) return calculateState(monster.actualHP, monster.totalHP)

        else if (player) return calculateState(player.actualHP, player.totalHP)

    }

    const calculateState = (totalHP : number, actualHP : number) => {

        let herida = Math.round((totalHP / actualHP)*100)

        if (herida < 100 && herida >= 75) return 'levemente herido'

        if (herida < 75 && herida >= 50) return 'herido'

        if (herida < 50 && herida >= 25) return 'muy herido'

        if (herida < 25) return 'moribundo'

        return 'sano'

    }

    const searchName = (id : number) => {

        let monster = monsterStats.findId(id)

        let player = playerStats.findId(id)

        if (monster) return monster.name

        if (player) return player.name

    }


    useEffect(()=>{

        socket.on('playerAttack', (result : resultAttack) => {

            let attacker = playerStats.findId(result.combatients.attacker)

            let targetMonster = monsterStats.findId(result.combatients.target)

            let targetPlayer = playerStats.findId(result.combatients.target)

            if(!attacker) return console.log('fail Attacker')

            if(!targetMonster && !targetPlayer) return console.log('fail target')

                let newRegister = { name : attacker.name,
                    dice : 20,
                    rolled : result.data.rolle,
                    ventaja : result.data.ventaja,
                    critic : result.data.critic,
                    bonusDice : result.data.bonusDice,
                    diceDmg : result.data.diceDmg,
                    dmg : 0,
                    exit : result.data.exit}

                if(result.data.exit) {

                   targetMonster && monsterStats.dmg(targetMonster.id, result.data.dmg)

                   targetPlayer && sendDmg(targetPlayer.id, result.data.dmg)

                    newRegister = {...newRegister, dmg : result.data.dmg}

                }
           
                registerText.addRegisterText(newRegister)
            
        })

    }, [])

    const sendDmg = (id : number, dmg : number,) => {

        socket.emit('dmg', { 
                            id: id, 
                            dmg : dmg})

    }

    const monsterAttack = (ventaja : boolean | null) => {

        let newRegister = monsterStats.attack(initOrder.myStateRef.current, ventaja, playerStats.myStateRef.current)

        registerText.addRegisterText(newRegister.register)

        if(newRegister.idTarget !== 0 ) sendDmg(newRegister.idTarget, newRegister.register.dmg)

    }


    const resetMatchesSession = () => {

        initOrder.resetInitOrder()
        monsterStats.resetMonsterStat()
        registerText.resetRegister()
     
    }

    const rollInit = () => {

        let initRolled = monsterStats.rollInit()

        initOrder.createInitOrder(initRolled)

    }

    const resetInitOrder = () =>{

        playerStats.reset()

        initOrder.resetInitOrder()

    }

    

    return(

        <MasterContext.Provider value={{checkActualMatch,
                                        monsterStats,
                                        monsterAttack, 
                                        initOrder, 
                                        registerText, 
                                        resetMatchesSession, 
                                        rollInit, 
                                        playerStats, 
                                        resetInitOrder}}>

            {children}

        </MasterContext.Provider>

    )

}

export default MasterState;