import React from 'react';


const Project = () =>{

function changeurl(url: string){

  window.location.href=url;
}


    return (

      <div id='projects'>
            <div id='motos' onClick={() => changeurl('/motos')}>Projecto 1</div>
            <div id='motos' onClick={() => changeurl('/trivia')}>Projecto 2</div>
            <div>Projecto 3</div>
      </div>

    )

}



export default Project;
