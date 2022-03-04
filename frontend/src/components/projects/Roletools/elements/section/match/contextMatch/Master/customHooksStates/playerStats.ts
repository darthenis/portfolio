import {useEffect, useRef, useState} from 'react'
import socket from '../../../../../../service/socket'
import { player } from '../../../../../../Interfaces/interfaces'


export const usePlayerStats = () => {

    const [list, _setList] = useState<player[]>(JSON.parse(sessionStorage.getItem('playersStats')!)|| [])

    const myStateRef = useRef(list)
        const setList = (data : player[]) => {
                myStateRef.current = data
                _setList(data)
        }

    useEffect(() => {
       
        sessionStorage.setItem('playersStats', JSON.stringify(list))

    }, [list])

    useEffect(() => {

        socket.on('newStatsPlayer', (data) => {

            addNewStats(data)

        })

    }, [])

    type updateStats = {name : string; hitPoint : number; AC : number; id : number }

    const addNewStats = (data : updateStats) => {

        let checkId = myStateRef.current.find(e => e.id === data.id)

        if(checkId!==undefined){
            
        let newList = myStateRef.current.map( e => {

            if(e.id === data.id) return {...e,  name : data.name,
                                                actualHP : data.hitPoint,
                                                AC : data.AC
                                                }

            return e

        })

        setList([...newList])

        }

    }



    const addPlayerStats = (data : player) => {

            let newPlayer = {
                name : data.name,
                bonusInit : data.bonusInit,
                init : data.init,
                id : data.id,
                AC : data.AC,
                totalHP : data.totalHP,
                actualHP : data.actualHP
            }

            let newList

            let checkedId = myStateRef.current.find(e => e.id === data.id)

            if(!list.length) { setList([newPlayer] )
            
            } else { 

                    if(checkedId) {

                        newList = myStateRef.current.map(e => {

                                if(e.id === data.id) return {...e,  name : data.name,
                                                                    hitPoint : data.actualHP,
                                                                    AC : data.AC,}

                                return e

                        })

                    } else {

                        newList = myStateRef.current.concat(newPlayer)

                    } 

                    setList([...newList])

                }
               
        }


    useEffect(()=>{

        socket.on('playerInit', (data) => {

            let newStats = myStateRef.current.map(e => {

                        if(e.id === data.id) return {...e,  
                                                            AC : data.AC,
                                                            hitPoint : data.hitPoint}

                        return e

            })

            setList([...newStats])

        })

    }, [])

    const reset = () => {

            setList([])

    }

    const findId = (id : number) => {

        let check = myStateRef.current.find(e => e.id === id)

        return check

    }




    return{

        myStateRef,
        addPlayerStats,
        reset,
        findId

    }


}