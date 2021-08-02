import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Input from '../../../../inputs'
import ButtonLoading from '../../components/buttonLoading'
import { recoveryUser } from '../../service/roletoolsservice'





const RecoveryEmail = (props : {page : any, 
                                setPage : Dispatch<SetStateAction<any>>, 
                                login : any, 
                                setLogin : Dispatch<SetStateAction<any>>
                                input : any,
                                setInput : Dispatch<SetStateAction<any>>}) => {

    const expresion =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const [checkEmail, setCheckEmail] = useState<boolean>(false)

    const [inputState, setInputState] = useState({
            email : true,
            incomplete : false
        })

    const [loading, setLoading] = useState(false)

    const [endLoading, setEndLoading] = useState(false)

    useEffect(() => {
       
        if(endLoading){
            setLoading(false)
            setEndLoading(false)
        }
    })


    const recovery = async () =>{
                            
                            if(inputState.email && props.input.email){

                                    setLoading(true)
                            
                                    const response = await recoveryUser(props.input)

                                    setEndLoading(true)
                            
                                    switch (response.data.message){
                                                case 'send':
                                                    setCheckEmail(false)
                                                    props.setPage({...props.page, email : false, code : true})
                                                    break;
                                                case 'invalid':
                                                    setCheckEmail(true)
                                            }
                            
                                        }
                            
                                }


    const alertEmail = () => {

        alert('El email no se encuentra registrado')

        setCheckEmail(false)

    }

    if(checkEmail){

        alertEmail()
    }

    const backLogin = () => {

        props.setLogin({...props.login, recovery : false, login : true})

    }

    return (

        <>
                
                        <Input  type='text'
                                name='email'
                                inputState={inputState}
                                setInputState={setInputState}
                                label='Escriba su email'
                                user={props.input}
                                setUser={props.setInput}
                                classLabel='input-label-roletool'
                                className='input-recovery'
                                placeholder='example@example.com'
                                expresion={expresion}
                                errorinput='Debe ser un email correcto'
                                errorempty='Complete el campo'
                                errorMessageClass='inputerrormsg-recovery'
                        />

                        
                <ButtonLoading  isLoading={loading} 
                                                            insideText='Enviar' 
                                                            color='black' 
                                                            background='white' 
                                                            hover='#00F3FF' 
                                                            onClick={recovery}/>

                <button className='back-login-recover' onClick={backLogin}>volver</button>

    </>

    )


}


export default RecoveryEmail