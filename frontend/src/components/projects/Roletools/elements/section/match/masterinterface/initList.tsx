import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { initOrder, monsterStat, player } from '../../../../Interfaces/interfaces'
import { UnitInit } from '../styled-match'
import { useMaster } from '../../../../User/ActualMatch/Master/masterContext'
import { addPlayerInit } from './addUnitOrder'
import { useNavigation } from '../../../../navegation/navigationContext'
import socket from '../../../../service/socket'


const InitList = () => {

        const {monsterStat, setMonsterStat, initOrder, setInitOrder, selectUnitInit} = useMaster()!

        const { navigation } = useNavigation()!

        const [cd, setCD] = useState(0)

        const onChangeCD = (e : React.ChangeEvent<HTMLInputElement>) => {

                setCD(parseInt(e.currentTarget.value))

        }

        useEffect(() => {
                if(cd){

                        console.log('cd no es 0, es: ', cd)

                }
        }, [cd])

        useEffect(()=>{

                let data = { match : navigation.actualMatch, data : initOrder}

                socket.emit('newInitOrder', data)


        }, [initOrder])


        useEffect(()=>{


                socket.on('initRolled', (playerStats) => {

                        addPlayerInit(initOrder, setInitOrder, playerStats)

                })

        })

        

        
        const returnStat = (id : number, type : string) => {

                let monster = monsterStat.filter(e => e.id === id)

                if(monster.length){

                        let name = monster[0].name

                        let hitPoint = monster[0].hitPoint

                        if(name) return name

                        if(hitPoint) return hitPoint

                } else {


                        //return players stats



                }

                


                

               

        }

        const passTurn = (id : number, action : string) => {

                let monsterIndex = initOrder.findIndex(e => e.id === id)

                let newOrder = [...initOrder]

                let element = newOrder.splice(monsterIndex, 1)

                action === 'up' ? newOrder.splice(monsterIndex-1, 0, element[0])

                        : newOrder.splice(monsterIndex+1, 0, element[0])
                
                setInitOrder([...newOrder])

                }

        const deleteinitOrder = () => {

                setInitOrder([])

                const newElement = monsterStat.map( monster => {

                        if(monster.initRolled) return {...monster, initRolled : false}

                        return monster  

                })


                setMonsterStat([...newElement])


        }

        const firstPlace = (id : number) =>{

                let index = initOrder.findIndex(e => e.id === id)

                if(index===0) {
                        
                        return true

                }

                return false

        }

        const checkSelect = (id : number) => {

                let select = initOrder.filter(e => e.id === id)  //verificar si es necesaria la funcion

                if(select.length) return select[0].selected

                return false
            
            }

        return(

                <div className='list-init'>

                        <div>

                                <div className='title-init'>
                                                
                                                        <i onClick={deleteinitOrder} className="fas fa-times-circle"></i>
                                                        Iniciativas
                                </div>

                                        { initOrder.map( (unit : initOrder ) => {

                                                return  <UnitInit isActive={checkSelect(unit.id)} isFirst={firstPlace(unit.id)} className='init-unit'>
                                                                        
                                                                        <div onClick={() => selectUnitInit(unit.id)}>
                                                                                <div>Iniciativa: {unit.init}</div>
                                                                                <div>Nombre: {returnStat(unit.id, 'name')}</div>
                                                                                <div>PG: {returnStat(unit.id, 'hitPoint')}</div>
                                                                        </div>
                                                                        <div>
                                                                                <div> <i className="fas fa-arrow-circle-up" onClick={() => passTurn(unit.id, 'up')} ></i>   </div>
                                                                                <div> <i className="fas fa-arrow-circle-down" onClick={() => passTurn(unit.id, 'down')} ></i> </div>
                                                                        </div>

                                                        </UnitInit>


                                        })}

                        </div>

                        <div><label>CD</label><input type="number" name="CD" onChange={onChangeCD}/></div>
                </div>
                

        )



}


export default InitList;