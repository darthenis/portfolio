import {useEffect, useRef, useState} from 'react'
import { monsterStat, initOrder, playerStats, player } from '../../../../../../Interfaces/interfaces'
import { attackDMG, returnDice } from '../../../logic-dice'




export const useMonsterStats = () => {

    const [list, _setList] = useState<monsterStat[]>(JSON.parse(sessionStorage.getItem('monsterStat')!)||[])

    const myStateRef = useRef(list)
    const setList = (data : monsterStat[]) => {
            myStateRef.current = data
            _setList(data)
    }

    useEffect(() => {

        sessionStorage.setItem('monsterStat', JSON.stringify(myStateRef.current))
      
    }, [myStateRef.current])

    const resetMonsterStat = () => {

        setList([])

        sessionStorage.removeItem('monsterStat')

    }

    const onChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, 
        id : number) => {

              if(list){

                      const newMonster : monsterStat [] = myStateRef.current.map((monster) => {

                                      if(monster.id===id){

                                              if(e.target.type==='text'){

                                                      return {...monster, [e.target.name] : e.target.value}

                                              } else {

                                                      return {...monster, [e.target.name] : parseInt(e.target.value)}
                                              }
                       
                                      } else { 
                                              
                                              return monster }

                      })

                      setList([...newMonster])

              }
      
    }

    const selectMonster = (id : number) => {

        let newSelectInit = myStateRef.current.map(e => {

                        if(e.id === id) return {...e, selected : !e.selected }

                        return e

        })

        setList([...newSelectInit])

    }

    const addMonster = () => {

        const monster = [{
                name : '',
                AC : 0,
                bonusInit : 0,
                init: 0,
                attack : 0,
                diceDmg : 4,
                bonusDmg : 0,
                totalHP : 1,
                actualHP : 1,
                selected : false,
                initRolled : false,  
                rolled   : 0,
                dmg      : 0,
                id : list.length > 0 ? createId() : 0

        }]

        const newMonster = myStateRef.current.concat(monster)

        setList([...newMonster])

    }

    const createId = () => {

        let ids = list.map(e => {

                return e.id

        })

        let maxId = Math.max.apply(null, ids)

        return maxId + 1

    }

    const deleteMonster = (id : number) =>{

        let newMonsters = myStateRef.current.filter(e => e.id !== id)

        setList([...newMonsters])

    }

    const duplicate = () => {

        let monster = myStateRef.current.filter(e => e.selected === true)[0]

        monster = {...monster, selected : false, initRolled : false, id : createId()}

        const newMonster = myStateRef.current.concat(monster)

        setList([...newMonster])
}

    const rollInit = () => {

        let rolledInitResult = myStateRef.current.map(e => {

                if(e.selected){

                        return {...e, init : returnDice(20, e.bonusInit).result, selected : false, initRolled : true}

                } else {

                        return {...e, selected : false}
                }

        })
        
        setList([...rolledInitResult])

        return [...rolledInitResult]

    }

    const initEnabledOff = () => {

        const newElement = myStateRef.current.map( monster => {

                        if(monster.selected) return {...monster, initEnabled : false, initRolled : true}

                        return monster  

        })


        setList([...newElement])
    }

    const attack = (initOrder : initOrder[], ventaja : boolean | null, playerStats : player[]) => {

                let target : player | monsterStat | undefined

                let monsterTargeted = true

                let selectInitOrder = initOrder.find(e => e.selected === true)!
                
                target = myStateRef.current.find(e => e.id === selectInitOrder.id)

                if (!target) { 
                    
                    target = playerStats.find(e => e.id === selectInitOrder.id)!

                    monsterTargeted = false
                } 

                let attacker = myStateRef.current.find(e => e.id === initOrder[0].id)!

                let result = attackDMG(target.AC, attacker.bonusDmg, attacker.diceDmg, attacker.attack, ventaja)

                let register = {
                        name : attacker.name,
                        dice : 20,
                        rolled: result.rolled,
                        ventaja : ventaja,
                        critic : result.critic,
                        bonusDice : attacker.attack,
                        diceDmg : attacker.diceDmg,
                        dmg : result.dmg,
                        bonusDmg : attacker.bonusDmg,
                        exit : result.exit
                }

                monsterTargeted && dmg(target.id, result.dmg)

                return {    register : register, 
                            idTarget : target.id }

        }
    
    const dmg = (id : number, dmg : number) => {

        console.log('id: ', id, 'daño: ', dmg)

        let newDmged = myStateRef.current.map(e => {

            console.log('actualHP: ', e.actualHP)

            if(e.id === id) return {...e, actualHP : (e.actualHP - dmg)}

            return e

        })

        setList([...newDmged])

    }

    const findId = (id : number) => {

        let check = myStateRef.current.find(e => e.id === id)

        return check

    }


    return {

        myStateRef,
        onChange,
        resetMonsterStat,
        selectMonster,
        addMonster,
        duplicate,
        deleteMonster,
        rollInit,
        initEnabledOff,
        attack, 
        dmg,
        findId

    }

}