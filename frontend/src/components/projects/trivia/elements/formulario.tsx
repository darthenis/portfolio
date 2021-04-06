
import React, {useState, useMemo, Dispatch, SetStateAction} from 'react'
import countryList from 'react-select-country-list'
import Select from 'react-select'
import {Pages, Player, states} from '../trivia-interfaces-types'



const Formulario = (props:{page: Pages, setPage : Dispatch<SetStateAction<Pages>>,
                           player : Player, setPlayer : Dispatch<SetStateAction<Player>>}) =>{


  const expresiones = {

	       nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	       edad: /^\d{2}$/ // 2 numeros.
       }

  
  const options = useMemo(()=>countryList().getData(), [])
  

  const [inputState, setInputState] = useState<states>({
        nombre: null,
        edad: null,
        incomplete: null
  })

//--------------------------UPDATE----------------------------------------------

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) =>{

    props.setPlayer({

      ...props.player,

      [event.currentTarget.name] : event.currentTarget.value
    })

    console.log(event.currentTarget.value)

  }

  const handleSelectChange = ( e : any) => {

    props.setPlayer({
      ...props.player,
            pais : e.label
    })

  }



  const validation = (e:React.FormEvent<HTMLInputElement>, expresion:RegExp) => {
    
    setInputState({...inputState, [e.currentTarget.name] : expresion.test(e.currentTarget.value)})   

       }



  const submitEvent = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (inputState.edad===true && inputState.nombre===true){

        setInputState({...inputState, incomplete : false})

        setInputState({...inputState, nombre : null, edad : null, incomplete : null})

        props.setPage({...props.page,
                            page1 : false,
                            page2 : true

        })

    } else { setInputState({...inputState, incomplete : true})}

    }


  const borderStatus = (state:boolean | null, player:number | string ) => {

      if (inputState.incomplete===true && player==='' ) return 'solid 5px red'

      else if(state || state===null || player==='' ) return 'solid 5px transparent'

      else if (!state && player!=='') return 'solid 5px red'

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
                  <label htmlFor='nombre'>Nombre</label>
                  <input style={{border:borderStatus(inputState.nombre, props.player.nombre)}}
                         className="in"
                         type="text"
                         placeholder='Escriba su nombre'
                         name='nombre'
                         value={props.player.nombre}
                         onChange={handleInputChange}
                         onKeyUp={(e) => validation(e, expresiones.nombre)}
                        />

                        {(inputState.incomplete===true && props.player.nombre==='') && <p>*Campo obligatorio</p>}
                        {(!inputState.nombre && props.player.nombre!=='') && <p>De entre 2 a 40 caracteres solo letras y espacios</p>}

                  <label htmlFor='edad'>Edad</label>
                  <input style={{border:borderStatus(inputState.edad, props.player.edad)}}
                         className="in"
                         type="text"
                         placeholder='Escriba su edad'
                         name='edad'
                         onChange={handleInputChange}
                         onKeyUp={(e) => validation(e, expresiones.edad)}
                        />
                        {(inputState.incomplete===true && props.player.edad==='') && <p>*Campo obligatorio</p>}
                          {(!inputState.edad && props.player.edad!=='') && <p>2 digitos de 01 al 99</p>}

                  <label htmlFor="country">Pais</label>
                  <Select id='select'
                          options={options}
                          onChange={handleSelectChange}
                          placeholder='Seleccione un pais'
                          name='pais'/>
                          {(inputState.incomplete===true && props.player.pais==='') && <p>*Campo obligatorio</p>}


                  <input id='btn' type="submit" value="Enviar"/>
                  {(inputState.incomplete===true) && <p>Los datos son de caracter obligatorio y han de estar completados de manera correcta</p>}


        </form>
  </div>)
}

export default Formulario
