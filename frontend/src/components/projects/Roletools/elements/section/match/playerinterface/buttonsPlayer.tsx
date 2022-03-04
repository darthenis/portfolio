import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { attackRolledSocket, buttonState } from '../../../../Interfaces/interfaces'
import { usePlayer } from '../contextMatch/Player/playerContext'
import { ButtonMonster } from '../styled-match'
import { useNavigation } from '../../../../navegation/navigationContext'
import socket from '../../../../service/socket'
import { attackDMG, returnDice } from '../logic-dice'


const ButtonsPlayer = (props : {options : any, setOptions : Dispatch<SetStateAction<any>>}) => {

        const {playerStats, initOrder, attacks} = usePlayer()!

        const { navigation } = useNavigation()!

        const [buttonsState, setButtonsState] = useState<buttonState>({

                init : false,
                duplicate : false,
                attack : false,
                passTurn : false

        })

        useEffect(() => {

                let oldButtonState = {...buttonsState}

                let newTargets = attacks.myStateRef.current.filter(e => e.selected===true)

                let coincidence = false

                newTargets.map(target => { 
                
                        if(initOrder.myStateRef.current.find(e => e.id === target.id)) coincidence = true

                })

                oldButtonState = checkInitButton(coincidence, oldButtonState)
               
                oldButtonState = checkAttackButton(oldButtonState)

                oldButtonState = checkPassTurnButton(oldButtonState)

                setButtonsState({...oldButtonState})


        }, [attacks.myStateRef.current, initOrder.myStateRef.current])


        const checkInitButton = (coincidence : boolean, oldButtonState : buttonState) => {

                if (!initOrder.myStateRef.current.find(e => e.id === playerStats.myStateRef.current.id)) return {...oldButtonState, init : true}

                return {...oldButtonState, init : false}

        }

        

        const checkAttackButton = (oldButtonState : buttonState) => {

                let target = initOrder.myStateRef.current.find(e => e.selected === true)

                let attacker = initOrder.myStateRef.current[0]

                let attackActive = attacks.myStateRef.current.find(e => e.selected === true)

                if ( target && attackActive && attacker.id === playerStats.myStateRef.current.id) {
                     
                     return { ...oldButtonState, attack : true }

                } else { return { ...oldButtonState, attack : false } }


        }

        const checkPassTurnButton = (oldButtonState : buttonState) => {

                if (initOrder.myStateRef.current.length){

                        if (initOrder.myStateRef.current[0].id === playerStats.myStateRef.current.id) return {...oldButtonState, passTurn : true}

                        return {...oldButtonState, passTurn : false}

                } else { return oldButtonState }

        }
        

        const attack = () => {

                let attack = attacks.myStateRef.current.find( e => e.selected === true)!

                let target = initOrder.myStateRef.current.find(e => e.selected === true)!

                let result = attackDMG(target.AC, attack.bonusDmg, attack.diceDmg, attack.attack, props.options.ventaja)                

                let attackRolled : attackRolledSocket = {       bonusDice : attack.attack,
                                                                bonusDmg : attack.bonusDmg,
                                                                rolle : result.rolled,
                                                                critic : result.critic,
                                                                exit : result.exit,
                                                                dmg : result.dmg,
                                                                diceDmg : attack.diceDmg,
                                                                ventaja : props.options.ventaja}

                let combatients = { attacker : playerStats.myStateRef.current.id,
                                    target : target.id}
                
                socket.emit('attackRolled', {match : navigation.actualMatch, data : attackRolled, combatients : combatients})
        }


        const passTurn = () =>{

               socket.emit('passTurn')

        }

        const rollInit = () => {

                let data = playerStats.rollInit()

                socket.emit('initRolled', { match : navigation.actualMatch, data : data})

        }


    return(

                <div id='player-buttons'>

                        <ButtonMonster isActive={true} onClick={attacks.addAttack}>Agregar</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.init} onClick={() => buttonsState.init && rollInit()}>Iniciativa</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.attack} onClick={() => buttonsState.attack && attack()}>Ataque</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.passTurn} onClick={() => buttonsState.passTurn && passTurn()}>Pasar Turno</ButtonMonster>

                </div>
    )


}


export default ButtonsPlayer;