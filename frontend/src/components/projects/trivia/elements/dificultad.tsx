import React, {Dispatch, SetStateAction} from 'react'
import {Player, Pages} from '../trivia-interfaces-types'




  const Dificultad = (props: {player : Player, setPlayer : Dispatch<SetStateAction<Player>>, 
                                page : Pages, setPage : Dispatch<SetStateAction<Pages>>}) => {


  const handleSelectChange = (event: {target: {value:string}}) => {


          props.setPlayer({...props.player, dificultad : event.target.value});
          console.log(event.target.value);

            }

  const enviar = (e: React.FormEvent) => {

        e.preventDefault();
            if(props.player.dificultad !== '') props.setPage({...props.page,
                                              page2 : false,
                                              page3 : true,
                                            })
        else alert('elija una opcion!')
                                          } 


    return (

    <div id="trivia-block">

        <div id="trivia-talk">

              {props.player.dificultad==='' && <i className="fas fa-laugh"></i>}
              {props.player.dificultad==='facil' && <i className="fas fa-grin-squint"></i>}
              {props.player.dificultad==='medio' && <i className="fas fa-grin-beam"></i>}
              {props.player.dificultad==='dificil' && <i className="fas fa-flushed"></i>}
              {props.player.dificultad==='' && <div>
                Listo!!<br/><br/>
                Tus datos fueron almacenados!
                ahora solo tenés que elegir
                el nivel de dificultad con el que
                vas a jugar!!
              </div>}
              {props.player.dificultad==='facil' && <div>
                0 a la izquierda:<br/><br/>
                se te haran preguntas generales
                que se supone debes saberlas
                sino sos peor que un 0 a la izquierda
              </div>}
              {props.player.dificultad==='medio' && <div>
                Saber un poco de todo:<br/><br/>
                se te haran preguntas más especificas
                que se supone debes saberlas
                sino vivis en una burbuja
              </div>}
              {props.player.dificultad==='dificil' && <div>
                NEEEEEEEERD!:<br/><br/>
                se te haran preguntas MUY especificas
                que si las sabes vas a ROMPER EL JUEGO
              </div>}

        </div>

        <form onSubmit={enviar}>
              <select value={props.player.dificultad} onChange={handleSelectChange} placeholder='Eliga la dificultad'>
                        <option hidden value=''>Elige tu dificultad</option>
                        <option value='facil'>0 a la izquierda</option>
                        <option value='medio'>Saber un poco de todo</option>
                        <option value='dificil'>Sabelotodo, Comelibros, Nerd, etc</option>
              </select>
              <input id='btn' type="submit" value="Empezar"/>
        </form>

    </div>


    )




}


export default Dificultad
