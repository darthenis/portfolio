import React, { useState, SetStateAction, Dispatch } from 'react'
import Input from '../../../inputs';
import './register.css'
import socket from '../../motos/sockets' 
import { useEffect } from 'react';






const Register = (props: {  myUser: any, 
                            setMyUser: Dispatch<SetStateAction<any>>, 
                            setPages: Dispatch<SetStateAction<any>>}) => {


    const [inputState, setInputState] = useState({

        nombre: true,
        incomplete: false
    })


    useEffect(()=>{

        socket.on('done', (res: string) => {

            if (res==='error') { alert('El nick ya se encuentra escogido' )}

            else { props.setPages('chatroom') }

         })


    },[])
    



    const submit = async (e : React.FormEvent<HTMLFormElement>) =>  {

        e.preventDefault()

        let userSaved;

        if(inputState.nombre && props.myUser.nombre!==''){

            console.log('registration user')

            socket.emit('userchat', props.myUser)

        }else{ 

            console.log('falta introducir nick')
            
            setInputState({...inputState, incomplete : true})}



    }


        return(

                <div id='register-container'>

                            <form onSubmit={submit}>

                                <Input 
                                        inputState={inputState}
                                        setInputState={setInputState}
                                        label='Nick'
                                        classLabel='label-register-chat'
                                        placeholder='Escriba su nick'
                                        className='input-register-chat'
                                        type='text'
                                        name='nombre'
                                        expresion={/^[a-zA-ZÀ-ÿ\s]{2,8}$/}
                                        errorinput='Solo letras entre 2 a 8 carácteres y espacios'
                                        errorempty='El nick es requerido para entrar a la sala de chat'
                                        errorMessageClass='messageError-register-chat'
                                        user={props.myUser}
                                        setUser={props.setMyUser}/>


                                <input type='submit' id='boton-chat-register' value='Entrar'/>

                            </form>

                            



                            </div>




        )



}

export default Register;