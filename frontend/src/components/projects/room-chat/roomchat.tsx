import React, {useState} from 'react'
import Register from './elements/register';





const RoomChat = () => {


    const [pages, setPages] = useState<string>('register')

    const [user, setUser] = useState({
        nombre: '',
    })
    
    
    
    
    
            return (<>


                {pages==="register" && <Register user={user} setUser={setUser} setPages={setPages}></Register>}





                </>)
















}

export default RoomChat;