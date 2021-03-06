import react, {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from 'react'
import { ChatState, messagesMainChat, Users } from './interfaces'




const PrivateChat = (props: { chatState : ChatState, 
                              setChatState : Dispatch<SetStateAction<ChatState>>
                              myUser : string}) => {
                                

    const endmessage = useRef<HTMLDivElement>(null);


    useEffect(()=>{

                endmessage.current!==null && endmessage.current.scrollIntoView(); 

    }, [props.chatState.users] )


    const classChat = (user : string) => {

        if(user === 'Chat Room') { return 'system-chat'}
        else if (user !== props.myUser) {return 'users-chat'}
        return 'myuser-chat'

        }


            return (


                <div className='chat-box'>

                        

                        {props.chatState.users[props.chatState.chatActive].privateChat.map((chat : any)=>{

                                        if(chat.user==='') return <div className='systemMessage'>Bienvenide al chat privado.</div>

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