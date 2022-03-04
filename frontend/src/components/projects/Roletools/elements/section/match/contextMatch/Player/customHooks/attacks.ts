import React, {useEffect, useRef, useState} from 'react'
import { playerAttacks } from '../../../../../../Interfaces/interfaces'


const playerAttackInitial = [{
    name : '',
    attack : 0,
    diceDmg : 4,
    bonusDmg : 0,
    selected : false,
    id: 1}]

export const useAttacks = () => {

    const [list, _setList] = useState<playerAttacks[]>(JSON.parse(sessionStorage.getItem('playerAttacks')!)|| playerAttackInitial)

    const myStateRef = useRef(list)
        const setList = (data : playerAttacks[]) => {
                myStateRef.current = data
                _setList(data)
        }

    useEffect(()=>{  

        sessionStorage.setItem('playerAttacks', JSON.stringify(myStateRef.current))
        
    }, [myStateRef.current])

    const onChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, id : number) => {

            let changeAttacks = myStateRef.current.map(a => {

                            if(a.id === id) return {...a, [e.currentTarget.name] : e.currentTarget.value}

                            return a
            })

            setList([...changeAttacks])

    }

    const addAttack = () => {

        const attack = [{
            name : '',
            attack : 0,
            diceDmg : 4,
            bonusDmg : 0,
            selected : false,
            id : createId()

        }]

        const newMonster = myStateRef.current.concat(attack)

        setList([...newMonster])

    }

    const createId = () => {

        let ids = myStateRef.current.map(e => {

                return e.id

        })

        let maxId = Math.max.apply(null, ids)

        return maxId + 1

    }

    const deleteAttack = (id : number) => {

        let newAttacks = myStateRef.current.filter(e => e.id !== id)

        setList([...newAttacks])

    }

    const reset = () =>{

        sessionStorage.removeItem('playerAttacks')

        setList(playerAttackInitial)

    }

    const select = ( e : React.MouseEvent<HTMLDivElement>, id : number) => {

        if(e.currentTarget === e.target){

            let newAttacks = myStateRef.current.map(e => {

                        if(e.id === id) return {...e, selected : !e.selected}

                        return {...e, selected : false }

            })

            setList([...newAttacks])

        }

    }


    return{
            myStateRef,
            onChange,
            addAttack,
            deleteAttack,
            select,
            reset,

    }
}