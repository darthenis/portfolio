import react, {useContext} from 'react'
import {useProfile} from '../User/userContext'




const UserPage = () => {


    const { profile } = useProfile()!


    return (

        <div>Bienvenido {profile!==undefined ? profile.user : 'no hay user'} </div>

    )
}

export default UserPage;