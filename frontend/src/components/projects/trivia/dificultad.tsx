import React from 'react'




  const Dificultad = ({user, setUser, page, setPage}:any) => {


  const handleSelectChange = (event: {target: {value:string | null}}) => {


          setUser({...user, dificultad : event.target.value});
          console.log(event.target.value);

            }

  const enviar = (e: React.FormEvent) => {

        e.preventDefault();
        if(user.dificultad !== '') setPage({...page,
                                              page2 : false,
                                              page3 : true,
                                            })
        else alert('elija una opcion!')
                                          } 


    return (

    <div id="trivia-block">

        <div id="trivia-talk">

              {user.dificultad==='' && <i className="fas fa-laugh"></i>}
              {user.dificultad==='facil' && <i className="fas fa-grin-squint"></i>}
              {user.dificultad==='medio' && <i className="fas fa-grin-beam"></i>}
              {user.dificultad==='dificil' && <i className="fas fa-flushed"></i>}
              {user.dificultad==='' && <div>
                Listo!!<br/><br/>
                Tus datos fueron almacenados!
                ahora solo tenés que elegir
                el nivel de dificultad con el que
                vas a jugar!!
              </div>}
              {user.dificultad==='facil' && <div>
                0 a la izquierda:<br/><br/>
                se te haran preguntas generales
                que se supone debes saberlas
                sino sos peor que un 0 a la izquierda
              </div>}
              {user.dificultad==='medio' && <div>
                Saber un poco de todo:<br/><br/>
                se te haran preguntas más especificas
                que se supone debes saberlas
                sino vivis en una burbuja
              </div>}
              {user.dificultad==='dificil' && <div>
                NEEEEEEEERD!:<br/><br/>
                se te haran preguntas MUY especificas
                que si las sabes vas a ROMPER EL JUEGO
              </div>}

        </div>

        <form onSubmit={enviar}>
              <select value={user.dificultad} onChange={handleSelectChange} placeholder='Eliga la dificultad'>
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
