import react, { useState, Dispatch, SetStateAction, useRef, LegacyRef } from 'react'
import React, { useEffect } from 'react'
import socket from '../../motos/sockets'
import { messagesUser } from './interfaces'
import './ChatRoom.css'
import {useImmer} from 'use-immer'

let usersload = false;

const ChatRoom = (props: {myUser : string}) => {

    const [users, setUsers] = useImmer<string[]>([])

    const [chat, setChat] = useState<messagesUser[]>([])

    const [myNewMsg, setMyNewMsg] = useState<messagesUser>({
        user : props.myUser,
        message : ''
    })




    const systemMessage = (username : string) => {

            let newobject = {
                user : 'Chat Room',
                message : 'Se ha unido al chat ' + username
            }
            
            return newobject

    }

    

    useEffect(()=>{

        socket.on('users', (res : string[])=>{

            setUsers(res);

        })

        return () => {socket.off()};


    }, )



    useEffect(()=>{

        socket.on('newUser', (newuser : string) =>{

         if(!users.includes(newuser)){

                    setUsers(users => [...users, newuser])
                    
                    setChat(chat => [...chat, systemMessage(newuser)])
            }

        } )

        return () => {socket.off()}

    })


    useEffect(()=>{

        socket.on('newmsg', (res : messagesUser) => {

            console.log('recibido: ', res)

            setChat(chat => [...chat, res])

          })

        return () => {socket.off()}

    })

    

    //-----------------------------setdownscrollmainchat-----------------------------------

    const scrollref = useRef<HTMLDivElement>(null);


    useEffect(()=>{

        scrollref.current!==null && scrollref.current.scrollIntoView({ behavior: "smooth" });

    }, [chat])


    //--------------------------------sendmessage--------------------------------------------

    const textarearef = useRef<HTMLTextAreaElement>(null)


    const setMessage = (e : React.ChangeEvent<HTMLTextAreaElement>) => {

        setMyNewMsg({...myNewMsg, 
                                  message : e.currentTarget.value})

    }

    const sendMsg = () =>{

            socket.emit('sendmsg', myNewMsg)

            setChat(chat => [...chat, myNewMsg])

            setMyNewMsg({...myNewMsg, message : ''})

            

    }

    const sendMsgEnter = (e : React.KeyboardEvent<HTMLTextAreaElement>) =>{

        if(e.key==='Enter'){

                e.preventDefault()

                socket.emit('sendmsg', myNewMsg)

                setChat(chat => [...chat, myNewMsg])

                setMyNewMsg({...myNewMsg, message : ''})

        }

}




                return (

                            <div id='container-chatroom'>


                                    <div id='main-chat-title'>

                                        Chat Room

                                    </div>


                                    <div id='list-users'>

                                        <div>Sala Principal</div>

                                        {users.map((user) => {

                                            return <div id={user}>
                                                        
                                                        {user}

                                                        </div>

                                        })}
                                

                                
                                
                                    </div>

                                    <div id='main-chat' ref={scrollref}>

                                        {chat.map((chat)=>{

                                                return <div id={Math.random().toString()}>

                                                        {chat.user} dice: {chat.message}

                                                </div>


                                        })}






                                    </div>

                                    <div id='chat-in'>

                                        <textarea name="mensaje" 
                                                  id="mensajeEnviar" 
                                                  cols={2} 
                                                  rows={1}
                                                  value={myNewMsg.message}
                                                  ref={textarearef}
                                                  onKeyPress={sendMsgEnter} 
                                                  placeholder='Escriba su mensaje'
                                                  onChange={setMessage}></textarea>
                                        <button onClick={sendMsg}>Enviar</button>

                                    </div>
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                              </div>









                )







}


export default ChatRoom