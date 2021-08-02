import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { buttonState } from '../../../../Interfaces/interfaces'
import { returnDice } from '../logic-dice'
import { usePlayer } from '../../../../User/ActualMatch/Player/playerContext'
import { ButtonMonster } from '../styled-match'
import socket from '../../../../service/socket'
import { useNavigation } from '../../../../navegation/navigationContext'


const ButtonsPlayer = () => {

        const {playerStats, setPlayerStats, playerInitOrder, playerAttacks, setPlayerAttacks} = usePlayer()!

        const { navigation } = useNavigation()!

        const [buttonsState, setButtonsState] = useState<buttonState>({

                init : false,
                duplicate : false,
                attack : false,
                passTurn : false

        })

        useEffect(() => {

                let oldButtonState = {...buttonsState}

                let newTargets = playerAttacks.filter(e => e.selected===true)

                let coincidence = false

                newTargets.map(target => { 
                
                        if(playerInitOrder.find(e => e.id === target.id)) coincidence = true

                })

                oldButtonState = checkInitButton(coincidence, oldButtonState)
               
                oldButtonState = checkAttackButton(oldButtonState)

                oldButtonState = checkPassTurnButton(oldButtonState)

                setButtonsState({...oldButtonState})


        }, [playerAttacks, playerInitOrder])


        const checkInitButton = (coincidence : boolean, oldButtonState : buttonState) => {

                if (!playerStats.initRolled) return {...oldButtonState, init : true}

                return {...oldButtonState, init : false}

        }

        useEffect(()=>{

                if(!playerInitOrder.length) setPlayerStats({...playerStats, initRolled : false}) 
            
            }, [playerInitOrder])


        const checkAttackButton = (oldButtonState : buttonState) => {

                let target = playerInitOrder.find(e => e.selected === true)

                let attacker = playerInitOrder[0]

                if ( target && attacker.id === playerStats.playerId) {
                     
                     return {...oldButtonState, attack : true}

                } else { return {...oldButtonState, attack : false} }


        }

        const checkPassTurnButton = (oldButtonState : buttonState) => {

                if (playerInitOrder.length>1) return {...oldButtonState, passTurn : true}

                else return {...oldButtonState, passTurn : false}

        }
        
        const addAttack = () => {

                const newAttack = {
                                name : '',
                                attack : 0,
                                diceDmg : 4,
                                bonusDmg : 0,
                                selected : false,
                                id: createId()
                }


                setPlayerAttacks([...playerAttacks.concat(newAttack)])
       
        }

        const createId = () => {

                let ids = playerAttacks.map(e => {

                        return e.id

                })

                let maxId = Math.max.apply(null, ids)

                return maxId + 1

        }


        const rollInit = () => {

                let diceRolled = returnDice(20, playerStats.init)

                sendInitRolled(diceRolled.result)

                setPlayerStats({...playerStats, initRolled : true})
               
        }


        const sendInitRolled = (result : number) => {

                let myStats = {
                        name : playerStats.name,
                        hitpoint : playerStats.hitPoint,
                        init : result,
                        bonusInit : playerStats.init,
                        playerID : playerStats.playerId
                }

                let data = {match : navigation.actualMatch, data : myStats}


                socket.emit('initRolled', data)


        }

        const attack = () => {

                

        }


        const passTurn = () =>{

               

        }


    return(

                <div id='player-buttons'>

                        <ButtonMonster isActive={true} onClick={addAttack}>Agregar</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.init} onClick={() => buttonsState.init && rollInit()}>Iniciativa</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.attack} onClick={() => buttonsState.attack && attack()}>Ataque</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.passTurn} onClick={() => buttonsState.passTurn && passTurn()}>Pasar Turno</ButtonMonster>

                </div>
    )


}


export default ButtonsPlayer;