import React, { useEffect, useRef, useState } from 'react'
import '../match.css'
import MonsterList from './monsters'
import InitList from './initList'
import ButtonsMonster from './buttonsMonsters'
import ScreenRolled from '../extrasOptions'
import RegisterText from '../registerText'




const Master = () =>{

        const [options, setOptions] = useState({
                ventaja : 'none',
                extraDice : 0
        })


        return(

                <div className='match-app-container'>

                    <InitList />

                    <RegisterText/>
   
                    <div id='monsters-list'>

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