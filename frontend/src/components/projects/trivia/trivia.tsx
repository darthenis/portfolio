import React, {useState} from 'react';
import './trivia.css'
import Formulario from './formulario'
import Dificultad from './dificultad'
import Preguntas from './preguntas'
import Resultado from './resultado'
import {Tablas} from './tablas'
import {ButtonTablas} from './trivia-style'


const Trivia = (): JSX.Element => {

  const [registro, setRegistro] = useState<number>(0)

  const [page, setPage] = useState({

            page1: true,
            page2: false,
            page3: false,
            page4: false,
            page5: false
  })

  const [user, setUser] = useState({
        nombre: '',
        edad: '',
        pais: '',
        dificultad: '',
        aciertos: 0,
  })

  const changepage = () =>{
        setPage({...page,
                        page1:false,
                        page5:true})
  } 


          return (

                <div id='container-trivia'>

                        <div id="trivia-title"><h1>Trivia</h1></div>

                        {page.page1 && <Formulario user={user} setUser={setUser} page={page} setPage={setPage}></Formulario>}
                        {page.page2 && <Dificultad user={user} setUser={setUser} page={page} setPage={setPage}></Dificultad>}
                        {page.page3 && <Preguntas page={page} setPage={setPage} registro={registro} setRegistro={setRegistro}></Preguntas>}
                        {page.page4 && <Resultado registro={registro} page={page} setPage={setPage}></Resultado>}
                        {page.page5 && <Tablas></Tablas> }

                        <div id='foot-pages'>
                        <ButtonTablas id='buttonback' onClick={() => (window.location.href='/')}>Inicio</ButtonTablas>
                        {page.page1 && <ButtonTablas id='buttontablas' onClick={changepage}>Tabla de posiciones</ButtonTablas>}
                        </div>

                </div>



          )




}

export default Trivia
