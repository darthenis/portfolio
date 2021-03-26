import React from 'react';

import disenio from './media/disenio.png';

import responsive from './media/responsive.jpg'





const Main = () => {

        return(

          <div className="container2" id="container2">
                  <div className="contenedor3">
                          <div className="texto1" id="texto1">Bienvenidos a mi pagina <br/> donde podran encontrar
                                                              una manera <br/> de hacer realidad todo aquello <br/>
                                                              que ustedes quieren para sus páginas webs
                          </div>
                          <div className="texto2">Siempre teniendo encuenta un diseño responsive <br/> para que
                                                  tu web sea accesible <br/> desde cualquier dispositivo mantieniendo
                                                  <br/> la calidad del diseño
                          </div>

                          <div className="texto3">Pero sin olvidar la importancia <br/> de un buen diseño que realmente <br/>
                                                  le de personalidad propia a tu web
                          </div>

                  </div>

                  <div className="contenedor4">
                          <img className="img1" src={responsive} alt=""/>

                          <img className="img2" src={disenio} alt=""/>
                  </div>
          </div>
        )


}

export default Main;
