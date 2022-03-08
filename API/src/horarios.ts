
import {restaurarmotos} from './routes/data.controller'


interface hour {

        hour : number;
        minutes : number;
        day : number

}

const convertHour = (mss : number) =>{

  let hours = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));

  return {hour : hours, minutes : minutes }
}

let hours: hour[]=[];

let miliseconds=27000000; //seteado a las 7:30

for (let i=0;i<=24;i++){

      miliseconds+=1800000;

      const date = new Date()

      let hour = {  hour : convertHour(miliseconds).hour,
                    minutes : convertHour(miliseconds).minutes,
                    day : 0
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

      let i=0;

      console.log('hours',hours)

      setInterval( () => { 
        
        hours = hours.map((time) => {

              i++;  

              if (  time.hour < actualTime.hour  
                    && time.day !== actualTime.day
                    || 
                    time.hour === actualTime.hour 
                    && time.minutes === 0 
                    && actualTime.minutes >= 30){

                  restaurarmotos(i)

                  return {...time, day : actualTime.day}

                }

              return time;



      })}, 1000)

    }
