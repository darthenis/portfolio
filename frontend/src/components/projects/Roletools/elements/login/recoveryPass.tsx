import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Input from '../../../../inputs';
import ButtonLoading from '../../components/buttonLoading';
import { restPassword } from '../../service/roletoolsservice';



const RecoveryPass = (props : {page : any, 
                                setPage : Dispatch<SetStateAction<any>>, 
                                email : string}) => {


    const [newPass, setNewPass] = useState({

        pass       : '',

    })

    const [passCheck, setPassCheck] = useState({passCheck : ''})


    const [inputState, setInputState] = useState({
        pass : true,
        passCheck : true,
        passState  : true,
        incomplete : false
    })

    const [loading, setLoading] = useState(false)
    
    const [endLoading, setEndLoading] = useState(false)

    useEffect(() => {
        
        if(endLoading){
            setLoading(true)
            setEndLoading(true)
        }

    })

    const regularExpresion = /^[a-zA-ZÀ-ÿ0-9]{2,16}$/

    useEffect(() => {
        
        if(newPass.pass===passCheck.passCheck){

            setInputState({...inputState, passState : true})
           

        } else {

            setInputState({...inputState, passState : false})
    
        }
    }, [newPass, passCheck])


    const sendNewPass = async () => {

        setLoading(true)

        const response = await restPassword(props.email, newPass.pass)

        setEndLoading(true)

                switch (response.data.message){
                        case 'done':
                            props.setPage({...props.page, pass : false, passUpdated : true})
                            break;
                        default:
                            alert('error')

                }

    }

    

    return (    <>
                        

                                <Input  type='password'
                                        name='pass'
                                        user={newPass}
                                        setUser={setNewPass}
                                        inputState={inputState}
                                        setInputState={setInputState}
                                        placeholder='Introdusca su nueva contraseña'
                                        label='Nueva contraseña'
                                        classLabel='pass'
                                        className='input-pass'
                                        errorMessageClass='errormsg'
                                        errorempty='El campo es obligatorio'
                                        errorinput='Solo letras y numeros de hasta 16 carácteres'
                                        expresion={regularExpresion}/>


                                <Input  type='password'
                                        name='passCheck'
                                        user={passCheck}
                                        setUser={setPassCheck}
                                        inputState={inputState}
                                        setInputState={setInputState}
                                        placeholder='Repita su nueva contraseña'
                                        label='Repita su contraseña'
                                        classLabel='pass'
                                        className='input-pass'
                                        errorMessageClass='errormsg'
                                        errorempty='El campo es obligatorio'
                                        errorinput='Solo letras y numeros de hasta 16 carácteres'
                                        expresion={regularExpresion}/> 

                                {!inputState.passState && 'Las contraseñas no coinciden'}         
                                
                                  
                                <ButtonLoading  isLoading={loading} 
                                                            insideText='Enviar' 
                                                            color='black' 
                                                            background='white' 
                                                            hover='#00F3FF' 
                                                            onClick={sendNewPass}/>

                </>



        )


}


export default RecoveryPass