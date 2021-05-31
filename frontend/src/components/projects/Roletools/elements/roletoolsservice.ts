import axios from 'axios'
import { Login, Recovery, Register } from './interfaces'


export const loginRoleTools = async (data : Login) => {

        return await axios.post('http://localhost:4000/loginuser', data)

}

export const postRegister = async (data : Register) => {

         return await axios.post('http://localhost:4000/registeruser', data)

}
export const recoveryUser = async (data : Recovery) => {

        return await axios.post('http://localhost:4000/recoveryuser', data)
}

export const checkCodeRecovery = async (code : number) => {

        return await axios.post('http://localhost:4000/recoveryCode', code)

}