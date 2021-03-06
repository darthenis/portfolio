import React, {useState, useEffect} from 'react'
import ChatRoom from './elements/ChatRoom';
import Register from './elements/register';






const RoomChat = () => {


    const [pages, setPages] = useState<string>('register')

    const [myUser, setMyUser] = useState({
        nombre: '',
    })


    
            return (<>


                {pages==="register" && <Register myUser={myUser} 
                                                 setMyUser={setMyUser} 
                                                 setPages={setPages}
                                                 ></Register>}

                {pages==='chatroom' && <ChatRoom myUser={myUser.nombre}></ChatRoom>}





                </>)


}

export default RoomChat;