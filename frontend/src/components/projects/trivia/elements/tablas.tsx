import React, {useState, useEffect} from 'react'
import './tablas.css'
import {players} from '../trivia-interfaces-types'
import {getPlayers} from '../triviaservice'


let contador=0;

export const Tablas = () => {


  const sort_lists = (key:string, list:players[], inverse?:boolean) =>
 
   inverse
        ? [...list].sort((b, a) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
        : [...list].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))


const [list, setList] = useState<players[]>([])


 const loadPlayers = async () =>{

  const res = await getPlayers()

  console.log(res)

  setList(res.data)
 }


 useEffect(() =>{

   setList(sort_lists('aciertos', list))

 }, [])


 useEffect(()=>{

   loadPlayers()

 }, [])

console.log(list)

const ordertable = (column : string) => {

  console.log('haz hecho click en ', column)

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

                                  contador++

                                  return <tr id={'key'+contador}>
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
