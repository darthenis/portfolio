import react, { useEffect, useState } from 'react'
import Login from './elements/login/login'
import './roletools.css'
import RegisterRoleTool from './elements/login/register'
import Recovery from './elements/login/recoveryAccount'
import UserState  from './User/userState'
import EmailConfirm from './elements/login/emailConfirm'
import UserPage from './userPage'
import { useProfile } from './User/userContext'





const RoleTools = () =>{

    const {profile, setProfile} = useProfile()!

    const [loadPage, setLoadPage] = useState({

        login    : false,
        register : false,
        emailConfirm : false,
        recovery : false, 
        userPage : false,
        
        
    })

    useEffect(()=>{

        const userInfo = window.sessionStorage.getItem('userInfo')

        if(userInfo) {

            const data = JSON.parse(userInfo)

            setProfile({...profile, user : data.user,
                                    token : data.token})
                                

            setLoadPage({...loadPage, login : false,
                                     userPage : true})
                                                
        } else { setLoadPage({...loadPage, login : true})}

            
    }, [])


        return (
                
                    <div id='roletool-main-container'>

                        {loadPage.login && <Login loadPage={loadPage} setLoadPage={setLoadPage}></Login>}
                        {loadPage.register && <RegisterRoleTool loadPage={loadPage} setLoadPage={setLoadPage}></RegisterRoleTool>}
                        {loadPage.emailConfirm && <EmailConfirm/>}
                        {loadPage.recovery && <Recovery loadPage={loadPage} setLoadPage={setLoadPage}/>}
                        {loadPage.userPage && <UserPage/>}  
                        
                    </div>
               
           
        )



}

export default RoleTools