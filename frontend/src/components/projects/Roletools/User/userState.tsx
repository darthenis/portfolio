import react, { useEffect, useReducer } from 'react'
import UserReducer from './userReducer'
import UserContext from './userContext'
import axios from 'axios'


type Props={
    children : React.ReactNode
}

type Profile = {
    user: string;
    friends: string[];
    token: string;
    };

const UserState = ({children} : Props) =>{

    const [{profile, isLoading, error} , dispatch] = useReducer(UserReducer, { isLoading : false })

    
    
    const setProfile = (profile : Profile) =>{

        dispatch({type : 'success', results : profile})

    }


    const getProfile = async (token : string, name : string) =>{

        if (profile){

            dispatch({type : 'request'})

            axios.post('http://localhost:4000/roletools/getprofile', name, {
                headers : {
                    'authorization': `bearer ${token}`,
                    'Accept'       : 'application/json',
                    'Content-Type' : 'application/json'

                }
            }).then(
                (res) => {

                    const newObject = {
                                user : res.data.user,
                                friends : res.data.friends,
                                token : profile.token
                    }

                    dispatch({type : 'success', results : newObject})
                
                },
                (error) => dispatch({type : 'failure', error})
            )

        }

    }


    return(
                <UserContext.Provider value={{profile, getProfile, setProfile}}>
                    {children}
                </UserContext.Provider>

             )
}


export default UserState