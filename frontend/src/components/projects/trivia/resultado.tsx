import React, {Dispatch, SetStateAction} from 'react'
import {Button} from './trivia-style'
import {Pages} from './interfandtypes'
import './resultado.css'


const Resultado = (props:{registro:number, page : Pages, setPage : Dispatch<SetStateAction<Pages>>}) => {

          
  const changepage = () =>{

    props.setPage({...props.page,
                            page4 : false,
                            page5 : true,})

  }
  
  
      return(
           
           <div id='resultado'>

                Respuestas acertadas: {props.registro}

               { (props.registro>6 && props.registro!==10) && <div><i className="fas fa-grin-stars"></i><br/>Te ha ido fantastico!!!</div> }
               { props.registro===10 && <div><i className="fas fa-smile-beam"></i><br/>Te ha ido muy bien!</div> }
               { (props.registro<6 && props.registro!==1 && props.registro!==0) && <div><i className="fas fa-laugh-wink"></i><br/>Te ha ido regular, pero bien!</div> }
               { props.registro===1 && <div><i className="fas fa-meh-rolling-eyes"></i><br/>Por una que casi te estampas!</div> }
               { props.registro===0 && <div><i className="fas fa-sad-cry"></i><br/>Bueno, lo importante es tener salud (?)</div> }


               <Button id='buttonTablas-resultado' onClick={changepage}>Ir a la tabla!</Button>

            </div>
          )

}


export default Resultado
