
import React, {useState, useMemo, Dispatch, SetStateAction} from 'react'
import countryList from 'react-select-country-list'
import Select from 'react-select'
import {Pages, User} from './preginterf'



const Formulario = (props:{page: Pages, setPage : Dispatch<SetStateAction<Pages>>,
                           user : User, setUser : Dispatch<SetStateAction<User>>}) =>{


  const expresiones = {

	       nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	       edad: /^\d{2}$/ // 2 numeros.
       }

  const options = useMemo(()=>countryList().getData(), [])



  type estados={
    nombre: boolean | null,
    edad: boolean | null,
    datos: boolean | null
  }

  const [userState, setUserState] = useState<estados>({
        nombre: null,
        edad: null,
        datos: null
  })

//--------------------------UPDATE----------------------------------------------

  const handleInputChange = (event: { target: { name: string; value: string; }; }): void =>{

    props.setUser({

      ...props.user,

      [event.target.name] : event.target.value
    })

  }

  const handleSelectChange = (value:any) => {

    props.setUser({
      ...props.user,
      ['pais'] : value.label
    })

  }



  const validationnombre = () => {

          setUserState({...userState, nombre : expresiones.nombre.test(props.user.nombre)})

        }

  const validationedad = () => {

          setUserState({...userState, edad : expresiones.edad.test(props.user.edad)})
  }



  const submitEvent = (e: React.FormEvent) => {

    e.preventDefault();

    if (userState.edad===true && userState.nombre===true){

        setUserState({...userState, datos : true})

        props.setPage({...props.page,
                            page1 : false,
                            page2 : true

        })

    } else { setUserState({...userState, datos : false})}

    }


  const borderStatus = (state:boolean | null, user:string ) => {

      if (userState.datos===false && user==='') return 'solid 5px red'

      else if(state || state===null || user==='' ) return 'solid 5px transparent'

      else if (!state && user!=='') return 'solid 5px red'

    }

  return (

  <div id="trivia-block">
        <div id="trivia-talk">

              <i className="fas fa-grin-alt"></i>

              <div>
                  Antes de jugar a esta trivia deberás<br/>
                  llenar con tus datos este formulario <br/>
                  para asi formar parte de la tabla de <br/>
                  jugadores
              </div>

        </div>

               <form onSubmit={submitEvent}>
                  <label htmlFor='name'>Nombre</label>
                  <input style={{border:borderStatus(userState.nombre, props.user.nombre)}}
                         className="in"
                         type="text"
                         placeholder='Escriba su nombre'
                         name='nombre'
                         value={props.user.nombre}
                         onChange={handleInputChange}
                         onKeyUp={validationnombre}
                        />

                        {(userState.datos===false && props.user.nombre=='') && <p>*Campo obligatorio</p>}
                        {(!userState.nombre && props.user.nombre!=='') && <p>De entre 2 a 40 caracteres solo letras y espacios</p>}

                  <label htmlFor='age'>Edad</label>
                  <input style={{border:borderStatus(userState.edad, props.user.edad)}}
                         className="in"
                         type="text"
                         placeholder='Escriba su edad'
                         name='edad'
                         onChange={handleInputChange}
                         onKeyUp={validationedad}
                        />
                          {(userState.datos===false && props.user.edad=='') && <p>*Campo obligatorio</p>}
                          {(!userState.edad && props.user.edad!=='') && <p>2 digitos de 01 al 99</p>}

                  <label htmlFor="country">Pais</label>
                  <Select id='select'
                          options={options}
                          onChange={handleSelectChange}
                          placeholder='Seleccione un pais'
                          name='pais'/>
                          {(userState.datos===false && props.user.pais=='') && <p>*Campo obligatorio</p>}


                  <input id='btn' type="submit" value="Enviar"/>
                  {(userState.datos===false) && <p>Los datos son de caracter obligatorio y han de estar completados de manera correcta</p>}


               </form>
             </div>)
}

export default Formulario
