import React from 'react'
import { usePlayer } from '../contextMatch/Player/playerContext'
import { UnitInit } from '../styled-match'



const InitList = () => {

    const { initOrder } = usePlayer()!

    const firstPlace = (id : number) =>{

        let index = initOrder.myStateRef.current.findIndex(e => e.id === id)

        if(index===0) return true

        return false

}

        return (

            <div id='list-init-player'>

                <div id='title-init-player'>Iniciativas</div>
            
                {initOrder.myStateRef.current.map(e => {

                  return <UnitInit isActive={e.selected} isFirst={firstPlace(e.id)} onClick={() => initOrder.select(e.id)}>

                                                <div>
                                                                <div>Iniciativa: {e.init}</div>
                                                                <div>Nombre: {e.name}</div>
                                                                <div>PG: {e.state}</div>
                                                </div>

                        </UnitInit>

                })}
            
            </div>

        )

}

export default InitList