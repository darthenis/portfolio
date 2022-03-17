import React from 'react';

import disenio from './media/disenio.png';

import perfil from './media/foto-perfil.jpeg'

import developer from './media/developer.png'





const Main = () => {

        return(

          <div className="container2" id="container2">
            
                          <img className="img1" src={perfil} alt=""/>

                          <div className="texto" id="texto"><p>Hola, <br/> mi nombre es <span>Emiliano</span> <br/>
                                                              y soy <span>desarrollador web</span></p>
                          </div>


                 
          </div>
        )


}

export default Main;
