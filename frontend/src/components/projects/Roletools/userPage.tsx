import react, {useContext} from 'react'
import Header from './elements/header/header'
import {useProfile} from './User/userContext'
import NavigationState from './navegation/navigationState'
import Section from './elements/section/section'




const UserPage = () => {
 


    return (

        <>

        <NavigationState>

        <Header/>

        <Section/>

        </NavigationState>

        </>    

    )
}

export default UserPage;