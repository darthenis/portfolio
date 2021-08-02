import React, { useEffect, useState } from 'react'
import MasterContext from './masterContext'
import {monsterStat, registerText, initOrder} from '../../../Interfaces/interfaces'
import { useRegisterText } from '../registerText'



type Props = {
    children : React.ReactNode
}



const MasterState = ({children}  : Props) => {

    const [monsterStat, setMonsterStat] = useState<monsterStat[]>(JSON.parse(sessionStorage.getItem('monsterStat')!)||[])

    const [initOrder, setInitOrder] = useState<initOrder[]>(JSON.parse(sessionStorage.getItem('initOrder')!)|| [])

    const {registerText, addRegisterText, resetRegister} = useRegisterText()
 

    useEffect(() => {

        sessionStorage.setItem('initOrder', JSON.stringify(initOrder))

    }, [initOrder])

    useEffect(() => {

        sessionStorage.setItem('monsterStat', JSON.stringify(monsterStat))

    }, [monsterStat])



    const resetMatchesSession = () => {

        sessionStorage.removeItem('initOrder')
        sessionStorage.removeItem('monsterStat')

        setInitOrder([])
        setMonsterStat([])
        resetRegister()
     

    }

    //selected unit from initOrder


    const selectUnitInit = (id : number) => {

        let newSelectInit = initOrder.map(e => {

                        if(e.id === id) return {...e, selected : !e.selected }

                        return {...e, selected : false}

        })


        setInitOrder([...newSelectInit])


    }
    

    return(

        <MasterContext.Provider value={{monsterStat, 
                                        setMonsterStat, 
                                        initOrder, 
                                        setInitOrder,
                                        selectUnitInit,
                                        resetMatchesSession,
                                        registerText,
                                        addRegisterText}}>

            {children}

        </MasterContext.Provider>

    )

}

export default MasterState;