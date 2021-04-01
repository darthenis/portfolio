import React, {useState} from 'react';
import './trivia.css'
import Formulario from './elements/formulario'
import Dificultad from './elements/dificultad'
import Preguntas from './elements/preguntas'
import Resultado from './elements/resultado'
import {Tablas} from './elements/tablas'
import {Button} from './trivia-style'
import {Player} from './trivia-interfaces-types'


const Trivia = (): JSX.Element => {

  const [registro, setRegistro] = useState<number>(0)

  const [page, setPage] = useState({

            page1: true,
            page2: false,
            page3: false,
            page4: false,
            page5: false
  })

  const [player, setPlayer] = useState<Player>({

            nombre: '',
            edad: '',
            pais: '',
            dificultad: '',
            aciertos: ''
  })

  const changepage = (pageOn : string, pageOff:string) =>{
        setPage({...page,
                        [pageOff] :false,
                        [pageOn]  :true   
                        
                  })

      } 


          return (

                <div id='container-trivia'>

                        <div id="trivia-title"><h1>Trivia</h1></div>

                        {page.page1 && <Formulario player={player} setPlayer={setPlayer} page={page} setPage={setPage}></Formulario>}
                        {page.page2 && <Dificultad player={player} setPlayer={setPlayer} page={page} setPage={setPage}></Dificultad>}
                        {page.page3 && <Preguntas page={page} setPage={setPage} registro={registro} setRegistro={setRegistro}></Preguntas>}
                        {page.page4 && <Resultado registro={registro} page={page} setPage={setPage}></Resultado>}
                        {page.page5 && <Tablas></Tablas> }

                        <div id='foot-pages'>
                        <Button id='buttonback' onClick={() => (window.location.href='/')}>Inicio</Button>
                        {page.page1 && <Button id='buttontablas' onClick={() => changepage('page5', 'page1')}>Tabla de posiciones</Button>}
                        {page.page5 && <Button id='buttontablas' onClick={() => changepage('page1','page5')}>Volver al Formulario</Button>}
                        </div>

                </div>



          )




}

export default Trivia
