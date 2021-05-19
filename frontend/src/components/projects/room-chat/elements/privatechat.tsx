import react, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'
import { messagesUser, privateMessages } from './interfaces'




const PrivateChat = (props: { privateMsg : privateMessages[], 
                              setPrivateMsg : Dispatch<SetStateAction<privateMessages[]>>
                              numberChat : number
                              myUser : string}) => {
                                

    const endmessage = useRef<HTMLDivElement>(null);

    useEffect(()=>{

            endmessage.current!==null && endmessage.current.scrollIntoView(); 

    }, [JSON.stringify(props.privateMsg[props.numberChat].messages)] )


    const classChat = (user : string) => {

        if(user === 'Chat Room') { return 'system-chat'}
        else if (user !== props.myUser) {return 'users-chat'}
        return 'myuser-chat'

        }


            return (


                <div className='chat-box'>

                    

                {props.privateMsg[props.numberChat].messages.map((chat : any)=>{

                        if (!chat.user) {return <div>Chat Room dice: Bienvenide al chat privado.</div>}

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