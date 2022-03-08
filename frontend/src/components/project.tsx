import React from 'react';
import './project.css';
import motosproject from './media/motosproject.png';
import trivia from './media/trivia.png'
import chatroom from './media/chat-room.png'


const Project = () =>{

function changeurl(url: string){

  window.location.href=url;
}


    return (

      <div id='main-container-projects'>
      
            <div className='projects' onClick={() => changeurl('/motos')}>
                              
                                <div className='title-projects'>
                                    <div>Servicio de motos</div>
                                </div>

                                <div className='img-projects'><img src={motosproject}></img></div>
                                        
                                <div className='info-projects'>
                                
                                En esta app se dispone de franjas horarias de media hora desde la 8hs hasta las 20hs,
                                en cada una de estas franjas se dispone 8 motos, y cada usuario podra hacer reserva
                                de 1 moto por franja. El app funciona a tiempo real y resetea la disponibilidad de motos
                                una vez finalizada cada franja horaria.

                                </div>
            </div>



            <div className='projects' onClick={() => changeurl('/trivia')}> 
            
                                <div className='title-projects'>
                                    <div>Trivia</div>
                                </div>

                                  <div className='img-projects'><img src={trivia}></img></div>

                                  <div className='info-projects'>
                                  
                                          Este es una app trivia. Donde se tomará los datos del jugador, y luego podra escoger
                                          entre las tres dificultades disponibles. La trivia contiene 10 preguntas aleatorias
                                          que son extraidas de una base de datos. Al terminar con la trivia se le mostrará una tabla
                                          donde se mostrará los datos de los jugadores.

                                  </div>
            </div>


            <div className='projects' onClick={() => changeurl('/chatroom')}> 
            
            <div className='title-projects'>
                <div>Chatroom</div>
            </div>

              <div className='img-projects'><img src={chatroom}></img></div>

              <div className='info-projects'>
              
                      Chat room funcional. Se entra con un nick y se tiene acceso a un chat Principal
                      y se puede enviar mensajes privados con los demás usuarios.

              </div>
</div>
            
      </div>

    )

}



export default Project;
