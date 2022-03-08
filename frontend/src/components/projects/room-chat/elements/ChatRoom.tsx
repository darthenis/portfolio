import React, { useState, useRef, useEffect } from 'react'
import socket from '../../motos/sockets'
import { messagesUser, Users } from './interfaces'
import './ChatRoom.css'
import {useImmer} from 'use-immer'
import MainChat from './mainchat'
import PrivateChat from './privatechat'
import {List, ListUsers} from './ChatRoom-styled'

let usersload = false;

const ChatRoom = (props: {myUser : string}) => {

    const [users, setUsers] = useImmer<Users[]>([])

    const [chat, setChat] = useState<messagesUser[]>([])

    const [myNewMsg, setMyNewMsg] = useState<messagesUser>({
                                                                user : props.myUser,
                                                                message : ''
                                                            })

    const [numberChat, setNumberChat] = useState<number>(-1)

    const [titleChat, setTitleChat] = useState('Sala Principal')


    const systemMessage = (username : string) => {

            let newobject = {
                user : 'Chat Room',
                message : 'Se ha unido al chat ' + username
            }
            
            return newobject

    }

    const systemLeaveMessage = (username : string) => {

        let newMsg = {
            user : 'Chat Room',
            message: username + ' ha abandonado el chat'
        }

        const newObject : Users [] = users.map(user => {

            if(user.user===username) return {...user, messages : newMsg}

            return user;
        })

        setUsers([...newObject])

        setChat(chat.concat(newMsg))

    }


    const addNewUsers = (listusers : string[]) => {

        listusers.map(newUser => {   

            let User : Users= {

                user : newUser,
                privateChat : [{user : '', message: ''}],
                newMsg : false,
                state : true
            }

            setUsers(users => users.concat(User))

        })


    }

    const updateStateUser = (username : string) => {

        const newState : Users [] = users.map( user =>{

                            if (user.user===username)  return {...user, state : user.state!}

                            return user;

                        })

        setUsers([...newState])
    }


    const newPrivateMsg = (data : messagesUser, userPrivate?:string) =>{


            const newMessage = {
                user : data.user,
                message : data.message
            }

            let actualUser : string;

            let index : number;

            let boolean : boolean;

            if(userPrivate) {
                
                index = users.findIndex(e => e.user===userPrivate)

                actualUser = userPrivate

                boolean = false
            
            }  else  { 
                
                index = users.findIndex(e => e.user===data.user)
            
                actualUser = data.user
            
                boolean = true;
            
            }


            const newObject : Users [] = users.map(item => {

                        if(item.user===actualUser){

                            const newArray = item.privateChat

                            const newArray2 = newArray.concat(newMessage)

                            return {...item, newMsg: boolean, privateChat : [...newArray2] }

                        }

                        return item


            })

            setUsers([...newObject])

            

    }
                

    

    useEffect(()=>{

        socket.on('users', (res : string[])=>{

            addNewUsers(res)

        })

        return () => {socket.off()};


    }, )



    useEffect(()=>{

        socket.on('newUser', (newuser : string) =>{

         const checkUser = users.find(user => user.user===newuser)

         if(!checkUser){

                    let array=[newuser]

                    addNewUsers(array)
                    
                    setChat(chat => [...chat, systemMessage(newuser)])
            
                } else { 

                  updateStateUser(newuser)

                }

         

        } )

        return () => {socket.off()}

    })


    useEffect(()=>{

        socket.on('newmsg', (res : messagesUser) => {

            setChat(chat => [...chat, res])

          })

        return () => {socket.off()}

    })

    useEffect(()=>{

        socket.on('disconnectuser', (user) =>{

            updateStateUser(user)

            systemLeaveMessage(user)

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

                setChat(chat => [...chat, myNewMsg])

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

        numberChat ===-1 ? sendMsgMainChat() : sendMsgPrivate()
      
    }


    let details = navigator.userAgent;

    let regExp = /android|iphone|kindle|ipad/i;

    let isMobile = regExp.test(details);

    const sendMsgEnter = (e : React.KeyboardEvent<HTMLTextAreaElement>) =>{
       
        if(!isMobile){

            if(e.key==='Enter'){

                e.preventDefault()

                numberChat===-1 ? sendMsgMainChat() : sendMsgPrivate()
               
            } 
            
            if (e.key === 'Enter' === e.shiftKey){

                e.preventDefault()

                textarearef.current!.value += '\n'

            }

        }   
 
    }

//------------------------------------privateMsg-------------------------------------------

    const privateRoom = (username : string) => {

            const index = users.findIndex(item => item.user===username)

            setNumberChat(index)

            setActive({...active, call : false, push : true})

    }


    const sendMsgPrivate = () =>{

        socket.emit('privatemsg', myNewMsg, users[numberChat].user)

        newPrivateMsg(myNewMsg, users[numberChat].user)

        setMyNewMsg({...myNewMsg, message : ''})

    }

    useEffect(()=>{

        if(numberChat!==-1){

            setTitleChat(users[numberChat].user)

        } else {

        setTitleChat('Sala Principal')

        }


    })

    const mainChat = () => {

        setNumberChat(-1)

        setActive({...active, call : false, push : true})

    }

    const checkNewMsg = (username : string) => {

            const index = users.findIndex(item => item.user===username)

            if(index===numberChat) return false

            return users[index].newMsg

    }

    useEffect(()=>{   //verifica en que chat se encuentra para desactivar avisos

        if(numberChat!==-1) {
            
                    const name = users[numberChat].user
            
                    const newArray = users.map(item => {

                                if(item.user === name) {

                                    return {...item, newMsg : false}
                                }

                                return item

                    })

                    setUsers([...newArray])
        }

    }, [numberChat])

    const checkChatActive = (chat : string) => {

        if (chat==='Sala Principal') {

            if(numberChat===-1) return true

        } else {

                const index = users.findIndex(user => user.user === chat)

                if (index===numberChat) return true 

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

                                        {users.map((item) => {
        

                                            return <List chatActive={checkChatActive(item.user)} 
                                                        isActive={checkNewMsg(item.user)} 
                                                        id={item.user} 
                                                        onClick={() => {privateRoom(item.user)}}>
                                                        
                                                        {item.user}

                                                        </List>

                                        })}
                                

                                
                                
                                    </ListUsers>


                                       {numberChat===-1 && <MainChat myUser={props.myUser} mainChat={chat}></MainChat>}

                                       {numberChat>=0 && <PrivateChat myUser={props.myUser} users={users} setUsers={setUsers} numberChat={numberChat}></PrivateChat>}


                                    

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