import {useProfile} from '../User/userContext'
import axios from 'axios'
import { Login, Recovery, Register } from './interfaces'


const {profile} = useProfile()!

const configHeadersToken = {    headers : {
        'authorization': `bearer ${profile.token}`,
        'Accept'       : 'application/json',
        'Content-Type' : 'application/json'}}

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

export const checkConfirmCode = async (code : string) => {

        return await axios.post('http://localhost:4000/checkconfirmcode', code, configHeadersToken)
}

export const setNewEmail = async (newEmail : string) => {

        return await axios.post('http://localhost:4000/setNewEmail', newEmail, configHeadersToken)

}

export const reSendEmail = async () => {

        return await axios.post('http://localhost:4000/resendemail', profile.user, configHeadersToken)
}