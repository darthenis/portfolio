
import React, {useState, useMemo, Dispatch, SetStateAction} from 'react'
import countryList from 'react-select-country-list'
import Select from 'react-select'
import {Pages, Player, states} from '../trivia-interfaces-types'
import Input from '../../../inputs'




const Formulario = (props:{page: Pages, setPage : Dispatch<SetStateAction<Pages>>,
                           player : Player, setPlayer : Dispatch<SetStateAction<Player>>}) =>{


  const expresiones = {

	       nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	       edad: /^\d{2}$/ // 2 numeros.
       }

  
  const options = useMemo(()=>countryList().getData(), [])
  

  const [inputState, setInputState] = useState<states>({
        nombre: true,
        edad: true,
        incomplete: false
  })

//--------------------------UPDATE----------------------------------------------

const handleSelectChange = ( e : any) => {

  props.setPlayer({
    ...props.player,
          pais : e.label
  })

}

  const submitEvent = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (inputState.edad && inputState.nombre && props.player.nombre!=='' && props.player.edad!=='' && props.player.pais!==''){

        setInputState({...inputState, incomplete : false})

        setInputState({...inputState, nombre : null, edad : null, incomplete : null})

        props.setPage({...props.page,
                            page1 : false,
                            page2 : true

        })

    } else { setInputState({...inputState, incomplete : true})}

    }


  return (

  <div id="trivia-block">
        <div id="trivia-talk">

              <i id='emoji-jump' className="fas fa-grin-alt"></i>

              <div>
                  Antes de jugar a esta trivia deberás<br/>
                  llenar con tus datos este formulario <br/>
                  para asi formar parte de la tabla de <br/>
                  jugadores
              </div>

        </div>

        <form onSubmit={submitEvent}>



                  <Input  
                          setInputState={setInputState}
                          inputState={inputState}
                          label='Nombre'
                          type='text'
                          placeholder='Escriba su nombre'
                          name='nombre'
                          expresion={expresiones.nombre}
                          user={props.player}
                          setUser={props.setPlayer}
                          className='in'
                          classLabel='labelform'
                          errorempty='El campo es obligatorio*'
                          emptyactive={(inputState.incomplete && props.player.nombre==='') ? true : false }
                          errorinput='De entre 2 a 40 caracteres solo letras y espacios'/>

                  <Input  
                          setInputState={setInputState}
                          inputState={inputState}
                          label='Edad'
                          type='text'
                          placeholder='Escriba su edad'
                          name='edad'
                          expresion={expresiones.edad}
                          user={props.player}
                          setUser={props.setPlayer}
                          className='in'
                          classLabel='labelform'
                          errorempty='El campo es obligatorio*'
                          emptyactive={(inputState.incomplete && props.player.edad==='') ? true : false }
                          errorinput='2 digitos de 01 al 99'/>

                  <label className='labelform'>Pais:</label>
                  <Select className='select'
                          classNamePrefix='select'
                          options={options}
                          onChange={handleSelectChange}
                          placeholder='Seleccione un pais'
                          name='pais'/>
                          {(inputState.incomplete && props.player.pais==='') && <p>*Campo obligatorio</p>}


                  <input id='btn' type="submit" value="Enviar"/>

                  {inputState.incomplete && <p>Los datos son de caracter obligatorio y han de estar completados de manera correcta</p>}


        </form>
  </div>)
}

export default Formulario