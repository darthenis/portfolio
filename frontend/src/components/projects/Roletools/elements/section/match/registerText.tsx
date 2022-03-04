import React, { useEffect, useRef } from 'react'
import { useNavigation } from '../../../navegation/navigationContext'
import { useMaster } from './contextMatch/Master/masterContext'
import { usePlayer } from './contextMatch/Player/playerContext'


const RegisterText = () => {

    const { navigation } = useNavigation()!

    const master = useMaster()!

    const player = usePlayer()!

    const scrollRef = useRef<HTMLDivElement>(null);


    useEffect(()=>{

        scrollRef.current!==null && scrollRef.current.scrollIntoView();

    })


    const callRegister = () => {

        let register;

        if(navigation.actualPage==='Master') {register = [...master.registerText.myStateRef.current]}

        else {register = [...player.registerText.myStateRef.current]}

        return (<>{register.map(e => {

            if (e.exit && e.dmg && !e.critic) return <div>{e.name}: {e.ventaja} 1d{e.dice}+{e.bonusDice}={e.rolled} <br/>daño: 1d{e.diceDmg}+{e.bonusDmg}={e.dmg}</div>

            if (e.exit && e.dmg && e.critic) return <div>{e.name}: {e.ventaja} 1d{e.dice}+{e.bonusDice}={e.rolled} <br/>daño CRITICO: 2d{e.diceDmg}+{e.bonusDmg}={e.dmg}</div>

            if (e.exit && !e.dmg) return <div>{e.name}: {e.ventaja} 1d{e.dice} + {e.bonusDice}={e.rolled}, EXITO!</div>

            if (e.exit===null) return <div>{e.name}: {e.ventaja} 1d{e.dice}+{e.bonusDice}={e.rolled}</div>

            return <div>{e.name}: {e.ventaja} 1d{e.dice}+{e.bonusDice}={e.rolled}, FALLO!</div>
            })}</>)

    }


    return(


            <div className='registerText'>
            
            {callRegister()}
            
                <div ref={scrollRef}/>
            </div>


    )

}


export default RegisterText; 