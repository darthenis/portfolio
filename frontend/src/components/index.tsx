import React from 'react';

import Main from './main'
import Project from './project'
import About from './about'
import Rrss from './rrss'

import './index.css';

    const Inicio = () => {

      const [comp, changecomp] = React.useState(Main);

        return (

            <div>
                <div className="containermain">

                        <div className="container">
                                <header className="title" id="title">

                                        <div className="logo" onClick= {()=> changecomp(Main)}>Emi Diseño <br/>Web</div>

                                </header>

                                <nav className="menu">

                                        <div className="bottom1" onClick= {()=> changecomp(Project)}>Proyectos</div>
                                        <div className="bottom2" onClick= {()=> changecomp(About)}>Sobre Mi</div>
                                        <div className="bottom3" onClick= {()=> changecomp(Rrss)}>Contacto</div>

                                </nav>
                        </div>

                        {comp}


                        </div>


                <footer>Diseñado y programado por: <br/> Emiliano A. Acevedo</footer>

            </div>
        )
    }


export default Inicio;
