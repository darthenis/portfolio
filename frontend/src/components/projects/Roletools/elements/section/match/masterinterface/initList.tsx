import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { initOrder, monsterStat, player } from '../../../../Interfaces/interfaces'
import { UnitInit } from '../styled-match'
import { useMaster } from '../contextMatch/Master/masterContext'
import { useNavigation } from '../../../../navegation/navigationContext'
import socket from '../../../../service/socket'


const InitList = () => {

        const {monsterStats, initOrder, playerStats, resetInitOrder} = useMaster()!

        const { navigation } = useNavigation()!

        const [cd, setCD] = useState(0)

        const onChangeCD = (e : React.ChangeEvent<HTMLInputElement>) => {

                setCD(parseInt(e.currentTarget.value))
        }

        useEffect(() => {
            
                 cd > 0 && socket.emit('newCD', cd)
                
        }, [cd])

        
        const returnStat = (id : number, type : string) => {

                let monster = monsterStats.findId(id)

                if(monster){

                        if(type === 'name') return monster.name

                        return monster.actualHP

                } else {

                        let player = playerStats.findId(id)

                        if(player){

                                if(type === 'name') return player.name

                                return player.actualHP
                        }

                }

        }


        const firstPlace = (id : number) =>{

                let index = initOrder.myStateRef.current.findIndex(e => e.id === id)

                if(index===0) {
                        
                        return true

                }

                return false

        }

        const checkSelect = (id : number) => {

                let select = initOrder.myStateRef.current.filter(e => e.id === id)  //verificar si es necesaria la funcion

                if(select.length) return select[0].selected

                return false
            
            }

        return(

                <div className='list-init'>

                        <div>

                                <div className='title-init'>
                                                
                                                        <i onClick={resetInitOrder} className="fas fa-times-circle"></i>
                                                        Iniciativas
                                </div>

                                        { initOrder.myStateRef.current.map( (unit : initOrder ) => {


                                                return  <UnitInit isActive={checkSelect(unit.id)} isFirst={firstPlace(unit.id)} className='init-unit'>
                                                                        
                                                                        <div onClick={() => initOrder.selectUnitInit(unit.id)}>
                                                                                <div>Iniciativa: {unit.init}</div>
                                                                                <div>Nombre: {returnStat(unit.id, 'name')}</div>
                                                                                <div>PG: {returnStat(unit.id, 'hitPoint')}</div>
                                                                        </div>
                                                                        <div>
                                                                                <div> <i className="fas fa-arrow-circle-up" onClick={() => initOrder.moveTurn(unit.id, 'up')} ></i>   </div>
                                                                                <div> <i className="fas fa-arrow-circle-down" onClick={() => initOrder.moveTurn(unit.id, 'down')} ></i> </div>
                                                                        </div>

                                                        </UnitInit>


                                        })}

                        </div>

                        <div><label>CD</label><input type="number" name="CD" onChange={onChangeCD}/></div>
                </div>
                

        )



}


export default InitList;