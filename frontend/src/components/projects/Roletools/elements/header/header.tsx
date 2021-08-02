import react, { useEffect, useState } from 'react'
import CreateJoin from './createJoin'
import ProfileOptions from './profile';
import './header.css'
import Friends from './friends';
import { useProfile } from '../../User/userContext';





const Header = ()  => {

    const {profile, getProfile} = useProfile()!

    const [menuActive, setMenuActive] = useState({

        crear : false,
        amigos : false,
        perfil : false
    })

    const loadProfile = async () => {

        getProfile()

    }

    useEffect(() => {

            loadProfile();

        
        }, [])


        return(


            <header id='header-App'>

                <nav> 
                 

                    <CreateJoin menuActive={menuActive} setMenuActive={setMenuActive}/>

                    <Friends menuActive={menuActive} setMenuActive={setMenuActive}/>

                    <ProfileOptions menuActive={menuActive} setMenuActive={setMenuActive}/>


                </nav>


                    </header>




        )



}


export default Header;