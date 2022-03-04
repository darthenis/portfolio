import React, { useEffect, useState } from 'react'
import { useNavigation } from '../../../../navegation/navigationContext'
import './player.css'
import socket from '../../../../service/socket'
import Attacks from './attacks'
import RegisterText from '../registerText'
import ButtonsPlayer from './buttonsPlayer'
import ExtrasOptions from '../extrasOptions'
import { usePlayer } from '../contextMatch/Player/playerContext'
import InitList from '../playerinterface/initList'





const Player = () => {

    const {playerStats, initOrder, attacks, checkActualMatch } = usePlayer()!

    const {navigation} = useNavigation()!

    useEffect(()=>{

        checkActualMatch(navigation.actualMatch)

    }, [])
   

    interface choice {
        [name : string] : boolean
    }


    const [choice, setChoice] = useState('none')

    //----------------------SOCKET-------------------------


    useEffect(()=>{

        socket.emit('joinMatch', {match : navigation.actualMatch, type : navigation.actualPage})

        console.log('conectando en sala')
        
    })


    const selectRoll = (e : React.ChangeEvent<HTMLInputElement>) => {

        setChoice(e.target.value)

    }


        return (

                <div id='match-app-player-container'>

                        <InitList/>

                        <div id='list-options-player'>

                            <div>Estadísticas del personaje</div>

                            <div id='static-stats'>
                                <div>
                                    <label>Nombre</label>
                                    <input type="text" name='name' value={playerStats.myStateRef.current.name} onChange={playerStats.onChange}/>
                                </div>
                                <div>
                                    <label>Iniciativa</label>
                                    <input type="number" name='bonusInit' value={playerStats.myStateRef.current.bonusInit} onChange={playerStats.onChange}/>
                                </div>
                                <div>
                                    <label>CA</label>
                                    <input type="number" name='AC' value={playerStats.myStateRef.current.AC} onChange={playerStats.onChange}/>
                                </div>
                                <div>
                                    <label>Vida total</label>
                                    <input type="number" name='totalHP' value={playerStats.myStateRef.current.totalHP} onChange={playerStats.onChange}/>
                                </div>
                                <div>
                                    <label>Vida actual</label>
                                    <input type="number" name='actualHP' value={playerStats.myStateRef.current.actualHP} onChange={playerStats.onChange}/>
                                </div>                  
                            </div>

                            <div id='attacks-list'>

                                <Attacks/>

                            </div>
                                
                        </div>

                        <RegisterText/>

                        <div id='roll-options-player' onChange={selectRoll}>

                                    <ButtonsPlayer options={choice} setOptions={setChoice}/>  
                                    
                                    <ExtrasOptions options={choice} setOptions={setChoice}/>
                                                     
                        </div>

                </div>



        )


}

export default Player