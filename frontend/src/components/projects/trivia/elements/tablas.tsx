import React, {useState, useEffect} from 'react'
import './tablas.css'
import {players} from '../trivia-interfaces-types'


export const Tablas = () => {


  const sort_lists = (key:string, list:players[], inverse?:boolean) =>
 
   inverse
        ? [...list].sort((b, a) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
        : [...list].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
 
    

  let data : players[]=[

    {
      nombre: 'emiliano',
      edad: '31',
      pais: 'Argentina',
      dificultad: 'facil',
      aciertos: '5'
    },
  {
    nombre: 'Janina',
    edad: '25',
    pais: 'Paraguay',
    dificultad: 'dificil',
    aciertos: '10'
  },
  {
    nombre: 'Maria',
    edad: '59',
    pais: 'Peru',
    dificultad: 'normal',
    aciertos: '2'
  }
]


const [list, setList] = useState<players[]>(data)


useEffect(() =>{

  setList(sort_lists('aciertos', list))

}, [])

const ordertable = (column : string) => {

  let newsortlist = sort_lists(column, list)

  if (newsortlist[0]===list[0]) newsortlist = sort_lists(column, list, true)

  setList(newsortlist)

}


  return (

              <div>

                <table cellSpacing='0'>
                    <thead>
                        <tr>
                          <th onClick={()=> ordertable('nombre')}>Nombre</th>
                          <th onClick={()=> ordertable('edad')}>Edad</th>
                          <th onClick={()=> ordertable('pais')}>Pais</th>
                          <th onClick={()=> ordertable('dificultad')}>Dificultad</th>
                          <th onClick={()=> ordertable('aciertos')}>Aciertos</th>
                        </tr>
                    </thead>
                    <tbody>

                        <>
                        {list.map((player) =>{

                                  return <tr>
                                            <td>{player.nombre}</td>
                                            <td>{player.edad}</td>
                                            <td>{player.pais}</td>
                                            <td>{player.dificultad}</td>
                                            <td>{player.aciertos}</td>
                                        </tr>
                                  })} </>

                    </tbody>



                </table>


            
              </div>


  )
}
