import React, {useState, useEffect} from 'react';
import './trivia.css'
import Formulario from './elements/formulario'
import Dificultad from './elements/dificultad'
import Preguntas from './elements/preguntas'
import Resultado from './elements/resultado'
import {Tablas} from './elements/tablas'
import {Button} from './trivia-style'
import {Player} from './trivia-interfaces-types'



const Trivia = (): JSX.Element => {

  const [page, setPage] = useState({
    page1: true,
    page2: false,
    page3: false,
    page4: false,
    page5: false,
  });

  const [player, setPlayer] = useState<Player>({

            nombre: '',
            edad: '',
            pais: '',
            dificultad: '',
            aciertos: 0
  })

  const changepage = (pageOn: string, pageOff: string) => {

      setPage({ ...page, [pageOff]: false, [pageOn]: true });
  
    }; 


          return (

                <div id='container-trivia'>

                        <div id="trivia-title"><h1>Trivia</h1></div>

                        {page.page1 && <Formulario    player={player} 
                                                      setPlayer={setPlayer} 
                                                      page={page} 
                                                      setPage={setPage}/>}

                        {page.page2 && <Dificultad    player={player} 
                                                      setPlayer={setPlayer} 
                                                      page={page} 
                                                      setPage={setPage}/>}

                        {page.page3 && <Preguntas     player={player}
                                                      setPlayer={setPlayer}
                                                      page={page} 
                                                      setPage={setPage}/>}

                        {page.page4 && <Resultado     page={page} 
                                                      setPage={setPage}
                                                      player={player}/>}
                                                     

                        {page.page5 && <Tablas/> }

                        <div id='foot-pages'>
                        <Button id='buttonback' onClick={() => (window.location.href='/')}>Inicio</Button>

                        {page.page1 && <Button id='buttontablas' onClick={() => changepage('page5', 'page1')}>Tabla de posiciones</Button>}
                        
                        {(page.page5 && player.nombre==='') && <Button id='buttontablas' onClick={() => changepage('page1','page5')}>Volver al Formulario</Button>}
                        </div>

                </div>



          )




}

export default Trivia
