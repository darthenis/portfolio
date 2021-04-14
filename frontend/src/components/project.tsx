import React from 'react';
import './project.css';
import motosproject from './media/motosproject.png';
import trivia from './media/trivia.png'


const Project = () =>{

function changeurl(url: string){

  window.location.href=url;
}


    return (

      <div id='main-container-projects'>
           
            <div id='header-projects'>
              
              Estos son algunos de mis proyectos, alguno son orientados a mostrar mis habilidades<br/> los cuales son sacados del
              canal de youtube <a href='https://www.youtube.com/watch?v=aouDQ8caJYg&t'>"Hola Mundo"</a>, y otros son 
              proyectos personales.
              
              
              
              </div>

  
            <div className='projects' onClick={() => changeurl('/motos')}>
                              
                                <div className='title-projects'>
                                    <h3>Servicio de motos</h3>
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
                                    <h3>Trivia</h3>
                                </div>

                                  <div className='img-projects'><img src={trivia}></img></div>
                                  
                                          Este es una app trivia. Donde se tomará los datos del jugador, y luego podra escoger
                                          entre las tres dificultades disponibles. La trivia contiene 10 preguntas aleatorias
                                          que son extraidas de una base de datos. Al terminar con la trivia se le mostrará una tabla
                                          donde se mostrará los datos de los jugadores.

                                  
            </div>
            
      </div>

    )

}



export default Project;
