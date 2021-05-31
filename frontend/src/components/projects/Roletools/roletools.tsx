import react, { useState } from 'react'
import Login from './elements/login'
import './roletools.css'
import RegisterRoleTool from './elements/register'
import Recovery from './elements/recoverypass'
import UserState  from './User/userState'
import UserPage from './elements/userPage'




const RoleTools = () =>{

    const [loadpage, setLoadpage] = useState({

        login    : true,
        register : false,
        recovery : false, 
        userPage : false,
        
        
    })


        return (

            <UserState>
                    <div id='roletool-main-container'>

                        {loadpage.login && <Login loadpage={loadpage} setLoadPage={setLoadpage}></Login>}
                        {loadpage.register && <RegisterRoleTool loadPage={loadpage} setLoadPage={setLoadpage}></RegisterRoleTool>}
                        {loadpage.recovery && <Recovery/>}
                        {loadpage.userPage && <UserPage/>}  
                        
                    </div>
            </UserState>
        )



}

export default RoleTools