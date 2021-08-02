import { useEffect, useState } from 'react'
import { registerText, argsRegisterText } from '../../Interfaces/interfaces'



export const useRegisterText = () => {

   const [registerText, setRegisterText ] = useState<registerText[]>((JSON.parse(sessionStorage.getItem('registerText')!) || []))

   useEffect(()=>{

        sessionStorage.setItem('registerText', JSON.stringify(registerText))

   },[registerText])
   
   const addRegisterText = (args : argsRegisterText) => {

        let register = {
            name : args.name,
            dice : args.dice,
            rolled: args.rolled,
            ventaja : args.ventaja,
            critic : args.critic || false,
            bonusDice : args.bonusDice || 0,
            diceDmg : args.diceDmg || 0,
            dmg : args.dmg || 0,
            bonusDmg : args.bonusDmg || 0,
            exit : args.exit || null
       }


        if(!registerText.length) setRegisterText([register])

        else setRegisterText([...registerText.concat(register)])

   }


   const resetRegister = () => {

    sessionStorage.removeItem('registerText')

    setRegisterText([])

   }

   

   return {

       registerText,
       addRegisterText,
       resetRegister
   }



}