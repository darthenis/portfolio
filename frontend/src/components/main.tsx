import React from 'react';

import disenio from './media/disenio.png';

import responsive from './media/responsive.jpg'

import developer from './media/developer.png'





const Main = () => {

        return(

          <div className="container2" id="container2">
                          <div className="texto1" id="texto1">Bienvenidos a mi pagina <br/> donde podran encontrar
                                                              una manera <br/> de hacer realidad todo aquello <br/>
                                                              que ustedes quieren para sus páginas webs
                          </div>

                          <img className="img1" src={responsive} alt=""/>

                          <div className="texto2">Siempre teniendo encuenta un diseño responsive <br/> para que
                                                  tu web sea accesible <br/> desde cualquier dispositivo mantieniendo
                                                  <br/> la calidad del diseño
                          </div>

                          <img className="img2" src={disenio} alt=""/>

                          <div className="texto3">Pero sin olvidar la importancia <br/> de un buen diseño que realmente <br/>
                                                  le de personalidad propia a tu web
                          </div>

                          
                          <img className="img3" src={developer} alt=""/>
                 
          </div>
        )


}

export default Main;
