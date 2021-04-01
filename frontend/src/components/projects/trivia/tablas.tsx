import React, {useState} from 'react'
import './tablas.css'
import {players} from './interfandtypes'


export const Tablas = () => {

  const [orden, setOrden] = useState('nombre')


  let data : players[]=[

    {
      nombre: 'emiliano',
      edad: 31,
      pais: 'Argentina',
      dificultad: 'facil',
      aciertos: 5
    },
  {
    nombre: 'Janina',
    edad: 25,
    pais: 'Paraguay',
    dificultad: 'dificil',
    aciertos: 10
  },
  {
    nombre: 'Maria',
    edad: 59,
    pais: 'Peru',
    dificultad: 'normal',
    aciertos: 2
  }
]

const createtable = (orden:string) =>{

  data.map((data) =>{

    return <tr>
              <td>{data.nombre}</td>
              <td>{data.edad}</td>
              <td>{data.pais}</td>
              <td>{data.dificultad}</td>
              <td>{data.aciertos}</td>
           </tr>
})

}


  return (

              <div>

                <table>
                    <tbody>
                        <tr>
                          <th>Nombre</th>
                          <th>Edad</th>
                          <th>Pais</th>
                          <th>Dificultad</th>
                          <th>Aciertos</th>
                        </tr>

                        {createtable(orden)} 

                    </tbody>



                </table>


            
              </div>


  )
}
