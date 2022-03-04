import React from 'react'
import { usePlayer } from '../contextMatch/Player/playerContext'
import { MonsterListDiv } from '../styled-match'



const Attacks = () => {


    const { attacks } = usePlayer()!

        let contador = 0

        return (

            <>
            
                { attacks.myStateRef.current.map( a => {

                        contador++

                        return <MonsterListDiv isActive={a.selected} onClick={(e) => attacks.select(e, a.id)}>
                            Ataque {contador}
                            <label>Nombre</label><input type="text" value={a.name} name='name' onChange={(e) => attacks.onChange(e, a.id)}/>
                            <label>Ataque</label><input type="number" value={a.attack} name='attack' onChange={(e) => attacks.onChange(e, a.id)}/> 
                            <label>Bonificador de Daño</label><input value={a.bonusDmg} type="number" name='bonusDmg' onChange={(e) => attacks.onChange(e, a.id)}/> 
                            <label>Dado de daño</label>
                            <select name="diceDmg" id="dice" value={a.diceDmg} onChange={(e) => attacks.onChange(e, a.id)}> 
                                    <option value={4} selected>d4</option>
                                    <option value={6}>d6</option>
                                    <option value={8}>d8</option>
                                    <option value={10}>d10</option>
                                    <option value={12}>d12</option>
                            </select>
                            { a.id > 1 && <button onClick={() => attacks.deleteAttack(a.id)}>X</button>}
                        </MonsterListDiv>

                })}
                    
            </>

            )

}


export default Attacks