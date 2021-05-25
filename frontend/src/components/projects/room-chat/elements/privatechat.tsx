import react, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'
import { messagesUser, Users } from './interfaces'




const PrivateChat = (props: { users : Users[], 
                              setUsers : Dispatch<SetStateAction<Users[]>>
                              numberChat : number
                              myUser : string}) => {
                                

    const endmessage = useRef<HTMLDivElement>(null);

    useEffect(()=>{

            endmessage.current!==null && endmessage.current.scrollIntoView(); 

    }, [JSON.stringify(props.users[props.numberChat].privateChat)] )


    const classChat = (user : string) => {

        if(user === 'Chat Room') { return 'system-chat'}
        else if (user !== props.myUser) {return 'users-chat'}
        return 'myuser-chat'

        }

        console.log(props.users)


            return (


                <div className='chat-box'>

                        

                        {props.users[props.numberChat].privateChat.map((chat : any)=>{

                                        if(chat.user==='') return <div>Bienvenide al chat privado.</div>

                                        return <div id={Math.random().toString()} className={classChat(chat.user)}>

                                                {chat.user === props.myUser && <>{chat.message} </>}
                                                {(chat.user !== props.myUser && chat.user !== 'Chat Room') && <>{chat.user} dice: {chat.message}</>}
                                                {chat.user === 'Chat Room' && <>{chat.message}</>}
                                                
                                                </div>
                        
                        })}


                        <div ref={endmessage}/>




        </div>




            )




}

export default PrivateChat