import React, { useEffect, useState } from 'react'
import { useNavigation } from '../../../../navegation/navigationContext'
import './player.css'
import socket from '../../../../service/socket'
import Attacks from './attacks'
import RegisterText from '../registerText'
import ButtonsPlayer from './buttonsPlayer'
import ExtrasOptions from '../extrasOptions'
import { usePlayer } from '../../../../User/ActualMatch/Player/playerContext'
import InitList from '../playerinterface/initList'





const Player = () => {

    const {playerStats, setPlayerStats} = usePlayer()!

    const {navigation} = useNavigation()!
   

    interface choice {
        [name : string] : boolean
    }


    const [choice, setChoice] = useState('none')

    //----------------------SOCKET-------------------------


    useEffect(()=>{

        socket.emit('joinRoom', navigation.actualMatch)
        
    }, [])

   


    const onChange = (e : React.ChangeEvent<HTMLInputElement>) =>{

        setPlayerStats({...playerStats, [e.currentTarget.name] : e.currentTarget.value})


    }

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
                                    <input type="text" name='name' value={playerStats.name} onChange={onChange}/>
                                </div>
                                <div>
                                    <label>Iniciativa</label>
                                    <input type="number" name='init' value={playerStats.init} onChange={onChange}/>
                                </div>
                                <div>
                                    <label>CA</label>
                                    <input type="number" name='AC' value={playerStats.AC} onChange={onChange}/>
                                </div>
                                <div>
                                    <label>PG</label>
                                    <input type="number" name='hitPoints' value={playerStats.hitPoint} onChange={onChange}/>
                                </div>         
                            </div>

                            <div id='attacks-list'>

                                <Attacks/>

                            </div>
                                
                        </div>

                        <RegisterText/>

                        <div id='roll-options-player' onChange={selectRoll}>

                                    <ButtonsPlayer />  
                                    
                                    <ExtrasOptions options={choice} setOptions={setChoice}/>
                                                     
                        </div>

                </div>



        )


}

export default Player