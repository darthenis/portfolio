import React from 'react'
import react, {Dispatch, SetStateAction, useState} from 'react'
import Input from '../../../inputs'
import './login.css'
import { loginRoleTools } from './roletoolsservice'



const Login = (props : {loadpage : any, setLoadPage : Dispatch<SetStateAction<any>>}) => {

    const [user, setUser] = useState({
        user : '',
        pass : ''
    })

    const [inputState, setInputState] = useState({
        user : true,
        pass : true,  
        incomplete : false
    })


    const regularExpression = {
        nombre:  /^[a-zA-ZÀ-ÿ]{2,10}$/,
        pass:  /^[a-zA-ZÀ-ÿ0-9]{2,16}$/,
        email : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      }

    const sendLogin = (e : React.FormEvent<HTMLFormElement>) =>{

        e.preventDefault();

        if(  inputState.user &&
             inputState.pass &&
             user.user && 
             user.pass){

                       loginRoleTools(user) 
        
        } else {setInputState({...inputState, incomplete : true})}


    }

    const register = () => {

        props.setLoadPage({...props.loadpage, 
                                              login : false,
                                              register : true  })
    }

    const recovery = () => {

        props.setLoadPage({...props.loadpage,
                                                login : false,
                                                recovery : true})
    }


        return (

                <div className='login-container'>

                            <form onSubmit={sendLogin}>

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
                                            errorMessageClass='error-message-input-roletool'
                                            ></Input>

                                    <Input  inputState={inputState} 
                                            setInputState={setInputState}
                                            user={user}
                                            setUser={setUser}
                                            expresion={regularExpression.pass}
                                            type='text' 
                                            label='contraseña' 
                                            classLabel='input-label-roletool' 
                                            className='pass-input-roletool'
                                            placeholder='Escriba su contraseña'
                                            name='pass'
                                            errorempty='El campo es obligatorio'
                                            errorinput='Solo letras y numeros de hasta 16 carácteres'
                                            errorMessageClass='error-message-input-roletool'
                                            ></Input>

                                            <input type="submit" value='Login'/>

                                            <a onClick={recovery}>¿Olvidó su usuario o su contraseña?</a>
                                            <a onClick={register}>Registrarse</a>

                            </form>

                            



                </div>

                


        )


}

export default Login;