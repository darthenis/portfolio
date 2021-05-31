import react, { Dispatch, SetStateAction, useState } from 'react'
import { propTypes } from 'react-recaptcha'
import Input from '../../../inputs'
import { recoveryUser } from './roletoolsservice'


const FormEmail = (props : {stateRecover : any, setStateRecover : Dispatch<SetStateAction<any>>}) => {

    const [user, setUser] = useState({
                                        email : ''
                                    })

    const [inputState, setInputState] = useState({
                                                    email : true,
                                                    incomplete : false
                                                    })

    const recovery = async () =>{

        if(inputState.email && user.email){

            const response = await recoveryUser(user)

            if(response){

                props.setStateRecover({...props.stateRecover,
                                                                formEmail : false,
                                                                formCode : true})

            }

        }


    }

    const expresion =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


    return (
        <form onSubmit={recovery}>

                                <Input  type='text'
                                        name='email'
                                        inputState={inputState}
                                        setInputState={setInputState}
                                        label='Escriba su email'
                                        user={user}
                                        setUser={setUser}
                                        classLabel='input-recovery-label'
                                        className='input-recovery'
                                        placeholder='example@example.com'
                                        expresion={expresion}
                                        errorinput='Debe ser un email correcto'
                                        errorempty='Complete el campo'
                                        errorMessageClass='inputerrormsg-recovery'
                                        />

                                        <input type="submit" value='enviar' />
                                
                            </form>
    )
}


export default FormEmail