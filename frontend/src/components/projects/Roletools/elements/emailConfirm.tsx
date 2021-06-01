import React, {useState} from 'react'
import { inputCSS } from 'react-select/src/components/Input'
import ReactCodeInput from 'react-verification-code-input'
import { checkConfirmCode, setNewEmail } from './roletoolsservice'

 
const EmailConfirm = () => {

    const [code, setCode] = useState('')

    const [loading, setLoading] = useState(false)

    const [changeMyEmail, setChangeMyEmail] = useState(false)


    const sendCode = (e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if(code){

            setLoading(true)

            checkConfirmCode(code)  //crear respuesta del servidor

        }

    }

    const onComplete = (insertCode : string) => {

            setCode(insertCode)

    }

    const sendMeNewCode = () => {




    }

    const sendMyNewEmail = async () => {
            
            const response = await setNewEmail(code)
            
            response.data.message==='done' && console.log('email renovado') 
                            
            return console.log('sesión expirada')

    }


        return( 

                    <div className='container-register-roletools'>

                        ¿No te llegó el código?

                        <button onClick={sendMeNewCode}>Reenviar email</button>

                        ¿Quieres cambiar de email?

                        <button onClick={() => {setChangeMyEmail(true)}}>Cambiar el email</button>

                        {changeMyEmail && <><input type='email'/><button onClick={sendMyNewEmail}/></>}

                        <form onSubmit={sendCode}>

                                <ReactCodeInput type='text' 
                                                fields={4} 
                                                autoFocus={true} 
                                                title='Inserte el Código' 
                                                onComplete={onComplete}
                                                placeholder={['-','-','-','-']}
                                                loading={loading}/>
                                
                                <input type="submit" />
                        </form>

                    </div>

        )

}

export default EmailConfirm