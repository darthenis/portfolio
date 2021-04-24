import axios from 'axios'
import {message} from './interfaces-types'


export const sendMail = async (message : message) => {

    console.log('contenido del mensaje: ', message)

    const result = await axios.post('http://localhost:4000/sendmessage', message)

    return result;
}