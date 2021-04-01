
import moment from 'moment-timezone';
import {restaurarmotos} from './routes/data.controller'


export function horarios(){

  let horarios: string[]=[];

  let minutes=450;

  for (let i=0;i<=24;i++){

      minutes+=30;

      let protohorario = moment.utc().startOf("day").add(minutes, "minutes").format("HH:mm");

      horarios.push(protohorario);

      }

  return horarios;

}


export default function reloj(){

      let localhour=moment();

      return localhour.tz('America/Argentina/Buenos_Aires').format('HH:mm')

      }



const horasmotos:string[]=horarios();

export function revisarhora(){

      let horaactual = reloj()

      let i=1;

      horasmotos.map((hora) =>{

              if (horaactual===hora){

                restaurarmotos(i)

                console.log('restaurando hora')
              }

              i++

            })}
