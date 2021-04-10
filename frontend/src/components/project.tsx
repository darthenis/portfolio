import React from 'react';
import './project.css';
import motosproject from './media/motosproject.png';


const Project = () =>{

function changeurl(url: string){

  window.location.href=url;
}


    return (

      <div id='projects'>
            <div id='title'>

              <h1>Proyectos</h1>
              
              
              Estos son mis mini proyectos orientados a mostrar mis habilidades. Ambos son sacados del
              canal de youtube <a href='https://www.youtube.com/watch?v=aouDQ8caJYg&t'>"Hola Mundo"</a>. HOLASDASDASD 
              
              <hr/>
              
              </div>

        <div id='container-projects'>
            <div className='projects' onClick={() => changeurl('/motos')}>
              
                                <h3>Servicio de motos</h3>

                                  <div className='img-projects'><img src={motosproject}></img></div>
                                
                                  En esta app se dispone de franjas horarias de media hora entre las 8 am
                                  y las 20 pm. En cada franja horaria se tendrá a disposicion del usuario la posibilidad de 
                                  reservar 1 de las 8 motos disponibles, haciendo click en una franja se hará la reserva de 1 moto y la franja
                                  se nos pondra en verde, si volvemos a hacer click la reserva se cancelará. La app está conectada a una base de datos 
                                  y funaciona a tiempo real, es decir, si varios usuarios se encuentran conectados a la app y uno de estos usuario
                                  hace una reserva todos verán automaticamente como se reduce la disponibilidad de motos. La app cuenta con un sistema
                                  en su servidor para el reseteo de los contadores de motos disponibles una vez alcanzado el final de cada una de las franjas.

            </div>



            <div className='projects' onClick={() => changeurl('/trivia')}> 
            
                                  <h3>Servicio de motos</h3>
                                  
                                  En esta app se dispone de franjas horarias de media hora entre las 8 am
                                  y las 20 pm. En cada franja horaria se tendrá a disposicion del usuario la posibilidad de 
                                  reservar 1 de las 8 motos disponibles, haciendo click en una franja se hará la reserva de 1 moto y la franja
                                  se nos pondra en verde, si volvemos a hacer click la reserva se cancelará. La app está conectada a una base de datos 
                                  y funaciona a tiempo real, es decir, si varios usuarios se encuentran conectados a la app y uno de estos usuario
                                  hace una reserva todos verán automaticamente como se reduce la disponibilidad de motos. La app cuenta con un sistema
                                  en su servidor para el reseteo de los contadores de motos disponibles una vez alcanzado el final de cada una de las franjas.
            </div>
        </div>
            
      </div>

    )

}



export default Project;
