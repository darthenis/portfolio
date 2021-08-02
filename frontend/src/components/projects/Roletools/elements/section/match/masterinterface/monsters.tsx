import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { initOrder, monsterStat } from '../../../../Interfaces/interfaces'
import { MonsterListDiv } from '../styled-match'
import { useMaster } from '../../../../User/ActualMatch/Master/masterContext'





const MonsterList = () => {

    const {monsterStat, setMonsterStat, initOrder, setInitOrder} = useMaster()!
    
    
    const onChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, 
        num : number) => {

              if(monsterStat){

                      const newMonster : monsterStat [] = monsterStat.map((monster) => {

                                      if(monster.id===num){

                                              if(e.target.type==='text'){

                                                      return {...monster, [e.target.name] : e.target.value}

                                              } else {

                                                      return {...monster, [e.target.name] : parseInt(e.target.value)}
                                              }

                                              

                                      } else { 
                                              
                                              return monster }

                      })

                      setMonsterStat([...newMonster])

              }
      
}


    const deleteMonster = (idMonster : number) => {

        const newMonsterStat = monsterStat.filter(monster => monster.id !== idMonster)

        deleteinitOrder(idMonster)

        setMonsterStat([...newMonsterStat])

    }

    const deleteinitOrder = (idMonster : number) => {

        const newInitOrder = initOrder.filter(initOrder => initOrder.id !== idMonster)

        setInitOrder([...newInitOrder])
        
}

   useEffect(() => {
  
                if(monsterStat.find(e => e.hitPoint === 0)){
                
                        let monster = monsterStat.filter(e => e.hitPoint===0)

                        deleteMonster(monster[0].id)
                }

    
        }, [monsterStat])


    const onCheck = (e : React.MouseEvent<HTMLDivElement, MouseEvent>, id : number) => {

        e.preventDefault()

        if(e.target === e.currentTarget){

                const newOnCheckArray : monsterStat [] = monsterStat.map(monster => {

                                if(monster.id===id){

                                        return {...monster, initEnabled : !monster.initEnabled}

                                } else {

                                        return monster
                                }

                })

                setMonsterStat([...newOnCheckArray])

        }

}


    return (
            <>

                {  monsterStat.map( (monster) => {

                    return(

                            <MonsterListDiv isActive={monster.initEnabled} 
                                            onClick={(e) => onCheck(e, monster.id)}
                                            isRolled={monster.initRolled}>
                                    <label>Nombre</label>
                                    <input type="text" name='name' value={monster.name} onChange={(e) => onChange(e, monster.id)}/>
                                    <label>Iniciativa</label>
                                    <input type="number" name='init' value={monster.init} onChange={(e) => onChange(e, monster.id)}/>
                                    <label>CA</label>
                                    <input type="number" name='AC' value={monster.AC} onChange={(e) => onChange(e, monster.id)}/>
                                    <label>Ataque</label>
                                    <input type="number" name='attack' value={monster.attack} onChange={(e) => onChange(e, monster.id)}/>
                                    <label>Dado de daño</label>
                                    <select name='diceDmg' value={monster.diceDmg} onChange={(e) => onChange(e, monster.id)}> 
                                            <option value={4} >d4</option>
                                            <option value={6}>d6</option>
                                            <option value={8}>d8</option>
                                            <option value={10}>d10</option>
                                            <option value={12}>d12</option>
                                    </select>
                                    <label>Bonus de daño</label>
                                    <input type="number" name='bonusDmg' value={monster.bonusDmg} onChange={(e) => onChange(e, monster.id)}/>
                                    <label>Puntos de golpe</label>
                                    <input type="number" name='hitPoint' value={monster.hitPoint} onChange={(e) => onChange(e, monster.id)}/>
                                    <button onClick={() => deleteMonster(monster.id)}>X</button>
                            </MonsterListDiv>
                    
                            ) 


                    })
            

                }

            </>


        )


}


export default MonsterList