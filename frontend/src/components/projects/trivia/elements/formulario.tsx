
import React, {useState, useMemo, Dispatch, SetStateAction} from 'react'
import countryList from 'react-select-country-list'
import Select from 'react-select'
import {Pages, Player} from '../trivia-interfaces-types'



const Formulario = (props:{page: Pages, setPage : Dispatch<SetStateAction<Pages>>,
                           player : Player, setPlayer : Dispatch<SetStateAction<Player>>}) =>{


  const expresiones = {

	       nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	       edad: /^\d{2}$/ // 2 numeros.
       }

  
  const options = useMemo(()=>countryList().getData(), [])

  



  type states={
    nombre: boolean | null,
    edad: boolean | null,
    datos: boolean | null
  }

  const [playerState, setPlayerState] = useState<states>({
        nombre: null,
        edad: null,
        datos: null
  })

//--------------------------UPDATE----------------------------------------------

  const handleInputChange = (event: { target: { name: string; value: string; }; }): void =>{

    props.setPlayer({

      ...props.player,

      [event.target.name] : event.target.value
    })

  }

  const handleSelectChange = ( e : any ) => {

    props.setPlayer({
      ...props.player,
            pais : e.label
    })

  }



  const validationnombre = () => {

          setPlayerState({...playerState, nombre : expresiones.nombre.test(props.player.nombre)})

        }

  const validationedad = () => {

          setPlayerState({...playerState, edad : expresiones.edad.test(props.player.edad)})
  }



  const submitEvent = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (playerState.edad===true && playerState.nombre===true){

        setPlayerState({...playerState, datos : true})

        setPlayerState({...playerState, nombre : null, edad : null, datos : null})

        props.setPage({...props.page,
                            page1 : false,
                            page2 : true

        })

    } else { setPlayerState({...playerState, datos : false})}

    }


  const borderStatus = (state:boolean | null, player:string ) => {

      if (playerState.datos===false && player==='') return 'solid 5px red'

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
                  <label htmlFor='name'>Nombre</label>
                  <input style={{border:borderStatus(playerState.nombre, props.player.nombre)}}
                         className="in"
                         type="text"
                         placeholder='Escriba su nombre'
                         name='nombre'
                         value={props.player.nombre}
                         onChange={handleInputChange}
                         onKeyUp={validationnombre}
                        />

                        {(playerState.datos===false && props.player.nombre==='') && <p>*Campo obligatorio</p>}
                        {(!playerState.nombre && props.player.nombre!=='') && <p>De entre 2 a 40 caracteres solo letras y espacios</p>}

                  <label htmlFor='age'>Edad</label>
                  <input style={{border:borderStatus(playerState.edad, props.player.edad)}}
                         className="in"
                         type="text"
                         placeholder='Escriba su edad'
                         name='edad'
                         onChange={handleInputChange}
                         onKeyUp={validationedad}
                        />
                        {(playerState.datos===false && props.player.edad==='') && <p>*Campo obligatorio</p>}
                          {(!playerState.edad && props.player.edad!=='') && <p>2 digitos de 01 al 99</p>}

                  <label htmlFor="country">Pais</label>
                  <Select id='select'
                          options={options}
                          onChange={handleSelectChange}
                          placeholder='Seleccione un pais'
                          name='pais'/>
                          {(playerState.datos===false && props.player.pais==='') && <p>*Campo obligatorio</p>}


                  <input id='btn' type="submit" value="Enviar"/>
                  {(playerState.datos===false) && <p>Los datos son de caracter obligatorio y han de estar completados de manera correcta</p>}


        </form>
  </div>)
}

export default Formulario
