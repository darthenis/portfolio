import React from 'react'
import './about.css'
import perfil from './media/foto-perfil.jpeg'



const About = () => {

      return (

        <div id="about-container">
                              <div id='skills-main'>
                                <h1>Mis habilidades</h1>
                                <div id='skills-container'>
                                  <div id='skills-item'>
                                          HTML5
                                          <i style={{'color': 'orange'}} className="fab fa-html5"></i>
                                  </div>
                                  <div id='skills-item'>
                                          CSS3
                                          <i style={{'color': 'rgb(40, 151, 255)'}} className='fab fa-css3-alt'></i>
                                  </div>
                                  <div id='skills-item'>
                                          Javascript
                                          <i style={{'color': 'yellow'}} className="fab fa-js"></i>
                                  </div>
                                  <div id='skills-item'>
                                          React
                                          <i style={{'color': 'rgb(0, 132, 255)'}} className="fab fa-react"></i>
                                  </div>
                                  <div id='skills-item'>
                                          Angular
                                          <i style={{'color': 'rgb(230, 33, 33)'}} className="fab fa-angular"></i>
                                  </div>
                                  <div id='skills-item'>
                                          Nodejs
                                          <i style={{'color': 'rgb(34, 190, 29)'}} className="fab fa-node-js"></i>
                                  </div>
                                  <div id='skills-item'>
                                          Java
                                          <i style={{'color': 'rgb(0, 132, 255)'}} className="fab fa-java"></i>
                                  </div>
                                  
                                </div>  
                              </div>     
                              <div id='about-text'>
                                        <h1>Sobre m??</h1>
                                        <p className='about-parrafo'> 
                                          Mi nombre es Emiliano Acevedo, soy de La Plata, Buenos Aires, Argentina.
                                          Tengo 31 a??os y he entrado al mundo de la programaci??n, m??s especificamente
                                          al dise??o web, a los 29 a??os. Empec?? con un curso de m??s de 500 horas 
                                          de html, css, javascript, php y mysql. Posteriormente he indagado en nuevas
                                          tecnologias como electron, donde me encuentro embarcado en el desarrollo de
                                          mi propio juego narrativo. Luego comenc?? a investigar las tecnologias m??s
                                          usadas en el desarrollo web y entonces me top?? con React, tecnologia con
                                          la cual me llevo muy bien y con la cual llevo adelante muchos de mis proyectos.  
                                        </p>
                                          
                                        <p className='about-parrafo'> 
                                          Me gustan los dise??os con personalidad propia; que sean capaces de decir algo
                                          por s?? mismos. El responsive design se ha vuelto algo indispensable en el mundo
                                          donde vivimos dada la cantidad de dispositivos que los usuarios pueden poseer;
                                          y por lo tanto es indispensable en cada uno de mis proyectos.
                                        </p>
                                          
                                        <p className='about-parrafo'> 
                                          Amo desarrollar, me gustan los videojuegos, los juegos mesa y los juegos de rol.
                                          Amo aprender nuevas tecnologias que sean desafiantes y que, indispensablemente, 
                                          lleven a mis proyectos al siguiente nivel. 
                                        </p>
                                          
                              </div>
                                      
                                      
        </div>

            )
          }


export default About;
