import React, {useState} from 'react';

import Main from './main'
import Project from './project'
import About from './about'
import Rrss from './rrss'
import {Nav, ButtonNav} from './index-styled'

import './index.css';
import { message } from './interfaces-types';

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

      const [messageUser, setMessageUser] = useState<message>({

        from: '',
        name: '',
        message: '',
  
    })
  
    const [inputState, setInputState] = useState({
  
      name : true,
      from : true, 
      message : true,
      incomplete: false
  
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

                                        <div id="logo" onClick= {()=> selectMenu('main')}>Emiliano<br/>A. Acevedo</div>

                                        <i className="fas fa-bars" onClick={activeMenu}></i>

                                </header>

                                <Nav 
                                        active={active.call}
                                        disactive={active.push}
                                        id="menu">
                                        
                                        <ButtonNav active={compActive.project} className="button" onClick= {()=> selectMenu('project')}>Proyectos</ButtonNav>
                                        <ButtonNav active={compActive.about} className="button" onClick= {()=> selectMenu('about')}>Sobre Mi</ButtonNav>
                                        <ButtonNav active={compActive.rrss} className="button" onClick= {()=> selectMenu('rrss')}>Contacto</ButtonNav>

                                </Nav> 
                                    
                                    {comp==='main' && <Main/>}
                                    {comp==='project' && <Project/>}
                                    {comp==='about' && <About/>}
                                    {comp==='rrss' && <Rrss   messageUser={messageUser} 
                                                            setMessageUser={setMessageUser}
                                                            inputState={inputState}
                                                            setInputState={setInputState}/>}

                                  
                                <footer>Diseñado y programado por: <br/> Emiliano A. Acevedo</footer>


                        </div>

            </>
        )
    }


export default Inicio;
