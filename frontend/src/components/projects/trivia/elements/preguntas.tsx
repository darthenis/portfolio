import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import {Player, questions} from '../trivia-interfaces-types'
import {questionsEasy} from './list-questions'
import {ButtonNext, Opciones} from '../trivia-style'
import './preguntas.css'
import {Pages} from '../trivia-interfaces-types'


let selection=false; //verifica si el jugador ha hecho su elección

const Preguntas = (props: {page: Pages, setPage : Dispatch<SetStateAction<Pages>>, 
                      
                        player : Player, setPlayer : Dispatch<SetStateAction<Player>>}) => {


  const [questions, setquestions] = useState<questions[]>(questionsEasy)

  const [actualQuestion, setactualQuestions] = useState(0)

  const [choice, setchoice] = useState<number | null>(null)

  const [optionStatus, setOptionStatus] = useState<string[]>(['rgb(126, 250, 250)',
                                                              'rgb(126, 250, 250)',
                                                              'rgb(126, 250, 250)',
                                                              'rgb(126, 250, 250)'])


  const selectQuestion = (selectedOption:number) => {

        console.log('click')

        selection=!selection;

        setchoice(selectedOption)

        if (selectedOption===questions[actualQuestion].correcta) 

                                 props.setPlayer({...props.player, 
                                                          aciertos : props.player.aciertos + 1}) 
        
        }


  const nextQuestion = () =>{

        selection=!selection

        if (actualQuestion < questions.length - 1){

            setactualQuestions(actualQuestion + 1)

            } else {

                  props.setPage({...props.page, page3 : false, page4 : true   })
                
                  }
          
              }

      

    const colorstatus = (opcion:number) =>{

      if (opcion===choice && choice!==questions[actualQuestion].correcta && selection) {return 'red';}

      else if (opcion===questions[actualQuestion].correcta && selection)  return 'rgb(124, 252, 0)';

      else if (opcion!==questions[actualQuestion].correcta && selection && opcion!==choice) return 'gray';

      else return 'rgb(126, 250, 250)';

    }

   

    return (

      <div id='block-page-preguntas'>

            <div id='block-la-pregunta'>{actualQuestion+1}) {questions && questions[actualQuestion].pregunta}</div>

            <div id='block-respuestas'>

                <div id='block-carita'>
                        <div className='text'>
                          {!selection && <span><i id='emoji-jump' className="fas fa-grin-tongue-squint"></i><br/> Tienes que elegir una respuesta!</span>}
                          
                          {(choice===questions[actualQuestion].correcta && selection) && <span><i className="fas fa-grin-alt"></i><br/> Correcto!</span> }
                          
                          {(choice!==questions[actualQuestion].correcta && selection) && <span><i id='emoji-girar' className="fas fa-grin-squint"></i><br/> Incorrecto!</span>}
                        </div>
                      </div>

                <div id='block-opciones'>

                    <Opciones
                        isactive={selection}
                        onClick={() => (!selection && selectQuestion(1))}
                        style={{backgroundColor:colorstatus(1)}}
                        >
                        A: {questions && questions[actualQuestion].opcion1}
                    </Opciones>

                    <Opciones
                        isactive={selection}
                        onClick={() => (!selection && selectQuestion(2))}
                        style={{backgroundColor:colorstatus(2)}}
                        >
                        B: {questions && questions[actualQuestion].opcion2}
                    </Opciones>

                    <Opciones
                        isactive={selection}
                        onClick={() => (!selection && selectQuestion(3))}
                        style={{backgroundColor:colorstatus(3)}}
                        >
                        C: {questions && questions[actualQuestion].opcion3}
                    </Opciones>

                    <Opciones
                        isactive={selection}
                        onClick={() => (!selection && selectQuestion(4))}
                        style={{backgroundColor:colorstatus(4)}}
                        >
                        D: {questions && questions[actualQuestion].opcion4}
                    </Opciones>
                </div>

                <div id='container-boton-next'>

                      <ButtonNext isactive={selection}
                                  onClick={() => (selection && nextQuestion()) }
                                  >Siguiente</ButtonNext>

                </div>

            </div>

      </div>

    )

}

export default Preguntas
