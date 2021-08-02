import react from 'react'
import { useProfile } from '../../User/userContext'



const Friends = () => {

    const {profile} = useProfile()!

    return (

        <div>

            AMIGOS

        </div>
    )
}


export default Friends