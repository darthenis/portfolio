import React, {useState} from 'react';

import Main from './main'
import Project from './project'
import About from './about'
import Rrss from './rrss'
import {Nav} from './index-styled'

import './index.css';

    const Inicio = () => {

      const [comp, setComp] = React.useState(Main);

      const [active, setActive] = useState({
                call : false,
                push : false
      })



      const activeMenu= () =>{

  //function for responsive menu ('nav'). 

                if (!active.call) setActive({...active, call : true, push : false})

                else setActive({...active, call : false, push : true})

      }


      const selectMenu= (elem: React.SetStateAction<JSX.Element>) =>{
 
                setComp(elem); 
                
                active.call && setActive({...active, call : false, push : true})

                //will not active still we call responsive menu


      }

        return (

            <div>
                <div className="containermain">

                        <div className="container">
                                <header className="title" id="title">

                                        <div className="logo" onClick= {()=> selectMenu(Main)}>Emi Diseño <br/>Web</div>

                                        <i className="fas fa-bars" onClick={activeMenu}></i>

                                </header>

                                <Nav 
                                        active={active.call}
                                        disactive={active.push}
                                        className="menu">
                                        
                                        <button className="button" onClick= {()=> selectMenu(Project)}>Proyectos</button>
                                        <button className="button" onClick= {()=> selectMenu(About)}>Sobre Mi</button>
                                        <button className="button" onClick= {()=> selectMenu(Rrss)}>Contacto</button>

                                </Nav>

                                
                        </div>        

                        {comp}


                        <footer>Diseñado y programado por: <br/> Emiliano A. Acevedo</footer>


                        </div>


                       


                

            </div>
        )
    }


export default Inicio;
