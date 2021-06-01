import react, { useState } from 'react'
import UserContext from './userContext'
import axios from 'axios'
import { profile } from './types';


type Props={
    children : React.ReactNode
}

const initialProfile = {
    user: '',
    friends: [],
    token: ''
    };

const UserState = ({children} : Props) =>{

    const [profile, setProfile] = useState<profile>(initialProfile)

    const getProfile = async (mytoken : string, name : string) =>{

            axios.post('http://localhost:4000/roletools/getprofile', name, {
                headers : {
                    'authorization': `bearer ${mytoken}`,
                    'Accept'       : 'application/json',
                    'Content-Type' : 'application/json'

                }
            }).then(
                (res) => {

                            setProfile({...profile,
                                            user : res.data.user,
                                            friends : res.data.friends,
                                            token : mytoken
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