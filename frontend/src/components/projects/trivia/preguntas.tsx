import React, {useState, useEffect, MouseEventHandler} from 'react'
import {questions} from './preginterf'
import preguntasFacil from './list-preguntas-facil'
import {ButtonNext, Opciones} from './preguntas-style'
import './preguntas.css'

let validar=false;

const Preguntas = ({setDone, registros, setRegistros}:any) => {

  const [preguntas, setPreguntas] = useState<questions[]>(preguntasFacil)


    const [numpregunta, setNumpreguntas] = useState(0)

     //guardar las respuestas correctas/incorrectas

    const [eleccion, setEleccion] = useState<number | null>(null)


    const nextquestion = (num:number) => {

        validar=!validar;

        if(validar) {

          setEleccion(num)

          //eleccion===preguntas[numpregunta].correcta && setRegistro(registro + 1)

          console.log(registros)
        }

        else {

          setEleccion(null)

            if(numpregunta===9){

              setDone(true)

            } else {setNumpreguntas(numpregunta + 1)}


          }


    }

    const statuscolor = (index:number, opcion:number) =>{

      if (eleccion!==preguntas[numpregunta].correcta && eleccion===opcion) return 'red';

      else if (preguntas[index].correcta===opcion && validar)  return 'rgb(124, 252, 0)';


      else if (preguntas[index].correcta!==opcion && validar && opcion!==eleccion) return 'gray'

      else return 'rgb(126, 250, 250'

    }

    return (

      <div id='block-page-preguntas'>
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
                    onClick={() => (validar && nextquestion(0)) }>Siguiente</ButtonNext>

          </div>

      </div>

      </div>

    )

}

export default Preguntas
