import React, {useEffect, useState} from 'react'
import { reSendLink, setNewEmail } from '../../service/roletoolsservice'
import { useProfile } from '../../User/userContext'
import './emailConfirmation.css'
import ButtonLoading from '../../components/buttonLoading'

 
const EmailConfirm = () => {

    const [changeMyEmail, setChangeMyEmail] = useState(false)

    const [myNewEmail, setMyNewEmail] = useState({email : ''})

    const [newEmailDone, setNewEmailDone] = useState(false)

    const [newSendCode, setNewSendCode] = useState<string | null>(null)

    const [startLoad, setStartLoad] = useState({
        sendNewLink : false,
        sendNewEmail : false
    })

    const [endLoad, setEndLoad] = useState({
        endNewLink : false,
        endNewEmail : false
    })


    useEffect(()=>{

        if (endLoad.endNewLink){
            setStartLoad({...startLoad, sendNewLink : false})
            setEndLoad({...endLoad, endNewLink : false})
        }

        if (endLoad.endNewEmail){
            setStartLoad({...startLoad, sendNewEmail : false})
            setEndLoad({...endLoad, endNewEmail : false})
        }



    })


    const { profile } = useProfile()!



    const sendMeNewLink = async () => {

           setStartLoad({...startLoad, sendNewLink : true})

           const res = await reSendLink(profile.user)

           setEndLoad({...endLoad, endNewLink : true})

           switch (res.data.message){
                case 'error':
                    setNewSendCode(res.data.message)
                    break;
                case 'send':
                    setNewSendCode(res.data.message)
                    break
           }

    }

    const changingEmail = (e : React.FormEvent<HTMLInputElement>) => {

            setMyNewEmail({...myNewEmail, email : e.currentTarget.value})

    }

    const renoveEmail = async () => { 

            setStartLoad({...startLoad, sendNewEmail : true})
            
            const response = await setNewEmail(myNewEmail.email, profile.user)

            setEndLoad({...endLoad, endNewEmail : true})
            
            if (response.data.message==='send') {
                
                setNewEmailDone(true)
                
                setChangeMyEmail(false)
            
            }
                        

    }

    const startChange = () => {

        setChangeMyEmail(true)

        setNewEmailDone(false)

    }


        return( 

                    <div className='register-container-roletools'>

                        <div>

                        <h2>Se te ha enviado un link de confirmación a tu casilla de correo</h2>    

                        <h4>¿No te llegó el link de activación?</h4>

                        <ButtonLoading  insideText='Reenviar link' isLoading={startLoad.sendNewLink} color='black' background='white' hover='#00F3FF' onClick={sendMeNewLink}/>

                        {newSendCode === 'send' && 'Email reenviado, ¡revisa tu correo!'}
                        {newSendCode === 'error' && 'Error al reenviar el link de activación, intenta cambiando el email'}

                        <br/> <span>¿Quieres cambiar de email?</span>

                        <input    type='email' 
                                                onChange={changingEmail}
                                                placeholder='Escriba su email' 
                                                value={myNewEmail.email}/>
                                                
                        <ButtonLoading  insideText='Cambiar Email' 
                                        isLoading={startLoad.sendNewEmail} 
                                        color='black' 
                                        background='white' 
                                        hover='#00F3FF' 
                                        onClick={renoveEmail}/>

                        {newEmailDone && 'Email actualizado y link de activación enviado'}

                        </div>

                    </div>

        )

}

export default EmailConfirm