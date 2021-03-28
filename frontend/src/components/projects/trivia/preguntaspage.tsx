import React, {useState} from 'react'
import Preguntas from './preguntas'
import Resultado from './resultado'
import './preguntaspage.css'

const Preguntaspage = (page:any) =>{ //hacer el props para cambiar el estado en trivia.tsx

  const [finish, setFinish] = useState<boolean>(false)

  const [registro, setRegistro] = useState<string>('hola')

  const pagereturn = () => {return page}


          return (
                    <div>
                      {!finish && <Preguntas  donestate={finish}
                                              setDone={setFinish}
                                              registros={'hola'}
                                              setRegistros={setRegistro}></Preguntas>}

                      {finish && <Resultado numero={registro} ></Resultado>} //hacer elemento Resultado
                      </div>
          )



}


export default Preguntaspage
