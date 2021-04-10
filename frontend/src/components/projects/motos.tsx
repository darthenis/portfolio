
import React, {useState, useEffect} from 'react';
import moment from 'moment-timezone';
import { getMotos, restarMoto, sumarMoto } from './motosservice';
import {motos} from './motosinter'
import './motos.css'
import socket from './sockets'


let check : boolean=false;

//---------------------------------HORARIOS-------------------------------------

    let horarios: string[]=[];

    let minutes=450;

    for (let i=0;i<=24;i++){

        minutes+=30;

        let protohorario = moment.utc().startOf("day").add(minutes, "minutes").format("HH:mm");

        horarios.push(protohorario+' hs');

        }

//------------------------------COMPONENT-INIT----------------------------------


  const Motos = (): JSX.Element =>{

  const [motos, setmotos] = useState<motos[]>([])

  const loadmotos = async () =>{
    const res = await getMotos()
    setmotos(res.data);
  }

  useEffect(()=>{

      loadmotos();

  }, [])


//-------------------------------SOCKETS----------------------------------------

  useEffect(()=>{

    socket.on('reloading', () => {

      loadmotos();

    })

    return () => {socket.off()};


  }, [motos])

//-------------------------------HOURSERVER-------------------------------------

  const [hora, sethora] = useState<string>()

  function settime(){

      let localhour=moment();

      sethora(localhour.tz('America/Argentina/Buenos_Aires').format('HH:mm:ss'))

    }

  setInterval(settime, 1000)


//-------------------------------ACTIONUSERS------------------------------------

  let useractions: boolean[]=[];

  if(localStorage.getItem('useractions') != null){

          useractions = JSON.parse(localStorage.getItem('useractions')!)

          } else {

                  for (let i=0;i<=24;i++){useractions.push(false)}

                  localStorage.setItem('useractions', JSON.stringify(useractions))

                  }


//---------------------------------STATUS---------------------------------------

  function status(num :number, index:number){

    if (useractions[index]===true && motos[index].motos!==8) return 'Reservado'

        else if(num === 0) return 'No Disponible'

                else return 'Disponible'

  }


//--------------------------------ACTIONUSERFUNCTION-----------------------------


  async function actionUser(index:number){

          if(!check)

            check=!check; 
            // check espera el termino de la funcion para volver a estar disponible para ser ejecutada
            // evitando bugs de clicks mas rapidos que la respuesta de la base de datos.

              if(motos[index-1].motos>0){

                useractions[index-1] = !useractions[index-1]

                localStorage.setItem('useractions', JSON.stringify(useractions))

                      if (useractions[index-1]){

                              await restarMoto(index)

                              loadmotos()

                              socket.emit('reload');

                              

                            } else if (!useractions[index-1]){

                                      await sumarMoto(index)

                                      loadmotos()

                                      socket.emit('reload');

                                }

                              check=!check;

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
        <div id="BottomVolver">VOLVER</div>
            <div id="container">

                <div id='reloj'>{hora} hs</div>

                <div id="containertitulos">
                        <div><i className="far fa-clock"></i> Horarios</div>
                        <div><i className="fas fa-motorcycle"></i> Motos</div>
                        <div><i className="far fa-check-circle"></i> Estado</div>
                </div>

                <>
                {motos.map((motos) => {

                            return <div style={{backgroundColor:statuscolor(motos.motos, motos.id-1)}}
                                    className='motos'
                                    key={motos.id+200}
                                    onClick={() => (actionUser(motos.id))}
                                    >

                                              <div> {horarios[motos.id-1]}</div>

                                              <div key={motos.id}>

                                                  {motos.motos}

                                              </div>

                                              <div key={motos.id+100}>{status(motos.motos, motos.id-1)}</div>

                                    </div>

                                      }

                            )

                   }</>

          </div>
    </div>


  )

}

export default Motos;
