import React from 'react'
import './about.css'
import perfil from './media/foto-perfil.jpeg'



const About = () => {

      return (

        <div id="about-container">  <div id='about-text'> <img src={perfil} alt="mi foto"/><p className='about-parrafo'> 
                                          Mi nombre es Emiliano Acevedo, soy de La Plata, Buenos Aires, Argentina.
                                          Tengo 31 años y he entrado al mundo de la programación, más especificamente
                                          al diseño web, a los 29 años. Empecé con un curso de más de 500 horas 
                                          de html, css, javascript, php y mysql. Posteriormente he indagado en nuevas
                                          tecnologias como electron, donde me encuentro embarcado en el desarrollo de
                                          mi propio juego narrativo. Luego comencé a investigar las tecnologias más
                                          usadas en el desarrollo web y entonces me topé con React, tecnologia con
                                          la cual me llevo muy bien y con la cual llevo adelante muchos de mis proyectos.</p>
                                          
                                          <p className='about-parrafo'> 
                                          Me gustan los diseños con personalidad propia; que sean capaces de decir algo
                                          por sí mismos. El responsive design se ha vuelto algo indispensable en el mundo
                                          donde vivimos dada la cantidad de dispositivos que los usuarios pueden poseer;
                                          y por lo tanto es indispensable en cada uno de mis proyectos.</p>
                                          
                                          <p className='about-parrafo'> 
                                          Amo desarrollar, me gustan los videojuegos, los juegos mesa y los juegos de rol.
                                          Amo aprender nuevas tecnologias que sean desafiantes y que, indispensablemente, 
                                          lleven a mis proyectos al siguiente nivel. </p>
                                          
                                        </div>
                                      
                                      
                                </div>

            )
          }


export default About;
