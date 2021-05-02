import React, {Dispatch, SetStateAction, useState, useEffect} from 'react'
import './rrss.css'
import Input from './inputs'
import instagram from './media/instagram.png'
import facebook from './media/icon-facebook.png'
import { sendMail } from './rrss-service'
import Recaptcha, { ReCAPTCHAProps } from 'react-google-recaptcha'
import {message} from './interfaces-types'



const Rrss = () => {

  const regularExpression = {
    nombre:  /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
    email : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }

  const [messageUser, setMessageUser] = useState<message>({

    from: '',
    name: '',
    message: '',
    token: ''

})

const [inputState, setInputState] = useState({
  
  name : true,
  from : true, 
  message : true,
  incomplete: false

})
  
  const [messageReady, setMessageReady] = useState(false)

  const sendMessage = async () => {

    const mensaje = await sendMail(messageUser)
  }


  useEffect( ()=>{

    if (messageReady===true) {

      sendMessage();
      setMessageReady(false)
    
    }

  }, [messageReady])

  const recaptchaRef = React.createRef<Recaptcha>();

  const onChange = (value:string | null) => {

    setMessageUser((s:any) => { return {...s, token : value}})
    
  }


  const setMessage = (e : React.ChangeEvent<HTMLTextAreaElement>) =>{

    setMessageUser({...messageUser,

      message : e.currentTarget.value
      
    })

  }

  const submit = async (e:React.FormEvent<HTMLFormElement>) =>{

      e.preventDefault();

      if (recaptchaRef.current!==null) {
        
        const tokenrecaptcha = await recaptchaRef.current.executeAsync(); 
      
        }
      

     if (inputState.name && inputState.from && messageUser.name!=='' && messageUser.from!=='' && messageUser.message!==''){

      setInputState({...inputState, incomplete : false})

      setMessageReady(true) 
      
     } else { setInputState({...inputState, incomplete : true})}

  }


      return (


        <div id="contact">

          <div id='header-rrss'>Si desea contactarse conmigo para consultarme sobre mis servicios web <br/>no dude en
          comunicarse a través de este formulario.</div>

          <form onSubmit={submit}>

            <div className={'grid-input-rrss'}>
            <Input  setInputState={setInputState}
                    inputState={inputState}
                    label='Nombre'
                    classLabel='label-rrss'
                    className='input-rrss'
                    type='text' 
                    placeholder='Escriba su nombre' 
                    name='name'
                    user={messageUser}
                    setUser={setMessageUser}
                    errorMessageClass={'errorinput-msg-rrss'}
                    expresion={regularExpression.nombre}
                    errorinput='Solo usar letras y espacios entre 3 y 40 carácteres'
                    errorempty='*El campo es obligatorio'
                    />

            </div>

            <div className={'grid-texttarea-rrss'}>

            <label className='label-textarea'>Mensaje</label>

            <textarea name="message" 
                      id="mensaje"
                      rows={10}
                      cols={5} 
                      value={messageUser.message} 
                      onChange={setMessage} 
                      placeholder='Escriba aqui su mensaje'></textarea>

            </div>

            <div className={'grid-input-rrss'}>

            <Input  setInputState={setInputState}
                    inputState={inputState}
                    label='Email'
                    classLabel='label-rrss'
                    className='input-rrss'
                    type='text' 
                    placeholder='Escriba su email' 
                    name='from'
                    user={messageUser}
                    setUser={setMessageUser}
                    errorMessageClass={'errorinput-msg-rrss'}
                    expresion={regularExpression.email}
                    errorinput='Escriba correctamente su email'
                    errorempty='*El campo es obligatorio'
                    />

            </div>

            <div id='btn-form-rrss'>
                    
                    <input type="submit" value='Enviar'/>

                    {inputState.incomplete && <p className={'errorinput-msg-rrss'}>Los datos son de caracter obligatorio y han de estar completados de manera correcta</p>}

            </div>

          </form>

          <div id='reCAPTCHA'>

          <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply</p>
            
          </div>

          <Recaptcha
                  sitekey='6LdRx70aAAAAAF12Vhv-dZQZzFRwNaklzrurOme9'
                  size='invisible'
                  ref={recaptchaRef}
                  onChange={onChange}
                  badge='bottomright'
                  />


        </div>

      )
}


export default Rrss;
