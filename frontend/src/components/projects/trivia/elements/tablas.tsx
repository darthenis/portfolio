import React, {useState, useEffect} from 'react'
import './tablas.css'
import {players} from '../trivia-interfaces-types'
import {getPlayers} from '../triviaservice'
import { ButtonNext } from '../trivia-style';


let contador=0;

export const Tablas = () => {


  const sort_lists = (key:string, list:players[], inverse?:boolean) =>
 
   inverse
        ? [...list].sort((b, a) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
        : [...list].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))


const [list, setList] = useState<players[]>([])

const [pageTable, setPageTable] = useState({

            firstnum  : 0,
            secondnum : 19,
})

const upTablePage = () => {

    list.length>pageTable.secondnum && setPageTable({...pageTable, firstnum : +20, secondnum : +20})    

}

const downTablePage = () => {

  pageTable.firstnum!==0 && setPageTable({...pageTable, firstnum : -20, secondnum : -20})

}


 const loadPlayers = async () =>{

  const res = await getPlayers()

  setList(res.data)
 }


 useEffect(() =>{

   setList(sort_lists('aciertos', list))

 }, [])


 useEffect(()=>{

   loadPlayers()

 }, [])


const ordertable = (column : string) => {

  console.log('haz hecho click en ', column)

  let newsortlist = sort_lists(column, list)

  if (newsortlist[0]===list[0]) newsortlist = sort_lists(column, list, true)

  setList(newsortlist)

}



  return (

              <>
              <div id='table-container'> 
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
                        {list.slice(pageTable.firstnum, pageTable.secondnum).map((player) =>{

                                  contador++

                                  return <tr id={'key-'+contador}>
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

              <div id="buttons-page-table">

                    <ButtonNext className='buttonNext' isactive={pageTable.firstnum===0 ? false : true} onClick={downTablePage}>Atrás</ButtonNext>
                    <ButtonNext className='buttonNext' isactive={list.length>pageTable.secondnum ? true : false} onClick={upTablePage}>Siguiente</ButtonNext>
                
                    <div id='pages-table'>{pageTable.firstnum + 1} - {pageTable.secondnum + 1} de {list.length}</div>

                </div>


            
              </>


  )
}
