import React, {Dispatch, SetStateAction, useEffect} from 'react'
import {Button} from '../trivia-style'
import {Pages, Player} from '../trivia-interfaces-types'
import './resultado.css'
import {addPlayer} from '../triviaservice'


const Resultado = (props:{page : Pages, setPage : Dispatch<SetStateAction<Pages>>, player : Player}) => {


//upload player data to database at end game


useEffect(()=>{

  addPlayer(props.player) 

}, [])


          
  const changepage = () =>{

    props.setPage({...props.page,
                            page4 : false,
                            page5 : true,})

  }


      return(
           
           <div id='resultado'>

                Respuestas acertadas: {props.player.aciertos}

               { (props.player.aciertos>6 && props.player.aciertos!==10) && <div><i className="fas fa-grin-stars"></i><br/>Te ha ido fantastico!!!</div> }
               { props.player.aciertos===10 && <div><i className="fas fa-smile-beam"></i><br/>Te ha ido muy bien!</div> }
               { (props.player.aciertos<6 && props.player.aciertos!==1 && props.player.aciertos!==0) && <div><i className="fas fa-laugh-wink"></i><br/>Te ha ido regular, pero bien!</div> }
               { props.player.aciertos===1 && <div><i className="fas fa-meh-rolling-eyes"></i><br/>Por una que casi te estampas!</div> }
               { props.player.aciertos===0 && <div><i className="fas fa-sad-cry"></i><br/>Bueno, lo importante es tener salud (?)</div> }


               <Button id='buttonTablas-resultado' onClick={changepage}>Ir a la tabla!</Button>

            </div>
          )

}


export default Resultado
