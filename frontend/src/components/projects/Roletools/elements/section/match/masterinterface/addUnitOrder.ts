import {Dispatch, SetStateAction } from 'react'
import {initOrder, monsterStat} from '../../../../Interfaces/interfaces'


export const createInitOrder = (initOrder : initOrder[], 
                                setInitOrder : Dispatch<SetStateAction<initOrder[]>>,
                                monsterStat : monsterStat[]
                                ) => {

    let newInitMonster = monsterStat.filter(monster => monster.initEnabled===true)

                if(!initOrder.length) {

                        let newElement = newInitMonster.map((monster) =>{
        
        
                                        return {
                                                bonusInit : monster.init,
                                                init : monster.rolled, 
                                                selected : false,
                                                id : monster.id}
        
                                })
        
        
                        setInitOrder(orderList(newElement))   


                } else {

                        let newInits = newInitMonster.filter( init => initOrder.find(e => e.id === init.id)===undefined) //new inits      

                        let newArray : initOrder[] = newInits.map( item => {


                                        return {
                                                bonusInit : item.init, 
                                                init : item.rolled, 
                                                selected : false,
                                                id : item.id }

                        })

                        const newOrder = insertNews(newArray, initOrder)

                        setInitOrder([...newOrder])

                }

                return initEnabledOff(monsterStat)

}

type playerStats = {

        name : string;
        hitPoint : number;
        init : number;
        bonusInit : number;
        playerId : number;

}



export const addPlayerInit = (  initOrder : initOrder[], 
                                setInitOrder : Dispatch<SetStateAction<initOrder[]>>,
                                playerStats : playerStats) => {


        let newElement = [{     name : playerStats.name,
                                bonusInit : playerStats.bonusInit,
                                init : playerStats.init, 
                                hitPoint : playerStats.hitPoint,
                                selected : false,
                                id : playerStats.playerId}]


        if(!initOrder.length){

                        

                        setInitOrder(orderList(newElement)) 
        
        } else { 

                let newOrder = insertNews(newElement, initOrder)

                setInitOrder([...newOrder])

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

const initEnabledOff = (monsterStat : monsterStat[]) => {

    const newElement = monsterStat.map( monster => {

                    if(monster.initEnabled) return {...monster, initEnabled : false, initRolled : true}

                    return monster  

    })


    return [...newElement]
}

const desempate = (coincidenceInits : initOrder[], addInit : initOrder) => {

    let concacatInits = coincidenceInits.concat(addInit)

    concacatInits = orderList(concacatInits)

    return concacatInits.findIndex(e => e === addInit ) + 1


}