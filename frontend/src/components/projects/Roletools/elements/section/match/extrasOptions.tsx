import React, { Dispatch, SetStateAction, useState } from 'react'
import { useNavigation } from '../../../navegation/navigationContext'
import socket from '../../../service/socket'
import { useMaster } from './contextMatch/Master/masterContext'
import { usePlayer } from './contextMatch/Player/playerContext'
import { customRoll, returnDice } from './logic-dice'
import { ButtonMonster } from './styled-match'



const ExtrasOptions = (props : {options : any, setOptions : Dispatch<SetStateAction<any>>}) => {

    const master = useMaster()!

    const player = usePlayer()!

    const {navigation} = useNavigation()!

    const [roll, setRoll] = useState({
        dices : 1,
        value : 4,
        bonus : 0,
    })

    const onChange = (e : React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {

        if(e.currentTarget.name === 'ventaja'){

            props.setOptions({...props.options, [e.currentTarget.name] : checkVentaja(e.currentTarget.value)})

        } else {

            setRoll({...roll, [e.currentTarget.name] : parseInt(e.currentTarget.value)})

        }
        
    }

    const checkVentaja = (ventaja : string) => {

        if(ventaja === 'ventaja') return true

        if(ventaja === 'desventaja') return false
        
        return null


    }

    const rollDice = () => {

        if(navigation.actualPage==='Player') rollPlayer()

        else rollMaster()

    }

    const rollPlayer = () => {

        let result = customRoll(roll.value, roll.dices, roll.bonus, props.options.ventaja)

        let newRegister = { name : player.playerStats ? player.playerStats.myStateRef.current.name : '',
                            dice : roll.value,
                            rolled: result,
                            ventaja : props.options.ventaja,
                            critic : false,
                            bonusDice : roll.bonus,
                            diceDmg : 0,
                            dmg : 0,
                            bonusDmg : 0,
                            exit : returnExit(result), 
                        }

        socket.emit('customRoll', newRegister)

    }
    
    const returnExit = (result : number) => {

        if (player.CD > 0) { 
            
            if(result >= player.CD) return true 
            return false
        }

        else return null
    }

    const rollMaster = () =>{

        let result = customRoll(roll.value, roll.dices, roll.bonus, props.options.ventaja)

        let target = master.monsterStats.myStateRef.current.filter(e => e.selected)

        let firstOrderList = master.monsterStats.myStateRef.current.filter (e => e.id === master.initOrder.myStateRef.current[0].id)

        let newRegister;

        if(target.length === 1) {

            newRegister = { name : target[0].name,
                                dice : roll.value,
                                rolled: result,
                                ventaja : props.options.ventaja,
                                critic : false,
                                bonusDice : roll.bonus,
                                diceDmg : 0,
                                dmg : 0,
                                bonusDmg : 0,
                                exit : null,
            }

            master.registerText.addRegisterText(newRegister)


        } else if (master.initOrder.myStateRef.current.length > 0){

            newRegister = { name : firstOrderList[0].name,
                            dice : roll.value,
                            rolled: result,
                            ventaja : props.options.ventaja,
                            critic : false,
                            bonusDice : roll.bonus,
                            diceDmg : 0,
                            dmg : 0,
                            bonusDmg : 0,
                            exit : null,

             }

             master.registerText.addRegisterText(newRegister)

        }

        

    }



    return(

            <div className='buttons-options'>

                
                    <div className='input-options'>
                        <label>Dados:</label>
                        <input type="number" value={roll.dices} name='dices' onChange={(e)=> onChange(e)}/>
                    </div>
                    <div className='options-select'>
                        <label>Caras:</label>
                        <select name='value' onChange={(e) => onChange(e)}> 
                                                    <option value={4} selected>4</option>
                                                    <option value={6}>6</option>
                                                    <option value={8}>8</option>
                                                    <option value={10}>10</option>
                                                    <option value={12}>12</option>
                                                    <option value={20}>20</option>
                        </select>
                    </div>
                    
                    <div className='input-options'>
                        <label>Bonus:</label>
                        <input type="number" value={roll.bonus} name='bonus' onChange={(e)=> onChange(e)}/>
                    </div>
                    <div className='options-select'>
                        <label>Ventaja</label>
                        <select  name='ventaja' onChange={(e) => onChange(e)}> 
                                                <option value={'none'} selected>none</option>
                                                <option value={'ventaja'}>ventaja</option>
                                                <option value={'desventaja'}>desventaja</option>
                        </select>
                    </div>
                    
                    <ButtonMonster isActive={true} onClick={rollDice}>Roll</ButtonMonster>

            </div>


    )

}

export default ExtrasOptions;