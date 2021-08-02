import react, { Dispatch, SetStateAction, useEffect, useState } from 'react'

let lastTime = new Date()


const CountDown = (props: {start : boolean, setStart : Dispatch<SetStateAction<boolean>>}) => {

    const [seconds, setSeconds] = useState(179)

    const [time, setTime] = useState('03:00')


    const countDown = () => {

        let preContador = Date.now() -lastTime.getTime()

        let contador = Math.floor(preContador / 1000)

        seconds>0 && setSeconds(prevState => prevState -contador)

        lastTime = new Date()

        var minute : string | number = Math.floor((seconds / 60) % 60);

        minute = (minute < 10) ? '0' + minute : minute;

        var second : string | number = seconds % 60;

        second = (second < 10) ? '0' + second : second;

        let time = minute +':'+ second

        setTime(time)


    }


    useEffect(() => {

        if(time!=='00:00'){

            const timer = 

                setInterval(countDown, 1000);

                
            return () => clearInterval(timer)

        }


    },[seconds, time])
        

    return(

            <div>{time === '00:00' ? 'Codigo expirado' : time}</div>

    )


}


export default CountDown