import React from 'react'
import { usePlayer } from '../../../../User/ActualMatch/Player/playerContext'
import { MonsterListDiv } from '../styled-match'



const Attacks = () => {


    const {playerAttacks, setPlayerAttacks} = usePlayer()!

    const onChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, id? : number) => {

        let newAttacks = playerAttacks.map(attack => {

                    if(attack.id === id) return {...attack, [e.currentTarget.name] : e.currentTarget.value}

                    return attack

        })

        setPlayerAttacks([...newAttacks])

    }

    const selectAttack = (e : React.MouseEvent<HTMLDivElement> ,id : number) => {

            if(e.currentTarget === e.target){

                const newPlayerAttacks = playerAttacks.map(a => {

                            if(a.id === id) return {...a, selected : !a.selected }

                            return {...a, selected : false}

                })

                setPlayerAttacks([...newPlayerAttacks])

            }

    }

    const deleteAttack = (id : number) => {

        const newAttacks = playerAttacks.filter(e => e.id !== id)

        setPlayerAttacks([...newAttacks])

    }

        let contador = 0

        return (

            <>
            
                { playerAttacks.map( a => {

                        contador++

                        return <MonsterListDiv isActive={a.selected} onClick={(e) => selectAttack( e, a.id)}>
                            Ataque {contador}
                            <label>Nombre</label><input type="text" value={a.name} name='name' onChange={(e) => onChange(e, a.id)}/>
                            <label>Ataque</label><input type="number" value={a.attack} name='attack' onChange={(e) => onChange(e, a.id)}/> 
                            <label>Bonificador de Daño</label><input value={a.bonusDmg} type="number" name='bonusDmg' onChange={(e) => onChange(e, a.id)}/> 
                            <label>Dado de daño</label>
                            <select name="dice" id="dice" value={a.diceDmg} onChange={(e) => onChange(e, a.id)}> 
                                    <option value={4} selected>d4</option>
                                    <option value={6}>d6</option>
                                    <option value={8}>d8</option>
                                    <option value={10}>d10</option>
                                    <option value={12}>d12</option>
                            </select>
                            { a.id > 1 && <button onClick={() => deleteAttack(a.id)}>X</button>}
                        </MonsterListDiv>

                })}
                    
            </>

            )

}


export default Attacks