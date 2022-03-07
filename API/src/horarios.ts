
import {restaurarmotos} from './routes/data.controller'


interface hour {

        hour : number;
        minutes : number;
        day : number

}

const convertHour = (miliseconds : number) =>{

  let seconds = Math.floor(miliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  

  return {hour : hours, minutes : minutes }
}

let hours: hour[]=[];

let miliseconds=270000; //seteado a las 7:30

for (let i=0;i<=24;i++){

      miliseconds+=1800;

      const date = new Date()

      let hour = {  hour : convertHour(miliseconds).hour,
                    minutes : convertHour(miliseconds).minutes,
                    day : 1
                }

      hours = hours.concat(hour)

}


export default function time(){

      let date = new Date();

      return { hour : setLocalArgHour(Date.now()),
                minutes : date.getMinutes(),
                day : date.getDay() }

      }

const setLocalArgHour = (number : number) => {

        return number - 3;
    
}


export function checkHour(){

      let actualTime = time()

      let i=1;

      setInterval( () => { 
        
        console.log('hours: ', hours)
        
        hours = hours.map((time) => {

        if (  time.hour < actualTime.hour  
              && time.day !== actualTime.day
              || 
              time.hour === actualTime.hour 
              && time.minutes === 0 
              && actualTime.minutes >= 30){

            console.log('true')

            restaurarmotos(i)

            return {...time, day : actualTime.day}

          }

        i++

        return time;



      })}, 1000)

    }
