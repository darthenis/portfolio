import React, {useState, Dispatch, SetStateAction} from 'react'
import {Player, questions} from '../trivia-interfaces-types'
import {questionsEasy} from './list-questions'
import {ButtonNext, Opciones} from '../trivia-style'
import './preguntas.css'
import {Pages} from '../trivia-interfaces-types'
import {addPlayer} from '../triviaservice'


let selected=false;

const Preguntas = (props: {page: Pages, setPage : Dispatch<SetStateAction<Pages>>, 
  
                        registro : number, setRegistro : Dispatch<SetStateAction<number>>,
                      
                        player : Player, setPlayer : Dispatch<SetStateAction<Player>>}) => {


  const [questions, setquestions] = useState<questions[]>(questionsEasy)

  const [actualQuestion, setactualQuestions] = useState(0)

  const [choice, setchoice] = useState<number | null>()


    const selectQuestion = (selectedOption:number) => {

        selected=!selected;

        setchoice(selectedOption)

        if (selectedOption===questions[actualQuestion].correcta) props.setRegistro(props.registro + 1)

        console.log('Respuesta correcta: ', questions[actualQuestion].correcta)
        console.log('Opcion seleccionada: ', selectedOption)
        console.log('Respuestas acertadas: ',props.registro)
        

        }


    const nextQuestion = () =>{
      
      console.log('boton siguiente apretado')

      selected=!selected

      if (actualQuestion < 9){

        setactualQuestions(actualQuestion + 1)

        } else {

            setchoice(null)

            props.setPlayer({...props.player, dificultad : props.registro.toString()})

            addPlayer(props.player)

            props.setPage({...props.page, page3 : false, page4 : true   })
          
            }
          
          }

      

    const colorstatus = (opcion:number) =>{

      if (opcion===choice && choice!==questions[actualQuestion].correcta && selected) return 'red';

      else if (opcion===questions[actualQuestion].correcta && selected)  return 'rgb(124, 252, 0)';

      else if (opcion!==questions[actualQuestion].correcta && selected && opcion!==choice) return 'gray'

      else return 'rgb(126, 250, 250)'

    }

    return (

      <div id='block-page-preguntas'>
            <div id='block-la-pregunta'>{actualQuestion+1}) {questions && questions[actualQuestion].pregunta}</div>

            <div id='block-respuestas'>

                <div id='block-carita'>
                        <div className='text'>
                          {!selected && <span><i id='emoji-jump' className="fas fa-grin-tongue-squint"></i><br/> Tienes que elegir una respuesta!</span>}
                          
                          {(choice===questions[actualQuestion].correcta && selected) && <span><i className="fas fa-grin-alt"></i><br/> Correcto!</span> }
                          
                          {(choice!==questions[actualQuestion].correcta && selected) && <span><i id='emoji-girar' className="fas fa-grin-squint"></i><br/> Incorrecto!</span>}
                        </div>
                      </div>

                <div id='block-opciones'>

                    <Opciones
                        isactive={selected}
                        onClick={() => (!selected && selectQuestion(1))}
                        style={{backgroundColor:colorstatus(1)}}
                        >
                        A: {questions && questions[actualQuestion].opcion1}
                    </Opciones>

                    <Opciones
                        isactive={selected}
                        onClick={() => (!selected && selectQuestion(2))}
                        style={{backgroundColor:colorstatus(2)}}
                        >
                        B: {questions && questions[actualQuestion].opcion2}
                    </Opciones>

                    <Opciones
                        isactive={selected}
                        onClick={() => (!selected && selectQuestion(3))}
                        style={{backgroundColor:colorstatus(3)}}
                        >
                        C: {questions && questions[actualQuestion].opcion3}
                    </Opciones>

                    <Opciones
                        isactive={selected}
                        onClick={() => (!selected && selectQuestion(4))}
                        style={{backgroundColor:colorstatus(4)}}
                        >
                        D: {questions && questions[actualQuestion].opcion4}
                    </Opciones>
                </div>

                <div id='container-boton-next'>

                      <ButtonNext isactive={selected}
                                  onClick={() => (selected && nextQuestion()) }
                                  >Siguiente</ButtonNext>

                </div>

            </div>

      </div>

    )

}

export default Preguntas
