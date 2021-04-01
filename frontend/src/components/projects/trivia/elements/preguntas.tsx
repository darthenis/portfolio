import React, {useState, Dispatch, SetStateAction} from 'react'
import {questions} from '../trivia-interfaces-types'
import {preguntasFacil} from './list-preguntas'
import {ButtonNext, Opciones} from '../trivia-style'
import './preguntas.css'
import {Pages} from '../trivia-interfaces-types'


let validar=false;

const Preguntas = (props: {page: Pages, setPage : Dispatch<SetStateAction<Pages>>, 
                          registro : number, setRegistro : Dispatch<SetStateAction<number>>}) => {

  const [preguntas, setPreguntas] = useState<questions[]>(preguntasFacil)

  const [numpregunta, setNumpreguntas] = useState(0)

  const [eleccion, setEleccion] = useState<number | null>(null)


    const nextquestion = (num:number) => {

        validar=!validar;

        if(validar) {

          setEleccion(num)

          
        }

        else if (numpregunta < 9){

          setEleccion(null)

          setNumpreguntas(numpregunta + 1)

          }

          eleccion===preguntas[numpregunta].correcta && props.setRegistro(props.registro + 1)

          if (numpregunta===9 && !validar) props.setPage({...props.page,
                                                              page3 : false,
                                                              page4 : true   })
         


    }

    const statuscolor = (index:number, opcion:number) =>{

      if (eleccion!==preguntas[numpregunta].correcta && eleccion===opcion) return 'red';

      else if (preguntas[index].correcta===opcion && validar)  return 'rgb(124, 252, 0)';

      else if (preguntas[index].correcta!==opcion && validar && opcion!==eleccion) return 'gray'

      else return 'rgb(126, 250, 250)'

    }

    return (

      <div id='block-page-preguntas'>
            <div id='block-la-pregunta'>{numpregunta+1}) {preguntas && preguntas[numpregunta].pregunta}</div>

            <div id='block-respuestas'>

                <div id='block-carita'>
                        <div className='text'>
                          {!validar && <span><i id='emoji-jump' className="fas fa-grin-tongue-squint"></i><br/> Tienes que elegir una respuesta!</span>}
                          {(eleccion===preguntas[numpregunta].correcta && validar) && <span><i className="fas fa-grin-alt"></i><br/> Correcto!</span> }
                          {(eleccion!==preguntas[numpregunta].correcta && validar) && <span><i id='emoji-girar' className="fas fa-grin-squint"></i><br/> Incorrecto!</span>}
                        </div>
                      </div>

                <div id='block-opciones'>

                    <Opciones
                        isactive={validar}
                        onClick={() => (!validar && nextquestion(1))}
                        style={{backgroundColor:statuscolor(numpregunta, 1, )}}
                        >
                        A: {preguntas && preguntas[numpregunta].opcion1}
                    </Opciones>

                    <Opciones
                        isactive={validar}
                        onClick={() => (!validar && nextquestion(2))}
                        style={{backgroundColor:statuscolor(numpregunta, 2)}}
                        >
                        B: {preguntas && preguntas[numpregunta].opcion2}
                    </Opciones>

                    <Opciones
                        isactive={validar}
                        onClick={() => (!validar && nextquestion(3))}
                        style={{backgroundColor:statuscolor(numpregunta, 3)}}
                        >
                        C: {preguntas && preguntas[numpregunta].opcion3}
                    </Opciones>

                    <Opciones
                        isactive={validar}
                        onClick={() => (!validar && nextquestion(4))}
                        style={{backgroundColor:statuscolor(numpregunta, 4)}}
                        >
                        D: {preguntas && preguntas[numpregunta].opcion4}
                    </Opciones>
                </div>

                <div id='container-boton-next'>

                      <ButtonNext isactive={validar}
                                  onClick={() => (validar && nextquestion(0)) }
                                  >Siguiente</ButtonNext>

                </div>

            </div>

      </div>

    )

}

export default Preguntas
