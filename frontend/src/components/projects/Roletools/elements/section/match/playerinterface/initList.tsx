import React, { useState, useEffect } from 'react'
import { playerInitOrder } from '../../../../Interfaces/interfaces'
import socket from '../../../../service/socket'
import { usePlayer } from '../../../../User/ActualMatch/Player/playerContext'
import { UnitInit } from '../styled-match'



const InitList = () => {

    const { playerInitOrder, setPlayerInitOrder, selectUnitInitOrder} = usePlayer()!

    const firstPlace = (id : number) =>{

        let index = playerInitOrder.findIndex(e => e.id === id)

        if(index===0) return true

        return false

}

useEffect(() => {

    
    socket.on('newInitOrder', (newInitOrder : playerInitOrder[]) => {

        setPlayerInitOrder([...newInitOrder])

    })


})


        return (

            <div id='list-init-player'>

                <div id='title-init-player'>Iniciativas</div>
            
                {playerInitOrder.map(e => {

                  return <UnitInit isActive={e.selected} isFirst={firstPlace(e.id)}>

                                                <div onClick={() => selectUnitInitOrder(e.id)}>
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