import { useEffect, useRef, useState } from 'react'
import { List } from '../../../../../room-chat/elements/ChatRoom-styled'
import { registerText, argsRegisterText } from '../../../../Interfaces/interfaces'
import socket from '../../../../service/socket'



export const useRegisterText = () => {

   const [list, _setList ] = useState<registerText[]>((JSON.parse(sessionStorage.getItem('registerText')!) || []))

   const myStateRef = useRef(list)
    const setList = (data : registerText[]) => {
            myStateRef.current = data
            _setList(data)
    }

   useEffect(()=>{

        sessionStorage.setItem('registerText', JSON.stringify(list))

   },[list])


   useEffect(() => {
        
     socket.on('newRegisterText', data => {

         setList(data)

     })

     socket.on('customRoll', result => {

        addRegisterText(result)
        
     })

 }, [])
   
   const addRegisterText = (args : argsRegisterText) => {

       console.log('agregando al registro :', args)

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


        if(!myStateRef.current.length) setList([register])

        else {
             
          let newRegister = myStateRef.current.concat(register)

          console.log('newRegister: ', newRegister)
          
          setList([...newRegister])}

   }


   const resetRegister = () => {

    sessionStorage.removeItem('registerText')

    setList([])

   }


   

   return {

       myStateRef,
       addRegisterText,
       resetRegister
   }



}