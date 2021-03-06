import React, {useState} from 'react';
import Main from './main'
import Project from './project'
import About from './about'
import Rrss from './rrss'
import {Nav, ButtonNav} from './index-styled'
import './index.css';
import Iconreact from './media/icon-react.png'

  




  const Inicio = () => {

      const [comp, setComp] = useState<string>('main');

      const [compActive, setCompActive] = useState({

            project : false,
            about : false,
            rrss : false
      })

      const [active, setActive] = useState({
                call : false,
                push : false
      })


      const activeMenu = () =>{

  //function for responsive menu ('nav'). 

                if (!active.call) setActive({...active, call : true, push : false})

                else setActive({...active, call : false, push : true})

      }


      const selectMenu= (comp:string) =>{
 
                setComp(comp);

                comp==='main' && setCompActive({...compActive, project : false, about : false, rrss : false})
                comp==='project' && setCompActive({...compActive, project : true, about : false, rrss : false})
                comp==='about' && setCompActive({...compActive, project : false, about : true, rrss : false})
                comp==='rrss' && setCompActive({...compActive, project : false, about : false, rrss : true})
                
                active.call && setActive({...active, call : false, push : true})

                //will not active still we call responsive menu


      }

        return (

            <>
                <div id="containermain">

                        
                                <header id="title">

                                        <div id="logo" onClick= {()=> selectMenu('main')}>Emiliano Acevedo</div>

                                        <div id='iconResponsive'><i className="fas fa-bars" onClick={activeMenu}/></div>

                                </header>

                                <Nav 
                                        active={active.call}
                                        disactive={active.push}
                                        id="menu">
                                        
                                        <ButtonNav active={compActive.project} className="button" onClick= {()=> selectMenu('project')}>PROYECTOS</ButtonNav>
                                        <ButtonNav active={compActive.about} className="button" onClick= {()=> selectMenu('about')}>SOBRE MI</ButtonNav>
                                        <ButtonNav active={compActive.rrss} className="button" onClick= {()=> selectMenu('rrss')}>CONTACTO</ButtonNav>

                                </Nav> 
                                    
                                    {comp==='main' && <Main/>}
                                    {comp==='project' && <Project/>}
                                    {comp==='about' && <About/>}
                                    {comp==='rrss' && <Rrss/>}

                                  
                                <footer>

                                        <p>Emiliano A. Acevedo &copy; {new Date().getFullYear()} Powered by React</p>
                                        <div id='redes'>
                                                <i className="fab fa-instagram"></i>
                                                <i className="fab fa-twitter-square"></i>
                                                <i className="fab fa-facebook-square"></i>
                                                <i className="fab fa-github-square"></i>
                                        </div>
                                        
                                </footer>


                        </div>

            </>
        )
    }


export default Inicio;
