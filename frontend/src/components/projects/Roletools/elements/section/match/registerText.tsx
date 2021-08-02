import React, { useEffect, useRef } from 'react'
import { useNavigation } from '../../../navegation/navigationContext'
import { useMaster } from '../../../User/ActualMatch/Master/masterContext'
import { usePlayer } from '../../../User/ActualMatch/Player/playerContext'




const RegisterText = () => {

    const { navigation } = useNavigation()!

    const master = useMaster()!

    const player = usePlayer()!

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{

        scrollRef.current!==null && scrollRef.current.scrollIntoView();

    }, [master.registerText, player.registerText])


    const callRegister = () => {

        let register;

        if(navigation.actualPage==='Master') {register = [...master.registerText]}

        else {register = [...player.registerText]}

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