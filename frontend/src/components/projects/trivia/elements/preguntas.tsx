import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import {Player, questions, optionstatus} from '../trivia-interfaces-types'
import {questionsEasy} from './list-questions'
import {ButtonNext, Opciones} from '../trivia-style'
import './preguntas.css'
import {Pages} from '../trivia-interfaces-types'


let selection=false; //verifica si el jugador ha hecho su elección

let correct=false;

const Preguntas = (props: {page: Pages, setPage : Dispatch<SetStateAction<Pages>>, 
                      
                        player : Player, setPlayer : Dispatch<SetStateAction<Player>>}) => {

  
  
  const [questions, setquestions] = useState<questions[]>(questionsEasy)

  const [actualQuestion, setactualQuestions] = useState(0)

  const [optionStatus, setOptionStatus] = useState<optionstatus>({  option1 : 'rgb(126, 250, 250)',
                                                                    option2 : 'rgb(126, 250, 250)',
                                                                    option3 : 'rgb(126, 250, 250)',
                                                                    option4 : 'rgb(126, 250, 250)'})    

  const selectOption = (selectedOption:number) => {

        selection=!selection;

        colorstatus(selectedOption)

        if (selectedOption===questions[actualQuestion].correcta){ 

                                 correct=true;

                                 props.setPlayer({...props.player, 
                                                          aciertos : props.player.aciertos + 1}) 
            
            } else correct=false
        
        }


  const nextQuestion = () =>{

        selection=!selection

        colorstatus('reset')

        if (actualQuestion < questions.length - 1){

            setactualQuestions(actualQuestion + 1)

            } else {

                  props.setPage({...props.page, page3 : false, page4 : true   })
                
                  }
          
              }

      

    const colorstatus = (optionSelected:number | string) =>{

            
            if (optionSelected==='reset') setOptionStatus({...optionStatus,
                                                                    option1 : 'rgb(126, 250, 250)',
                                                                    option2 : 'rgb(126, 250, 250)',
                                                                    option3 : 'rgb(126, 250, 250)',
                                                                    option4 : 'rgb(126, 250, 250)'})
            else {
            
                    let array : string []=[]

                    for(let i=1; i<=4; i++) { 
            
                            if (i===optionSelected && optionSelected!==questions[actualQuestion].correcta) array.push('red')

                            else if (i===questions[actualQuestion].correcta) array.push('rgb(124, 252, 0)')

                            else array.push('rgb(126, 250, 250)')

                         }

                    setOptionStatus({...optionStatus,
                                                        option1 : array[0],
                                                        option2 : array[1],
                                                        option3 : array[2],
                                                        option4 : array[3]
                                    
                                                     }
                                                ) 
                                            }

    }

   

    return (

      <div id='block-page-preguntas'>

            <div id='block-la-pregunta'>{actualQuestion+1}) {questions && questions[actualQuestion].pregunta}</div>

            <div id='block-respuestas'>

                <div id='block-carita'>
                        <div className='text'>
                          {!selection && <span><i id='emoji-jump' className="fas fa-grin-tongue-squint"></i><br/> Tienes que elegir una respuesta!</span>}
                          
                          {(correct && selection) && <span><i className="fas fa-grin-alt"></i><br/> Correcto!</span> }
                          
                          {(!correct && selection) && <span><i id='emoji-girar' className="fas fa-grin-squint"></i><br/> Incorrecto!</span>}
                        </div>
                      </div>

                <div id='block-opciones'>

                    <Opciones
                        isactive={selection}
                        onClick={() => (!selection && selectOption(1))}
                        style={{backgroundColor:optionStatus.option1}}
                        >
                        A: {questions && questions[actualQuestion].opcion1}
                    </Opciones>

                    <Opciones
                        isactive={selection}
                        onClick={() => (!selection && selectOption(2))}
                        style={{backgroundColor:optionStatus.option2}}
                        >
                        B: {questions && questions[actualQuestion].opcion2}
                    </Opciones>

                    <Opciones
                        isactive={selection}
                        onClick={() => (!selection && selectOption(3))}
                        style={{backgroundColor:optionStatus.option3}}
                        >
                        C: {questions && questions[actualQuestion].opcion3}
                    </Opciones>

                    <Opciones
                        isactive={selection}
                        onClick={() => (!selection && selectOption(4))}
                        style={{backgroundColor:optionStatus.option4}}
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
