import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { buttonState } from '../../../../Interfaces/interfaces'
import { useMaster } from '../contextMatch/Master/masterContext'
import { ButtonMonster } from '../styled-match'
import { registerText } from '../../../../Interfaces/interfaces'



const ButtonsMonster = (props : {   options : any,
                                    setOptions : Dispatch<SetStateAction<any>>
                                    }) => {

        const {monsterStats, initOrder, registerText, rollInit, monsterAttack, playerStats} = useMaster()!

        const [buttonsState, setButtonsState] = useState<buttonState>({

                init : false,
                duplicate : false,
                attack : false,
                passTurn : false

        })

        useEffect(() => {

                let oldButtonState = {...buttonsState}

                let newTargets = monsterStats.myStateRef.current.filter(e => e.selected===true)

                let coincidence = false

                newTargets.map(target => { 
                
                        if(initOrder.findId(target.id)) coincidence = true

                })

                oldButtonState = checkInitButton(coincidence, oldButtonState)

                oldButtonState = checkDuplicateButton(oldButtonState)
               
                oldButtonState = checkAttackButton(oldButtonState)

                oldButtonState = checkPassTurnButton(oldButtonState)

                setButtonsState({...oldButtonState})


        }, [monsterStats.myStateRef.current, initOrder.myStateRef.current])

        const checkInitButton = (coincidence : boolean, oldButtonState : buttonState) => {

                if (monsterStats.myStateRef.current.find(e => e.selected===true) && !coincidence) return {...oldButtonState, init : true}

                return {...oldButtonState, init : false}

        }

        const checkDuplicateButton = (oldButtonState : buttonState) => {

                if(monsterStats.myStateRef.current.filter(e => e.selected === true).length === 1) return {...oldButtonState, duplicate : true}

                return {...oldButtonState, duplicate : false}


        }


        const checkAttackButton = (oldButtonState : buttonState) => {

                let target = initOrder.myStateRef.current.find(e => e.selected === true)!

                let attacker = initOrder.myStateRef.current[0]

                let notPlayer = attacker && monsterStats.myStateRef.current.find(e => e.id === attacker.id)

                if ( target && target.id!==attacker.id && notPlayer) {
                     
                     return {...oldButtonState, attack : true}

                } else { return {...oldButtonState, attack : false} }


        }

        const checkPassTurnButton = (oldButtonState : buttonState) => {

                if (initOrder.myStateRef.current.length>1) return {...oldButtonState, passTurn : true}

                else return {...oldButtonState, passTurn : false}

        }
        

    return(

                <div id='monster-buttons'>

                        <ButtonMonster isActive={true} onClick={monsterStats.addMonster}>Agregar</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.duplicate} onClick={() => buttonsState.duplicate && monsterStats.duplicate()}>Duplicar</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.init} onClick={() => buttonsState.init && rollInit()}>Iniciativa</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.attack} onClick={() => buttonsState.attack && monsterAttack(props.options.ventaja)}>Ataque</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.passTurn} onClick={() => buttonsState.passTurn && initOrder.passTurn()}>Pasar Turno</ButtonMonster>

                </div>
    )


}


export default ButtonsMonster;