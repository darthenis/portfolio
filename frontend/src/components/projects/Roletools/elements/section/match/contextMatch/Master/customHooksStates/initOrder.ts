import {Dispatch, useRef, useEffect, useState} from 'react'
import {initOrder, monsterStat, newInitOrder, player, playerStats} from '../../../../../../Interfaces/interfaces'
import socket from '../../../../../../service/socket'



export const useInitOrder = () => {

        const [list, _setList] = useState<initOrder[]>(JSON.parse(sessionStorage.getItem('initOrder')!)|| [])


        const myStateRef = useRef(list)
        const setList = (data : initOrder[]) => {
                myStateRef.current = data
                _setList(data)
        }

        useEffect(() => {

                sessionStorage.setItem('initOrder', JSON.stringify(list))

        }, [list])


        const newInitOrder = (data : player[]) => {

                let checkID = false

                list.forEach(element => {

                        if(data.find( e => e.id === element.id)) checkID = true
                        
                });

                if(!checkID){

                        let newElement = data.map(e => {
                                
                                return {bonusInit : e.bonusInit,
                                        init : e.init,
                                        selected : false,
                                        totalHP : e.totalHP,
                                        actualHP : e.actualHP,
                                        AC : e.AC,
                                        id : e.id}
                        })
        
                        addNewPlayer(newElement)

                }

        }
                        

    const resetInitOrder = () => {

            sessionStorage.removeItem('initOrder')

            setList([])
            
    }

    const selectUnitInit = (id : number) => {

        let checkFirst = list.findIndex(e => e.id === id)

        if(checkFirst > 0){

                let newSelectInit = list.map(e => {

                        if(e.id === id) return {...e, selected : !e.selected }

                        return {...e, selected : false}

                })

                setList([...newSelectInit])

        }

    }

    const addNewPlayer = ( newPlayer : initOrder[]) =>{

        if(!list.length) {   

                setList([...newPlayer]) 

        } else {

                const newOrder = insertNews(newPlayer, list)

                setList([...newOrder])

        }

}

    const createInitOrder = (monsterStats : monsterStat []) => {

                let newInitElement = monsterStats.filter(e => e.initRolled===true)

                if(!list.length) {

                let newElement = newInitElement.map((e) =>{


                                return {
                                        bonusInit : e.bonusInit,
                                        init : e.init, 
                                        selected : false,
                                        totalHP : e.totalHP,
                                        actualHP : e.actualHP,
                                        AC : e.AC,
                                        id : e.id}

                        })


                setList(orderList(newElement))   


                } else {

                let newInits = newInitElement.filter( init => myStateRef.current.find(e => e.id === init.id)===undefined) //new inits      

                let newArray : initOrder[] = newInits.map( item => {


                                return {
                                        bonusInit : item.bonusInit,
                                        init : item.init, 
                                        selected : false,
                                        totalHP : item.totalHP,
                                        actualHP : item.actualHP,
                                        AC : item.AC,
                                        id : item.id }

                })

                const newOrder = insertNews(newArray, list)

                setList([...newOrder])

                }

        }


    const orderList = (list:initOrder[]) => 
    
            [...list].sort((a, b) => (a.init < b.init ? 1 : 
                                    a.init > b.init ? -1 : 
                                    a.bonusInit < b.bonusInit ? 1 : 
                                    a.bonusInit > b.bonusInit ? -1 : randomResult()))

    const randomResult = () =>{

                    let random = Math.round(Math.random() * ( 1 )) + 1
                            
                    return random === 2 ? 1 : -1 

            }

    const insertNews = (newInits : initOrder[], oldInitsRolled : initOrder[]) =>{

            let oldInits = [...oldInitsRolled]

            newInits.map(element => {
                            
                            let monster = oldInits.reduce((prev, curr) => Math.abs(curr.init - element.init) < Math.abs(prev.init - element.init) ? curr : prev)

                            let coincidence = oldInits.filter(e => e.init===monster.init)   

                            let index = oldInits.findIndex(e => e.init === monster.init)

                            if(coincidence[0].init > element.init) coincidence.length > 1 ? index = index + coincidence.length : index = index + 1 

                            if(coincidence[0].init === element.init) coincidence.length > 1 ? index = index + desempate(coincidence, element) : index = index + desempate(coincidence, element)

                            oldInits.splice(index, 0, element)

            }) 

            let newOrder = [...oldInits]

            return newOrder

    }

 

    const desempate = (coincidenceInits : initOrder[], addInit : initOrder) => {

        let concacatInits = coincidenceInits.concat(addInit)

        concacatInits = orderList(concacatInits)

        return concacatInits.findIndex(e => e === addInit ) + 1


    }


    const addPlayerInit = ( playerStats : player ) => {


        let newElement = [{    
                                bonusInit : playerStats.bonusInit,
                                init : playerStats.init, 
                                selected : false,
                                totalHP : playerStats.totalHP,
                                actualHP : playerStats.actualHP,
                                AC : playerStats.AC,
                                id : playerStats.id}]


        if(!list.length){

                        

                        setList(orderList(newElement)) 
        
        } else { 

                let newOrder = insertNews(newElement, list)

                setList([...newOrder])

        }


    }

        useEffect(()=>{

                socket.on('passTurn', () => {

                        passTurn()
                })

        },[])


        const passTurn = () =>{

                if(!myStateRef.current.length) return console.log('list vacio') 

                let oldOrder = [...myStateRef.current]

                let firstElement = oldOrder.shift()!

                let newOrder = oldOrder.concat(firstElement)

                setList([...newOrder])

        }

        const moveTurn = (id : number, action : string) => {

                let monsterIndex = list.findIndex(e => e.id === id)

                let newOrder = [...list]

                let element = newOrder.splice(monsterIndex, 1)

                action === 'up' ? newOrder.splice(monsterIndex-1, 0, element[0])

                        : newOrder.splice(monsterIndex+1, 0, element[0])
                
                setList([...newOrder])

                }

        const findId = (id : number) => {

                let check = myStateRef.current.find(e => e.id === id)

                return check

        }

        const deleteInit = (id : number) => {

                let newInitOrder = myStateRef.current.filter(e => e.id !== id)

                setList([...newInitOrder])

        }

    return {
                myStateRef,
                createInitOrder,
                addPlayerInit,
                selectUnitInit,
                resetInitOrder,
                moveTurn,
                passTurn,
                newInitOrder,
                findId,
                deleteInit

        }

}
        