import React, { useEffect, useState, SetStateAction, Dispatch } from 'react'
import Input from '../../../../inputs'
import './register.css'
import { postRegister, setNewEmail } from '../../service/roletoolsservice'
import {useProfile} from '../../User/userContext'
import ButtonLoading from '../../components/buttonLoading'


const RegisterRoleTool = (props: {loadPage : any, setLoadPage : Dispatch<SetStateAction<any>>}) => {

    const {profile, setProfile} = useProfile()!

    const [user, setUser] = useState({
        user : '',
        pass : '',
        email : ''
    })

    const [passCheck, setPassCheck] = useState({ passCheck : '' })

    const [inputState, setInputState] = useState({
        user           : true,
        pass           : true,
        passCheck      : true,
        passcheckState : false, 
        email          : true, 
        incomplete     : false
    })

    const [loadRegister, setLoadRegister] = useState(false)

    const [endLoad, setEndLoad] = useState(false)

    useEffect(() => {

        if(endLoad) {
            setLoadRegister(false)
            setEndLoad(false)
        }
        
    })

    useEffect(()=>{

        if(user.pass===passCheck.passCheck){

            setInputState({...inputState, passcheckState : true})  

        } else {

            setInputState({...inputState, passcheckState : false})

        }

    }, [user, passCheck])



    const regularExpression = {
        nombre:  /^[a-zA-ZÀ-ÿ]{2,10}$/,
        pass:  /^[a-zA-ZÀ-ÿ0-9]{2,16}$/,
        email : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      }


      const sendRegister = async () => {

            if (inputState.user &&
                inputState.pass &&
                inputState.email &&
                inputState.passcheckState &&
                user.user &&
                user.pass &&
                user.email) {

                    setLoadRegister(true)
                    
                    const response = await postRegister(user)

                    setEndLoad(true)

                    switch(response.data.message){
                                case 'user already exist':
                                    alert('El usuario ya existe')
                                    break;
                                case 'email already exist':
                                    alert('El email ya existe')
                                    break;
                                case 'user created':
                                    setProfile({...profile, user : user.user,
                                                            token: response.data.message})

                                    props.setLoadPage({...props.loadPage, register : false, emailConfirm : true})
                                    break;
                    }
                                    
                } else {

                        setInputState({...inputState, incomplete : true})
                }

      }

      const backLogin = () => {

        props.setLoadPage({...props.loadPage, register : false, login : true})

      }


        return (

            <div className='register-container-roletools'>

                        <div>

                            <form id='roletools-form-register'>

                                <div>    
                                    <Input  inputState={inputState}
                                            setInputState={setInputState}
                                            user={user}
                                            setUser={setUser}
                                            expresion={regularExpression.nombre}
                                            type='text' 
                                            label='usuario' 
                                            classLabel='input-label-roletool' 
                                            className='user-input'
                                            placeholder='Escriba su nombre de usuario'
                                            name='user'
                                            errorempty='El campo es obligatorio'
                                            errorinput='Solo letras y numeros de hasta 10 carácteres'
                                            errorMessageClass='error-message-register-roletool'
                                            ></Input>
                                        </div>
                                <div>        
                                    <Input  inputState={inputState} 
                                            setInputState={setInputState}
                                            user={user}
                                            setUser={setUser}
                                            expresion={regularExpression.pass}
                                            type='password' 
                                            label='contraseña' 
                                            classLabel='input-label-roletool' 
                                            className='pass-input-roletool'
                                            placeholder='Escriba su contraseña'
                                            name='pass'
                                            errorempty='El campo es obligatorio'
                                            errorinput='Solo letras y numeros de hasta 16 carácteres'
                                            errorMessageClass='error-message-register-roletool'
                                            ></Input>
                                        </div>
                                <div>        
                                    <Input  inputState={inputState} 
                                            setInputState={setInputState}
                                            user={passCheck}
                                            setUser={setPassCheck}     
                                            expresion={regularExpression.pass}
                                            type='password' 
                                            label='repita la contraseña' 
                                            classLabel='input-label-roletool' 
                                            className='pass-input-roletool'
                                            placeholder='Escriba su contraseña'
                                            name='passCheck'
                                            errorempty='El campo es obligatorio'
                                            errorinput='Solo letras y numeros de hasta 16 carácteres'
                                            errorMessageClass='error-message-register-roletool'
                                            ></Input>
                                        </div>

                                            

                                <div>
                                    <Input  inputState={inputState} 
                                            setInputState={setInputState}
                                            user={user}
                                            setUser={setUser}
                                            expresion={regularExpression.email}
                                            type='text' 
                                            label='Email' 
                                            classLabel='input-label-roletool' 
                                            className='email-input'
                                            placeholder='Escriba su email'
                                            name='email'
                                            errorempty='El campo es obligatorio'
                                            errorinput='El email es incorrecto'
                                            errorMessageClass='error-message-register-roletool'
                                            ></Input>
                                        </div>

                                            {inputState.passcheckState===false && <div id='pass-form'>Las contraseñas deben coincidir</div>}


                                           



                             </form>

                             <ButtonLoading isLoading={loadRegister} insideText='Registrar' color='black' background='white' hover='#00F3FF' onClick={sendRegister}/>

                             <button id='button-backLogin-RoleTools' onClick={backLogin}>volver</button>

                        </div>


            </div>
        )


}

export default RegisterRoleTool;