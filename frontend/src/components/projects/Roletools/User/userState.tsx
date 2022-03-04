import react, { useState } from 'react'
import UserContext from './userContext'
import axios from 'axios'
import { profile } from './types';


type Props={
    children : React.ReactNode
}

const initialProfile = {
    user: '',
    matchesCreated: [],
    matchesJoined : [],
    token: ''
    };

const UserState = ({children} : Props) =>{

    const [profile, setProfile] = useState<profile>(initialProfile)

    const getProfile = async () =>{

            const data = { user : profile.user}

            axios.post('http://localhost:4000/roletools/getprofile', data, {
                headers : {
                    'Authorization': `bearer ${profile.token}`,
                    'Accept'       : 'application/json',
                    'Content-Type' : 'application/json'

                }
            }).then(
                (res) => {

                            setProfile({...profile,
                                            user : res.data.user,
                                            matchesCreated : res.data.matchesCreated,
                                            matchesJoined  : res.data.matchesJoined,
                                            token : profile.token
                                    })

                                },
                    
                (error) => { return 'error cargando perfil'}
                
                )
            

        

    }


    return(
                <UserContext.Provider value={{profile, getProfile, setProfile}}>
                    {children}
                </UserContext.Provider>

             )
}


export default UserState