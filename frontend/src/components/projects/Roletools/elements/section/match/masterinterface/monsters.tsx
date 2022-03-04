import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { initOrder, monsterStat } from '../../../../Interfaces/interfaces'
import { MonsterListDiv } from '../styled-match'
import { useMaster } from '../contextMatch/Master/masterContext'





const MonsterList = () => {

    const { monsterStats, initOrder } = useMaster()!


    const onCheck = (e : React.MouseEvent<HTMLDivElement, MouseEvent>, id : number) => {

        e.preventDefault()

        if(e.target === e.currentTarget){

                monsterStats.selectMonster(id)

        }

        }
        
    const deleteMonster = (id : number) => {

        monsterStats.deleteMonster(id)

        initOrder.deleteInit(id)

    }


    return (
            <>
                {  monsterStats.myStateRef.current.map( (monster) => {

                    return(

                            <MonsterListDiv isActive={monster.selected} 
                                            onClick={(e) => onCheck(e, monster.id)}
                                            isRolled={monster.initRolled}>
                                        
                                    <label>Nombre</label>
                                    <input type="text" name='name' value={monster.name} onChange={(e) => monsterStats.onChange(e, monster.id)}/>
                                    <label>Iniciativa</label>
                                    <input type="number" name='bonusInit' value={monster.bonusInit} onChange={(e) => monsterStats.onChange(e, monster.id)}/>
                                    <label>CA</label>
                                    <input type="number" name='AC' value={monster.AC} onChange={(e) => monsterStats.onChange(e, monster.id)}/>
                                    <label>Ataque</label>
                                    <input type="number" name='attack' value={monster.attack} onChange={(e) => monsterStats.onChange(e, monster.id)}/>
                                    <label>Dado de daño</label>
                                    <select name='diceDmg' value={monster.diceDmg} onChange={(e) => monsterStats.onChange(e, monster.id)}> 
                                            <option value={4} >d4</option>
                                            <option value={6}>d6</option>
                                            <option value={8}>d8</option>
                                            <option value={10}>d10</option>
                                            <option value={12}>d12</option>
                                    </select>
                                    <label>Bonus de daño</label>
                                    <input type="number" name='bonusDmg' value={monster.bonusDmg} onChange={(e) => monsterStats.onChange(e, monster.id)}/>
                                    <label>Vida total</label>
                                    <input type="number" name='totalHP' value={monster.totalHP} onChange={(e) => monsterStats.onChange(e, monster.id)}/>
                                    <label>Vida actual</label>
                                    <input type="number" name='actualHP' value={monster.actualHP} onChange={(e) => monsterStats.onChange(e, monster.id)}/>
                                    <button onClick={() => deleteMonster(monster.id)}>X</button>
                            </MonsterListDiv>
                    
                            ) 


                    })
            

                }

            </>


        )


}


export default MonsterList