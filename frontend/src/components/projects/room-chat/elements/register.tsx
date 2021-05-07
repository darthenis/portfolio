import React from 'react';
import react, { useState, SetStateAction, Dispatch } from 'react'
import Input from '../../../inputs';
import { Button } from '../../trivia/trivia-style';
import './register.css'
import socket from '../../motos/sockets' 






const Register = (props: {user: any, setUser: Dispatch<SetStateAction<any>>}) => {


    const [inputState, setInputState] = useState({

        nombre: true,
        incomplete: false
    })


    const submit = (e : React.FormEvent<HTMLFormElement>) =>  {

        e.preventDefault()

        if(inputState.nombre && props.user.nombre!==''){

            console.log('entrando')

            socket.emit('userchat', props.user)



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
                                        user={props.user}
                                        setUser={props.setUser}/>


                                <input type='submit' id='boton-chat-register' value='Entrar'/>

                            </form>

                            



                            </div>




        )



}

export default Register;