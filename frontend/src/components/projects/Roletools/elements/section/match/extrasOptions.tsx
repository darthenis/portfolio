import React, { Dispatch, SetStateAction, useState } from 'react'
import { useNavigation } from '../../../navegation/navigationContext'
import { useMaster } from '../../../User/ActualMatch/Master/masterContext'
import { usePlayer } from '../../../User/ActualMatch/Player/playerContext'
import { returnDice } from './logic-dice'






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

        setRoll({...roll, [e.currentTarget.name] : parseInt(e.currentTarget.value)})

    }

    const onChangeOptions = (e : React.ChangeEvent<HTMLInputElement>) => {

        navigation.actualMatch === 'Player' ? props.setOptions(e.currentTarget.value)

        : props.setOptions({...props.options, ventaja : e.currentTarget.value})
    }
    
    const checkedOption = () => {

        let page = navigation.actualPage

        if (page === 'Player' && props.options === 'none') return true

        else if (props.options.ventaja === 'none') return true

        else return false
  
    }


    const rollDice = () => {

        if(navigation.actualPage==='Player') rollPlayer()

        else rollMaster()

    }

    const rollPlayer = () => {

        let result = repeatRoll(props.options.ventaja)

        let newRegister = { name : player.playerStats ? player.playerStats.name : '',
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

        player.addRegisterText(newRegister)

    }   

    const rollMaster = () =>{

        let result;

        result = repeatRoll(props.options.ventaja)

        let target = master.monsterStat.filter(e => e.initEnabled)

        let firstOrderList = master.monsterStat.filter (e => e.id === master.initOrder[0].id)

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

            master.addRegisterText(newRegister)


        } else if (master.initOrder.length > 0){

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

             master.addRegisterText(newRegister)

        }

        

    }


    const repeatRoll = (ventaja? : string) => {

        let resultTotal : number [] = []

        if(ventaja !== 'none') {

           for(let i = 1; i<=roll.dices; i++){

                let rolled = returnDice(roll.value, 0, ventaja)

                resultTotal = resultTotal.concat(rolled.result)

           }

        } else { 

            for(let i = 1; i<=roll.dices; i++){

                    let rolled = returnDice(roll.value, 0)
        
                    resultTotal = resultTotal.concat(rolled.result)
    
               }  

        }


        return resultTotal.reduce((a : number, b : number ) => a + b, roll.bonus)


    }


    return(

            <div className='buttons-options'>

                    <button onClick={rollDice}>Roll</button>
                    <div id='dice-select'>
                        <label>Dados:</label>
                        <input type="number" value={roll.dices} name='dices' onChange={(e)=> onChange(e)}/>
                        <label>caras:</label>
                        <select name='dice' onChange={(e) => onChange(e)}> 
                                                <option value={4} selected>4</option>
                                                <option value={6}>6</option>
                                                <option value={8}>8</option>
                                                <option value={10}>10</option>
                                                <option value={12}>12</option>
                                                <option value={20}>20</option>
                        </select>
                    </div>
                    <div id='bonus-options'>
                        <label>Bonus:</label>
                        <input type="number" value={roll.bonus} name='bonus' onChange={(e)=> onChange(e)}/>
                    </div>
                    <div id='radio-options'>
                        <label><input type='radio' value={'none'} checked={checkedOption()} name='ventaja' onChange={(e)=> onChangeOptions(e)}/> none</label>
                        <label><input type='radio' value={'ventaja'} name='ventaja' onChange={(e)=> onChangeOptions(e)}/> ventaja </label>
                        <label><input type='radio' value={'desventaja'} name='ventaja' onChange={(e)=> onChangeOptions(e)}/> desventaja </label>
                    </div>
            </div>


    )

}

export default ExtrasOptions;