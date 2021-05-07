import axios from 'axios'
import {message} from './interfaces-types'


export const sendMail = async (message : message) => {

    console.log('mensaje enviado: ', message)

    const result = await axios.post('https://localhost:4000/sendmessage', message)

    return result;
}