import React, {useState, useEffect} from 'react'
import './rrss.css'
import { sendMail } from './rrss-service'
import {message} from './interfaces-types'
import Input from './inputs'
import {Form, SendMail, Contact, MessageSending} from './rrss-styled'
import Recaptcha from 'react-google-recaptcha'





const Rrss = () => {



  const [messageUser, setMessageUser] = useState<message>({

    from: '',
    name: '',
    message: '',
    token: ''

})

  const [messageSend, setMessageSend] = useState<string | null>(null)

  
  const regularExpression = {
    nombre:  /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
    email : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }


const onChange = (value:string | null) => {

    setMessageUser((s:any) => { return {...s, token : value}})
    
  }

  const sendMessage = async () => {

    const mensaje = await sendMail(messageUser)

    setMessageSend(mensaje.data)

    setMessageUser((s:any) => { return {...s, token : ''}})

  }


const [inputState, setInputState] = useState({

    name : true,
    from : true, 
    message : true,
    incomplete: false
  
  })

  const setMessage = (e : React.ChangeEvent<HTMLTextAreaElement>) =>{

    setMessageUser({...messageUser,

      message : e.currentTarget.value
      
    })

  }


  const submit = async (e:React.FormEvent<HTMLFormElement>) =>{
    
    e.preventDefault();

    if(messageUser.token===''){

      alert('confirme que no es un bot, por favor')

    }else{
  

          if ( inputState.name && 
                inputState.from && 
                messageUser.name!=='' && 
                messageUser.from!=='' && 
                messageUser.message!=='' ) {

                  setInputState({...inputState, incomplete : false});

                  setMessageSend('sending')

                  console.log('deberia enviar')

                  sendMessage();
            
          } else { setInputState({...inputState, incomplete : true})}

        }

}

  const messagesending= () => {
                  return (<MessageSending emailSend={false}>
                                                          Su mensaje está siendo enviado...<br/>
                                                          <i style={{color: "yellow"}} className="fas fa-envelope"></i> 
                                                    </MessageSending>)
  }
 

  const messagesend = () => {
                          return (<MessageSending emailSend={true}>
                                                              <i style={{color: "green"}} className="far fa-check-circle"></i><br/>
                                                              Su mensaje ha sido recibido <br/>
                                                              Le contestaré en lo más breve posible
                                                          </MessageSending>)
                            }
                
                


      return (


        <Contact emailSend={messageSend!==null} id="contact">

        <div id='header-rrss'>
                
                      <h2> {messageSend===null && 'Contácteme'} </h2>
        
                            </div>


        <SendMail id='mensajeenviado' emailSend={messageSend!==null}>{messageSend=='sending' ? messagesending() : messagesend() }
                                                              
                                                              </SendMail>

                                                              
        <Form emailSend={messageSend!==null} onSubmit={submit}>

                        
                        <Input  setInputState={setInputState}
                                inputState={inputState}
                                label='Nombre'
                                classLabel='label-form-name'
                                className='input-rrss-name'
                                type='text' 
                                placeholder='Escriba su nombre' 
                                name='name'
                                user={messageUser}
                                setUser={setMessageUser}
                                errorMessageClass={'errorinput-msg-rrss-name'}
                                expresion={regularExpression.nombre}
                                errorinput='Solo usar letras y espacios entre 3 y 40 carácteres'
                                errorempty='*El campo es obligatorio'
                                />     

                        <Input  setInputState={setInputState}
                                inputState={inputState}
                                label='Email'
                                classLabel='label-form-email'
                                className='input-rrss-email'
                                type='text' 
                                placeholder='Escriba su email' 
                                name='from'
                                user={messageUser}
                                setUser={setMessageUser}
                                errorMessageClass={'errorinput-msg-rrss-email'}
                                expresion={regularExpression.email}
                                errorinput='Escriba correctamente su email'
                                errorempty='*El campo es obligatorio'
                                />

                        <label className='label-form-mensaje'>Mensaje</label>

                        <textarea name="message" 
                                    id="mensaje"
                                    rows={10}
                                    cols={5} 
                                    value={messageUser.message} 
                                    onChange={setMessage} 
                                    placeholder='Escriba aqui su mensaje'></textarea>


                        <div id='btn-form-rrss'>
                                <div id='captcha'>
                                        <Recaptcha
                                              sitekey='6LdEjskaAAAAABMcL8rv9iZgSjsK1mYbd0zpzNDy'
                                              onChange={onChange}
                                              theme='dark'
                                              />
                                      </div>

                                
                                <input type="submit" value='Enviar'/>

                                {messageSend && <div id='messageSend'>Mensaje enviado</div>}

                                {inputState.incomplete && <p className={'errorinput-msg-rrss'}>Los datos son de caracter obligatorio y han de estar completados de manera correcta</p>}

                        </div>

    </Form>

</Contact>

          
       

      )
}


export default Rrss;



