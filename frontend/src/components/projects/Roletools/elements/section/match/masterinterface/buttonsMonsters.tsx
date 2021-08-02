import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { buttonState, monsterStat } from '../../../../Interfaces/interfaces'
import { attackDMG, returnDice } from '../logic-dice'
import { useMaster } from '../../../../User/ActualMatch/Master/masterContext'
import { ButtonMonster } from '../styled-match'
import { registerText } from '../../../../Interfaces/interfaces'
import { createInitOrder } from './addUnitOrder'



const ButtonsMonster = (props : {   options : any,
                                    setOptions : Dispatch<SetStateAction<any>>
                                    }) => {

        const {monsterStat, setMonsterStat, initOrder, setInitOrder, registerText, addRegisterText} = useMaster()!

        const [buttonsState, setButtonsState] = useState<buttonState>({

                init : false,
                duplicate : false,
                attack : false,
                passTurn : false

        })

        useEffect(() => {

                let oldButtonState = {...buttonsState}

                let newTargets = monsterStat.filter(e => e.initEnabled===true)

                let coincidence = false

                newTargets.map(target => { 
                
                        if(initOrder.find(e => e.id === target.id)) coincidence = true

                })

                oldButtonState = checkInitButton(coincidence, oldButtonState)

                oldButtonState = checkDuplicateButton(oldButtonState)
               
                oldButtonState = checkAttackButton(oldButtonState)

                oldButtonState = checkPassTurnButton(oldButtonState)

                setButtonsState({...oldButtonState})


        }, [monsterStat, initOrder])

        const checkInitButton = (coincidence : boolean, oldButtonState : buttonState) => {

                if (monsterStat.find(e => e.initEnabled===true) && !coincidence) return {...oldButtonState, init : true}

                return {...oldButtonState, init : false}

        }

        const checkDuplicateButton = (oldButtonState : buttonState) => {

                if(monsterStat.filter(e => e.initEnabled === true).length === 1) return {...oldButtonState, duplicate : true}

                return {...oldButtonState, duplicate : false}


        }


        const checkAttackButton = (oldButtonState : buttonState) => {

                let target = initOrder.filter(e => e.selected === true)

                let attacker = initOrder[0]

                if ( target.length === 1 && target[0].id!==attacker.id) {
                     
                     return {...oldButtonState, attack : true}

                } else { return {...oldButtonState, attack : false} }


        }

        const checkPassTurnButton = (oldButtonState : buttonState) => {

                if (initOrder.length>1) return {...oldButtonState, passTurn : true}

                else return {...oldButtonState, passTurn : false}

        }
        
        const addMonster = () => {

                const monster = [{
                        name : '',
                        AC : 0,
                        init : 0,
                        attack : 0,
                        diceDmg : 4,
                        bonusDmg : 0,
                        hitPoint : 1,
                        initEnabled : false,
                        initRolled : false,  
                        rolled   : 0,
                        dmg      : 0,
                        id : monsterStat.length > 0 ? createId() : 0

                }]
       
                const newMonster = monsterStat.concat(monster)

                setMonsterStat([...newMonster])
       
}

        const createId = () => {

                let ids = monsterStat.map(e => {

                        return e.id

                })

                let maxId = Math.max.apply(null, ids)

                return maxId + 1

        }

        const duplicateMonster = () => {

                let monster = monsterStat.filter(e => e.initEnabled === true)[0]

                monster = {...monster, initEnabled : false, initRolled : false, id : createId()}
       
                const newMonster = monsterStat.concat(monster)

                setMonsterStat([...newMonster])
        }

        const rollInit = () => {

                let newInitArray = monsterStat.map(monster => {

                        if(monster.initEnabled){

                                return {...monster, rolled : returnDice(20, monster.init).result}

                        } else {

                                return monster
                        }

                })

                newInitArray = createInitOrder(initOrder, setInitOrder, newInitArray)

                setMonsterStat([...newInitArray])

        }

        const attack = () => {

                let target = monsterStat.find(e => e.id === initOrder.find(e => e.selected)!.id)!

                let attacker = monsterStat.find(e => e.id === initOrder[0].id)!

                let result = attackDMG(target.AC, attacker.bonusDmg, attacker.diceDmg, attacker.attack, props.options.ventaja)

                let register = {
                        name : attacker.name,
                        dice : 20,
                        rolled: result.rolled,
                        ventaja : props.options.ventaja,
                        critic : result.critic,
                        bonusDice : attacker.attack,
                        diceDmg : attacker.diceDmg,
                        dmg : result.dmg,
                        bonusDmg : attacker.bonusDmg,
                        exit : result.exit
                }

                addRegister(register)

                if(result.exit){

                        let newStateMonster = monsterStat.map(monster => {

                                if(monster.id === target.id){

                                        let resultHitPoint = monster.hitPoint - result.dmg
                                
                                        return {...monster, hitPoint : resultHitPoint < 0 ? 0 : resultHitPoint }

                                } else {

                                        return monster
                                }

                })

                        setMonsterStat([...newStateMonster])

                } 

        }

        const addRegister = (data : registerText) => {
        
                addRegisterText(data)    //VERIFICAR SI FUNCIONA ESTO
        }

        const passTurn = () =>{

                let oldOrder = [...initOrder]

                let firstElement = oldOrder.shift()!

                let newOrder = oldOrder.concat(firstElement)

                setInitOrder([...newOrder])

        }


    return(

                <div id='monster-buttons'>

                        <ButtonMonster isActive={true} onClick={addMonster}>Agregar</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.duplicate} onClick={() => buttonsState.duplicate && duplicateMonster()}>Duplicar</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.init} onClick={() => buttonsState.init && rollInit()}>Iniciativa</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.attack} onClick={() => buttonsState.attack && attack()}>Ataque</ButtonMonster>
                        <ButtonMonster isActive={buttonsState.passTurn} onClick={() => buttonsState.passTurn && passTurn()}>Pasar Turno</ButtonMonster>

                </div>
    )


}


export default ButtonsMonster;