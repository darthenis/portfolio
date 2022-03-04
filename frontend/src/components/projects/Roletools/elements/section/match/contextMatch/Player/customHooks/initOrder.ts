import {useEffect, useRef, useState} from 'react'
import socket from '../../../../../../service/socket'
import { playerInitOrder } from '../../../../../../Interfaces/interfaces'


export const usePlayerInitOrder = () => {

    const [list, _setList] = useState<playerInitOrder[]>(JSON.parse(sessionStorage.getItem('playerInitOrder')!)|| [])

    const myStateRef = useRef(list)
        const setList = (data : playerInitOrder[]) => {
                myStateRef.current = data
                _setList(data)
        }

    useEffect(() => {

        sessionStorage.setItem('playerInitOrder', JSON.stringify(myStateRef.current))

    }, [myStateRef.current])

    useEffect(() => {

        socket.on('newInitOrder', (newInitOrder : playerInitOrder[]) => {

            newInitOrder.length>0 ? setList([...newInitOrder])

                                  : reset()
    
        })
       
    }, [])

    const select = (id : number) => {

        let checkFirst = myStateRef.current.findIndex(e => e.id === id)

        if(checkFirst > 0){

            let newOrder = myStateRef.current.map(e => {

                if(e.id === id) return {...e, selected : !e.selected }

                return {...e, selected : false}

            })

            setList([...newOrder])

        }

    }

    const reset = () => {

        sessionStorage.removeItem('playerInitOrder')

        setList([])

    }
    
    return{
            myStateRef,
            select,
            reset,
    }

}