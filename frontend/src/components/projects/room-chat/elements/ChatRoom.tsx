import React, { useState, useRef, useEffect } from 'react'
import socket from '../../motos/sockets'
import { ChatState, messagesMainChat, MyUserMessages, Users } from './interfaces'
import './ChatRoom.css'

import MainChat from './mainchat'
import PrivateChat from './privatechat'
import {List, ListUsers} from './ChatRoom-styled'

let usersload = false;

const ChatRoom = (props: {myUser : string}) => {

    const [chatState, setChatState] = useState<ChatState>({ users : [], messages : [], chatActive : -1 });

    const [myNewMsg, setMyNewMsg] = useState<MyUserMessages>({
                                                                user : props.myUser,
                                                                message : ''
                                                            })

    const [titleChat, setTitleChat] = useState('Sala Principal')

    const systemMessage = (username : string) => {

            let newobject = {
                user : 'Chat Room',
                message : 'Se ha unido al chat ' + username
            }
            
            return newobject

    }

    const systemLeaveMessage = (username : string) => {

        return {
            user : 'Chat Room',
            message: username + ' ha abandonado el chat'
        }

    }


    const addNewUsers = (listusers : string[]) => {

       let newUsers : Users[] = listusers.map(nUser => {   

            return {

                    user : nUser,
                    privateChat : [{user : '', message: ''}],
                    newMsg : false,
                    state : true
                }
                
        })

        setChatState({...chatState, users : [...chatState.users.concat(newUsers)]})

    }

    const updateStateUser = (username : string) => {

        const newState : Users [] = chatState.users.map( user =>{

                            if (user.user===username)  return {...user, state : user.state!}

                            return user;

                        })

        setChatState({...chatState, users : [...newState]})
    }

    const deleteUser = (username : string) => {

        const newState : Users [] = chatState.users.filter( user => user.user!==username)

        const newChat : messagesMainChat [] = chatState.messages.filter(msg => msg.user!==username)

        const index = chatState.users.findIndex(user => user.user===username)

        setChatState({...chatState, users : [...newState], 
                                    messages : [...newChat.concat(systemLeaveMessage(username))], 
                                    chatActive : index === chatState.chatActive ? -1 : chatState.chatActive})

    }


    const newPrivateMsg = (data : messagesMainChat, userPrivate?:string) =>{


            const newMessage = {
                user : data.user,
                message : data.message
            }

            let actualUser : string;

            let index : number;

            let boolean : boolean;

            if(userPrivate) {
                
                index = chatState.users.findIndex(e => e.user===userPrivate)

                actualUser = userPrivate

                boolean = false
            
            }  else  { 
                
                index = chatState.users.findIndex(e => e.user===data.user)
            
                actualUser = data.user
            
                boolean = true;
            
            }


            const newObject : Users [] = chatState.users.map(item => {

                        if(item.user===actualUser){

                            const newArray = item.privateChat

                            const newArray2 = newArray.concat(newMessage)

                            return {...item, newMsg: boolean, privateChat : [...newArray2] }

                        }

                        return item


            })

            setChatState({...chatState, users : [...newObject]})

    }
                

    

    useEffect(()=>{

        socket.on('users', (res : string[])=>{

            console.log('new user: ', res)

            addNewUsers(res)

        })

        return () => {socket.off()};


    },)

    useEffect(()=>{


        socket.emit('getUsers', props.myUser)


    },[])



    useEffect(()=>{

        socket.on('newUser', (newuser : string) =>{

         const checkUser = chatState.users.find(user => user.user===newuser)

         if(!checkUser){

                    addNewUsers([newuser])
            
                } else { 

                  updateStateUser(newuser)

                }

        } )

        return () => {socket.off()}

    })


    useEffect(()=>{

        socket.on('newmsg', (res : messagesMainChat) => {

            setChatState({...chatState, messages : [...chatState.messages, res]})

          })

        return () => {socket.off()}

    })

    useEffect(()=>{

        socket.on('disconnectuser', (user) =>{

            deleteUser(user)

        })

    })


    useEffect( () => {

        socket.on('privatemsgin', (data) =>{

                newPrivateMsg(data)

        })

    })

    

    

    //-----------------------------setdownscrollmainchat-----------------------------------

    const scrollref = useRef<HTMLDivElement>(null);


    useEffect(()=>{

        scrollref.current!==null && scrollref.current.scrollIntoView({ behavior: "smooth" });

    })

    //---------------------------------MainChat---------------------------------------------

    const sendMsgMainChat = () =>{
    
        if (myNewMsg.message!==''){
                socket.emit('sendmsg', myNewMsg)

                setChatState({...chatState, messages : [...chatState.messages, myNewMsg]})

                setMyNewMsg({...myNewMsg, message : ''})
        }

    }


    //--------------------------------sendmessage--------------------------------------------

    const textarearef = useRef<HTMLTextAreaElement>(null)


    const setMessage = (e : React.ChangeEvent<HTMLTextAreaElement>) => {

        setMyNewMsg({...myNewMsg, 
                                  message : e.currentTarget.value})

    }
    

    const sendMsg = () =>{

        chatState.chatActive === -1 ? sendMsgMainChat() : sendMsgPrivate()
      
    }


    let details = navigator.userAgent;

    let regExp = /android|iphone|kindle|ipad/i;

    let isMobile = regExp.test(details);

    const sendMsgEnter = (e : React.KeyboardEvent<HTMLTextAreaElement>) =>{
       
        if(!isMobile){

            if(e.key==='Enter' && !e.shiftKey){

                e.preventDefault()

                chatState.chatActive === -1 ? sendMsgMainChat() : sendMsgPrivate()
               
            } 
            
            if (e.key === 'Enter' && e.shiftKey){

                e.preventDefault()

                textarearef.current!.value += '\n'

            }

        }   
 
    }

//------------------------------------privateMsg-------------------------------------------

    const privateRoom = (username : string) => {

            const index = chatState.users.findIndex(item => item.user===username)

            setChatState({...chatState, chatActive : index})

            setActive({...active, call : false, push : true})

    }


    const sendMsgPrivate = () =>{

        socket.emit('privatemsg', myNewMsg, chatState.users[chatState.chatActive].user)

        newPrivateMsg(myNewMsg, chatState.users[chatState.chatActive].user)

        setMyNewMsg({...myNewMsg, message : ''})

    }

    useEffect(()=>{

        if(chatState.chatActive !== -1){

            setTitleChat(chatState.users[chatState.chatActive].user)

        } else {

        setTitleChat('Sala Principal')

        }


    })

    const mainChat = () => {

        setChatState({...chatState, chatActive : -1})

        setActive({...active, call : false, push : true})

    }

    const checkNewMsg = (username : string) => {

            const index = chatState.users.findIndex(item => item.user===username)

            if(index===chatState.chatActive) return false

            return chatState.users[index].newMsg

    }

    useEffect(()=>{   //verifica en que chat se encuentra para desactivar avisos

        if(chatState.chatActive !== -1) {
            
                    const name = chatState.users[chatState.chatActive].user
            
                    const newArray = chatState.users.map(item => {

                                if(item.user === name) {

                                    return {...item, newMsg : false}
                                }

                                return item

                    })

                    setChatState({...chatState, users : [...newArray]})
        }

    }, [chatState.chatActive])

    const checkChatActive = (chat : string) => {

        if (chat==='Sala Principal') {

            if(chatState.chatActive===-1) return true

        } else {

                const index = chatState.users.findIndex(user => user.user === chat)

                if (index===chatState.chatActive) return true 

                return false

        }        


    }

    const [active, setActive] = useState({
        call : false,
        push : false
    })


    const activeMenu = () =>{

        //function for responsive menu ('nav'). 

        if (!active.call) setActive({...active, call : true, push : false})

        else setActive({...active, call : false, push : true})

    }

                return (

                            <div id='container-chatroom'>

                                    <div id='title-list'> <div>Chat App</div> </div>


                                    <div id='main-chat-title'>

                                        <div id='menu-responsive'>

                                            <i className="fas fa-ellipsis-v" onClick={activeMenu}> Salas</i>
                                            
                                        </div>

                                        <div id='title-text'>{active.call ? 'Usuarios' : titleChat}</div>

                                    </div>


                                    <ListUsers isActive={active.call} isOff={active.push} id='list-users'>

                                        <List   isActive={false} 
                                                chatActive={checkChatActive('Sala Principal')} 
                                                onClick={mainChat}>Sala Principal</List>

                                        {chatState.users.map((item) => {
        

                                            return <List chatActive={checkChatActive(item.user)} 
                                                        isActive={checkNewMsg(item.user)} 
                                                        id={item.user} 
                                                        onClick={() => {privateRoom(item.user)}}>
                                                        
                                                        {item.user}

                                                        </List>

                                        })}
                                

                                
                                
                                    </ListUsers>


                                       {chatState.chatActive === -1 && <MainChat myUser={props.myUser} mainChat={chatState.messages}></MainChat>}

                                       {chatState.chatActive >= 0 && <PrivateChat myUser={props.myUser} chatState={chatState} setChatState={setChatState}></PrivateChat>}


                                    

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