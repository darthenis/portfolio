import React, {useState} from 'react';
import './trivia.css'
import Formulario from './formulario'
import Dificultad from './dificultad'
import Preguntaspage from './preguntas'


const Trivia = (): JSX.Element => {


  const [page, setPage] = useState({

            page1: true,
            page2: false,
            page3: false,
            page4: false,
  })

  const [user, setUser] = useState({
        nombre: '',
        edad: '',
        pais: '',
        dificultad: '',
        aciertos: {}
  })


          return (

                <div id='container-trivia'>

                  <div id="trivia-title"><h1>Trivia</h1></div>

                        {page.page1 && <Formulario user={user} setUser={setUser} page={page} setPage={setPage}></Formulario>}
                        {page.page2 && <Dificultad user={user} setUser={setUser} page={page} setPage={setPage}></Dificultad>}
                        {page.page3 && <Preguntaspage page={page}></Preguntaspage>}


                </div>



          )




}

export default Trivia
