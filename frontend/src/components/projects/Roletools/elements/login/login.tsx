import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import Input from '../../../../inputs'
import { useProfile } from '../../User/userContext'
import './login.css'
import { loginRoleTools } from '../../service/roletoolsservice'
import ButtonLoading from '../../components/buttonLoading'



const Login = (props : {loadPage : any, setLoadPage : Dispatch<SetStateAction<any>>}) => {

    const [user, setUser] = useState({
        user : '',
        pass : ''
    })

    const [inputState, setInputState] = useState({
        user : true,
        pass : true,  
        incomplete : false
    })

    const [invalid, setInvalid] = useState({
        info : false,
        status : false
    })

    const { profile, setProfile } = useProfile()!


    const [loading, setLoading] = useState(false)

    const [endLoading, setEndLoading] = useState(false)

    

    useEffect(() => {
        
        if(endLoading){
            setLoading(false)
            setEndLoading(false)
        }
    })

    useEffect(() => {
        
        setInvalid({...invalid, info : false})
    }, [user])


    const regularExpression = {
        nombre:  /^[a-zA-ZÀ-ÿ]{2,10}$/,
        pass:  /^[a-zA-ZÀ-ÿ0-9]{2,16}$/,
        email : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      }

    const sendLogin = async () =>{

        if(  inputState.user &&
             inputState.pass &&
             user.user && 
             user.pass){

                   setLoading(true)

                   const response = await loginRoleTools(user)

                   setEndLoading(true)

                   switch (response.data.message){
                            case 'invalid':
                                setInvalid({...invalid, info : true})
                                break;
                            case 'pending':
                                setInvalid({...invalid, status : true, 
                                                        info : false})
                                break;
                            case 'invalid':
                                setInvalid({...invalid, info : true})
                                break;
                            default:
                                setProfile({...profile, 
                                                        user    : user.user,
                                                        token   : response.data.token});

                                window.sessionStorage.setItem('userInfo', JSON.stringify({user : user.user,
                                                                                    token : response.data.token}))    
                                    
                                props.setLoadPage({...props.loadPage, 
                                                                        login : false,
                                                                        userPage : true })


                   }
                        
        
        } else {setInputState({...inputState, incomplete : true})}


    }

    const register = () => {

        props.setLoadPage({...props.loadPage, 
                                              login : false,
                                              register : true  })
    }

    const recovery = () => {

        props.setLoadPage({...props.loadPage,
                                                login : false,
                                                recovery : true})
    }


        return (

                <div className='main-container-roletools'>

                        <div>

                            <div className='roleTools-title-main'>Inicie sesión</div>
 
                            <form >

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
                                            type='password' 
                                            label='contraseña' 
                                            classLabel='input-label-roletool' 
                                            className='pass-input-roletool'
                                            placeholder='Escriba su contraseña'
                                            name='pass'
                                            errorempty='El campo es obligatorio'
                                            errorinput='Solo letras y numeros de hasta 16 carácteres'
                                            errorMessageClass='error-message-input-roletool'
                                            ></Input>

                            </form>

                                            <ButtonLoading  isLoading={loading} 
                                                            insideText='Login' 
                                                            color='black' 
                                                            background='white' 
                                                            hover='#00F3FF' 
                                                            onClick={sendLogin}/>
                                            
                                            {invalid.info && 'Su usuario y/o contraseña son incorrectas'}
                                            {invalid.status && 'Debe activar su cuenta para iniciar sesion. Revise su email, por favor'}

                                            <a onClick={recovery}>¿Olvidó su usuario o su contraseña?</a>
                                            <a onClick={register}>Registrarse</a>

                        </div>



                </div>

                


        )


}

export default Login;