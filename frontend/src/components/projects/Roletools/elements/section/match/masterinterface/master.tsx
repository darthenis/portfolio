import React, { useEffect, useRef, useState } from 'react'
import '../match.css'
import MonsterList from './monsters'
import InitList from './initList'
import ButtonsMonster from './buttonsMonsters'
import ScreenRolled from '../extrasOptions'
import RegisterText from '../registerText'
import socket from '../../../../service/socket'
import { useNavigation } from '../../../../navegation/navigationContext'





const Master = () =>{

        const [options, setOptions] = useState({
                ventaja : 'none',
                extraDice : 0
        })

        const { navigation } = useNavigation()!

        useEffect(()=>{

                socket.emit('joinMatch', {match : navigation.actualMatch, type : navigation.actualPage})
                
        })


        return(

                <div className='match-app-container'>

                    <InitList />

                    <RegisterText/>
   
                    <div id='monsters-list'>

                        <div id='titleMonsterList'>NPCs</div>

                        <div id='monsters-stats'>

                                <MonsterList/>     

                        </div>                                

                        <ButtonsMonster options={options} setOptions={setOptions} />

                    </div>
                    
                    <ScreenRolled options={options} setOptions={setOptions}/>

                </div>

        )

}


export default Master