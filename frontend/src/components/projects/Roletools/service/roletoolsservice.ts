import axios from 'axios'
import { Login, Register } from '../elements/login/interfaces'
import { match, profile } from '../Interfaces/interfaces'


export const loginRoleTools = async (data : Login) => {

        return await axios.post('http://localhost:4000/loginuser', data)

}

export const postRegister = async (data : Register) => {

         return await axios.post('http://localhost:4000/registeruser', data)

}

export const recoveryUser = async (email : any) => {

        return await axios.post('http://localhost:4000/recoveryuser', email)
} 

export const reSendLink = async (user : string) => {

        const data ={
                user : user
        }

        return await axios.post('http://localhost:4000/resendlink', data)

}


export const setNewEmail = async (newEmail : string, user : string) => {

        const data = {
                user : user,
                email : newEmail
        }

        return await axios.post('http://localhost:4000/setNewEmail', data)

}


export const verifyUser = async (code : string) => {

        return await axios.get('http://localhost:4000/confirm/'+ code).then((response)=>{
                return response.data
        })

}

export const checkingCode = async (code : string) => {

        const data = { code : code}


        return await axios.post('http://localhost:4000/checkcode', data)

}

export const restPassword = async (email : string, pass : string) => {

        const data = {
                email : email,
                pass : pass
        }

        return await axios.post('http://localhost:4000/restpass', data)
        

}



export const newMatch = async (profile : profile, match : match) => {

        const data = {

                user : profile.user,
                match : match
        }

        return await axios.post('http://localhost:4000/roletools/creatematch', data, {
                                                                                headers : {
                                                                                'Authorization': `bearer ${profile.token}`,
                                                                                'Accept'       : 'application/json',
                                                                                'Content-Type' : 'application/json'
                                                                                }
                                                                                
                                                                        })

                                                                }


export const seekMatch = async (profile : profile, match : match) => {

        const data = {

                user : profile.user,
                match : match
        }


        return await axios.post('http://localhost:4000/roletools/seekmatch', data, {
                                                                                        headers : {
                                                                                        'Authorization': `bearer ${profile.token}`,
                                                                                        'Accept'       : 'application/json',
                                                                                        'Content-Type' : 'application/json'

                                                                                        }

                                                                                }
                                                                        )

                                                                        
                                                                        
                                                                        
                                                                }


export const myMatch = async (profile : profile, matchName : string) => {

        
        const data = {

                user : profile.user,
                match : matchName
        }
                                                                
                return await axios.post('http://localhost:4000/roletools/mymatch', data, {
                                                                                                 headers : {
                                                                                                                'Authorization': `bearer ${profile.token}`,
                                                                                                                'Accept'       : 'application/json',
                                                                                                                'Content-Type' : 'application/json'
                                                                
                                                                                                        }
                                                                
                                                                                                }
                                                                                        )
                                                                
                                                                                                                                                
                                                                                }
                                                                
