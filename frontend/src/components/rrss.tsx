import React, {Dispatch, SetStateAction} from 'react'
import './rrss.css'
import Input from './inputs'
import instagram from './media/instagram.png'
import facebook from './media/icon-facebook.png'
import { sendMail } from './rrss-service'



const Rrss = (props : { messageUser    : any, 
                        setMessageUser : Dispatch<SetStateAction<any>>
                        inputState     : any,
                        setInputState  : Dispatch<SetStateAction<any>>}) => {

  const regularExpression = {
    nombre:  /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
    email : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }

  const setMessage = (e : React.ChangeEvent<HTMLTextAreaElement>) =>{

    props.setMessageUser({...props.messageUser,

      message : e.currentTarget.value
      
    })

  }

  const submit = async (e:React.FormEvent<HTMLFormElement>) =>{

      e.preventDefault();

      if (props.inputState.name && props.inputState.from && props.messageUser.name!=='' && props.messageUser.from!=='' && props.messageUser.message!==''){

        props.setInputState({...props.inputState, incomplete : false})

        const mensaje = await sendMail(props.messageUser)

        console.log(mensaje)



        

    } else { props.setInputState({...props.inputState, incomplete : true})}


  }


      return (

        <div id="contact">

          <div id='header-rrss'>Si desea contactarse conmigo para consultarme sobre mis servicios web <br/>no dude en
          comunicarse con este formulario o a través de mis redes sociales más abajo.</div>

          <form onSubmit={submit}>

            <div className={'grid-input-rrss'}>
            <Input  setInputState={props.setInputState}
                    inputState={props.inputState}
                    label='Nombre'
                    classLabel='label-rrss'
                    className='input-rrss'
                    type='text' 
                    placeholder='Escriba su nombre' 
                    name='name'
                    user={props.messageUser}
                    setUser={props.setMessageUser}
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
                      value={props.messageUser.message} 
                      onChange={setMessage} 
                      placeholder='Escriba aqui su mensaje'></textarea>

            </div>

            <div className={'grid-input-rrss'}>

            <Input  setInputState={props.setInputState}
                    inputState={props.inputState}
                    label='Email'
                    classLabel='label-rrss'
                    className='input-rrss'
                    type='text' 
                    placeholder='Escriba su email' 
                    name='from'
                    user={props.messageUser}
                    setUser={props.setMessageUser}
                    errorMessageClass={'errorinput-msg-rrss'}
                    expresion={regularExpression.email}
                    errorinput='Escriba correctamente su email'
                    errorempty='*El campo es obligatorio'
                    />

            </div>

            <div id='btn-form-rrss'>
                    
                    <input type="submit" value='Enviar'/>

                    {props.inputState.incomplete && <p className={'errorinput-msg-rrss'}>Los datos son de caracter obligatorio y han de estar completados de manera correcta</p>}

            </div>


          </form>



          <div id='redes'>

                <p>También puede contacterse vía mis redes sociales:</p>

                <img className='icon-rrss' src={instagram} alt="instagram"/>
                <img className='icon-rrss' src={facebook} alt="facebook"/>
            
          </div>











        </div>

      )
}


export default Rrss;
