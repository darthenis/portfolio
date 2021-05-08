import axios from 'axios'
import {message} from './interfaces-types'


export const sendMail = async (message : message) => {

    console.log('mensaje enviado: ', message)

    const result = await axios.post('https://personalwebapi.herokuapp.com/sendmessage', message)

    return result;
}

//