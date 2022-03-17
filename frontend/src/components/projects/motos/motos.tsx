
import React, {useState, useEffect} from 'react';
import { getMotos, restarMoto, sumarMoto } from './motosservice';
import {motos} from './motosinter'
import './motos.css'
import socket from './sockets'
import {MotosDiv} from './motos-styled'


//---------------------------------HORARIOS-------------------------------------

let horarios: string[]=['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];

//-------------------------------ACTIONUSERS------------------------------------

let useractions: boolean[]=[];

      
for ( let i=0;i<=24;i++ ){
                  
                  useractions.push(false)
                        
                }
    

//------------------------------COMPONENT-INIT----------------------------------


  const Motos = (): JSX.Element =>{

  const [loading, setLoading] = useState(false) //carga de un elemento

  const [motos, setmotos] = useState<motos[]>([])

  const loadmotos = async () =>{
    const res = await getMotos()

    const orderMotos = res.data.sort((a : motos, b : motos) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    setmotos(orderMotos);
  }

  useEffect(()=>{

      loadmotos();

  }, [])

  useEffect(()=>{

    loadmotos();


  }, [loading])


//-------------------------------SOCKETS----------------------------------------

  useEffect(()=>{

    socket.on('reloading', () => {

      loadmotos();

    })

    return () => {socket.off()};


  }, [motos])

//-------------------------------HOURSERVER-------------------------------------

  const [hour, setHour] = useState<string>()

  const actualHour = () => {

    const horario = new Date

      const addZero = (n : number) => {

        if (n===-1) return '23'

        if (n===-2) return '22'
 
        if (n===-3) return '21'

        if(n < 10) return '0' + n
        
        return n

      }

      let minutes    = addZero(horario.getUTCMinutes())
     
      let hours      = addZero(horario.getUTCHours()-3)

      let seconds    = addZero(horario.getUTCSeconds())

      let actualHour = hours+':'+minutes+':'+seconds

      setHour(actualHour)
    

   }

   
  setInterval(actualHour, 1000)


//---------------------------------STATUS---------------------------------------

  function status(num :number, index:number){

    if (useractions[index]===true) return 'Reservado'

        else if(num === 0) return 'No Disponible'

                else return 'Disponible'

  }


//--------------------------------ACTIONUSERFUNCTION-----------------------------


  async function actionUser(index:number){

          if(!loading)

            // loading espera el termino de la funcion para volver a estar disponible para ser ejecutada
            // evitando bugs de clicks mas rapidos que la respuesta de la base de datos.

              if(motos[index-1].motos>0){

                let useractioncheck = !useractions[index-1]

                      if (useractioncheck){

                              setLoading(true);

                              await restarMoto(index)

                              socket.emit('reload');

                            } else if (!useractioncheck){

                                      setLoading(true);

                                      await sumarMoto(index)
                                
                                      socket.emit('reload');

                                }

                              useractions[index-1] = !useractions[index-1]

                              setLoading(false)

                    }

                 }


//----------------------------------COLORSTATUS---------------------------------

  const statuscolor = (num :number, index:number) => {

    if (useractions[index]===true) return 'green'

    else if (num === 0) return 'red'

    else return 'gray'


  }


//----------------------------------RENDER--------------------------------------

  return(

    <div>
        <div id="BottomVolver" onClick={() => {window.location.href='/'}} >VOLVER</div>
            <div id="container">

                <div id='reloj'>{hour}</div>

                <div id="containertitulos">
                        <div><i className="far fa-clock"></i> Horarios</div>
                        <div><i className="fas fa-motorcycle"></i> Motos</div>
                        <div><i className="far fa-check-circle"></i> Estado</div>
                </div>

                <>
                { motos.map((motos) => {

                            return <MotosDiv 
                                    loadactive={loading} 
                                    style={{backgroundColor:statuscolor(motos.motos, motos.id-1)}}
                                    className='motos'
                                    key={motos.id+200}
                                    onClick={() => (actionUser(motos.id))}
                                    >

                                              <div> {horarios[motos.id-1]}</div>

                                              <div key={motos.id}>

                                                  {motos.motos}

                                              </div>

                                              <div key={motos.id+100}>{status(motos.motos, motos.id-1)}</div>

                                    </MotosDiv>

                                      }

                            )

                   }</>

          </div>
    </div>


  )

}

export default Motos;
