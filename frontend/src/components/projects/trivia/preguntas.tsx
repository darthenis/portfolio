import React, {useState, useEffect, MouseEventHandler} from 'react'
import {questions} from './preginterf'
import './preguntas.css'
import preguntasFacil from './list-preguntas-facil'
import {ButtonNext} from './preguntas-style'

let validar=false


const Preguntas = () =>{

    const [preguntas, setPreguntas] = useState<questions[]>(preguntasFacil)


      const [numpregunta, setNumpreguntas] = useState(0)

      const [registro, setRegistro] = useState()

      const [eleccion, setEleccion] = useState<number | null>(null)


      const nextquestion = (num:number) => {

          validar=!validar;

          if(validar) setEleccion(num)

          else {

              setNumpreguntas(numpregunta + 1)

              setEleccion(null)

            }



      }

      const statuscolor = (index:number, opcion:number) =>{

        if (eleccion!==preguntas[numpregunta].correcta && eleccion===opcion) {return 'red'; setEleccion(null)}

        else if (preguntas[index].correcta===opcion && validar===true) return 'green'

        else return 'gray'

      }


      return ( <div id='block-preguntas'>

                  <div id='block-la-pregunta'>{numpregunta+1}) {preguntas && preguntas[numpregunta].pregunta}</div>


                  <div id='block-respuestas'>

                      <div id='block-carita'>
                              <div className='text'>
                                {!validar && <span><i className="fas fa-grimace"></i><br/> Tienes que elegir una respuesta!</span>}
                                {(eleccion===preguntas[numpregunta].correcta && validar) && <span><i className="fas fa-grin-alt"></i><br/> Correcto!</span> }
                                {(eleccion!==preguntas[numpregunta].correcta && validar) && <span><i className="fas fa-grin-squint"></i><br/> Incorrecto!</span>}
                              </div>
                            </div>

                      <div id='block-opciones'>

                          <div className='respuestas'
                               onClick={() => (nextquestion(1))}
                               style={{backgroundColor:statuscolor(numpregunta, 1, )}}
                               >
                               A: {preguntas && preguntas[numpregunta].opcion1}
                          </div>

                          <div className='respuestas'
                               onClick={() => (nextquestion(2))}
                               style={{backgroundColor:statuscolor(numpregunta, 2)}}
                               >
                               B: {preguntas && preguntas[numpregunta].opcion2}
                          </div>

                          <div className='respuestas'
                               onClick={() => (nextquestion(3))}
                               style={{backgroundColor:statuscolor(numpregunta, 3)}}
                               >
                               C: {preguntas && preguntas[numpregunta].opcion3}
                          </div>

                          <div className='respuestas'
                               onClick={() => (nextquestion(4))}
                               style={{backgroundColor:statuscolor(numpregunta, 4)}}
                               >
                               D: {preguntas && preguntas[numpregunta].opcion4}
                          </div>

                      </div>

                      <div id='container-boton-next'>

                    <ButtonNext>Siguiente</ButtonNext>

                      </div>

                  </div>


      </div>

       )


}


export default Preguntas
