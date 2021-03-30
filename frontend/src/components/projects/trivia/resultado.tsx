import React from 'react'


const Resultado = (props:{registro:number}) => {

          return(
            <div id='resultado'>

                Respuestas acertadas: {props.registro}

            </div>
          )

}


export default Resultado
