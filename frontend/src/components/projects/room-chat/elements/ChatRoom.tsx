import React, { useState, useRef, useEffect } from 'react'
import socket from '../../motos/sockets'
import { messagesUser, privateMessages } from './interfaces'
import './ChatRoom.css'
import {useImmer} from 'use-immer'
import MainChat from './mainchat'
import PrivateChat from './privatechat'
import {List} from './ChatRoom-styled'

let usersload = false;

const ChatRoom = (props: {myUser : string}) => {

    const [users, setUsers] = useImmer<string[]>([])

    const [chat, setChat] = useState<messagesUser[]>([])

    const [myNewMsg, setMyNewMsg] = useState<messagesUser>({
                                                                user : props.myUser,
                                                                message : ''
                                                            })

    const [privateChat, setPrivateChat] = useState<privateMessages[]>([])

    const [numberChat, setNumberChat] = useState<number>(0)

    const [chatActive, setChatActive] = useState(false)

    const [titleChat, setTitleChat] = useState('Sala Principal')


    const systemMessage = (username : string) => {

            let newobject = {
                user : 'Chat Room',
                message : 'Se ha unido al chat ' + username
            }
            
            return newobject

    }

    const systemLeaveMessage = (username : string) => {

        let newobject = {
            user : 'Chat Room',
            message: username + ' ha abandonado el chat'
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

         const userCheck = privateChat.find(privateChat => privateChat.user===newuser)
        
         if(userCheck!==undefined){ 

            const index = privateChat.findIndex(chat => chat.user===newuser)

            let newObject = privateChat;

            newObject[index].messages.push(systemMessage(newuser))

            setPrivateChat([...newObject])

         }

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

    useEffect(()=>{

        socket.on('disconnectuser', (user) =>{

            console.log('se ha desconectado: ', user)

            setUsers(users.filter(users => users !== user))

            setChat(chat => [...chat, systemLeaveMessage(user)])

            const index = privateChat.findIndex(chat => chat.user===user)

            let newObject = privateChat;

            newObject[index].messages.push(systemLeaveMessage(user))

            setPrivateChat([...newObject])



        })

    })


    useEffect( () => {

        socket.on('privatemsgin', (data) =>{

            const existUser = privateChat.find(users => users.user === data.user) //check user in private chat

            if(existUser!==undefined){

                let newState = privateChat

                const newObject = {
                    user : data.user,
                    message : data.message
                }

                const index = privateChat.findIndex(array => array.user === data.user)  //search user position in private chat

                newState[index].messages.push(newObject)

                if(numberChat!==index || chatActive===false) { newState[index].boolean=true }

                setPrivateChat([...newState])

   
           } else { 
                    
    
                   const newMessage : privateMessages =  {user : data.user, messages : [{ user : '', //creo el objeto
                                                                        message : ''}],
                                                                    boolean : true}

                   const newObject = {                              //creo el mensaje recibido
                       user : data.user,
                       message : data.message
                   }
                                                                           
                   let newState : privateMessages [] = privateChat

                   let index : number;

                   newState.length < 2 ? index=0 : index = newState.length-1
                   
                   newState.push(newMessage)  //agrego el nuevo objeto

                   newState[newState.length-1].messages.push(newObject)  //agrego el mensaje recibido en el objeto
   
                   setPrivateChat([...newState])


        }



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

        !chatActive ? sendMsgMainChat() : sendMsgPrivate()
      
    }

    const sendMsgEnter = (e : React.KeyboardEvent<HTMLTextAreaElement>) =>{

        if(e.key==='Enter'){

                e.preventDefault()

                !chatActive ? sendMsgMainChat() : sendMsgPrivate()
               
        }

}

//------------------------------------privateMsg-------------------------------------------

    const privateRoom = (theUser : string) => {

      
        const existUser = privateChat.find(users => users.user === theUser)


        if(existUser!==undefined){

             const index = privateChat.findIndex(users => users.user === theUser)

             setNumberChat(index)

             let newArr = [...privateChat];
                     privateChat.map((data,index) => {
                    newArr[index].boolean = false;
                 });

             setPrivateChat([...newArr])

             !chatActive && setChatActive(true)

        } else { 

                let newObject : privateMessages = { user : theUser, messages : [{
                                                                user : '',
                                                                message : '' }],
                                                            boolean : true
                }

                setPrivateChat(prevstate => [...prevstate, newObject])
            
                privateChat.length && setNumberChat(privateChat.length)

                !chatActive && setChatActive(true)

            }


    }


    const sendMsgPrivate = () =>{

        socket.emit('privatemsg', myNewMsg, privateChat[numberChat].user)

        let newState = privateChat

        newState[numberChat].messages.push(myNewMsg)

        setPrivateChat(newState)

        setMyNewMsg({...myNewMsg, message : ''})


    }

    useEffect(()=>{

        if(chatActive){

            setTitleChat(privateChat[numberChat].user)

        } else {

        setTitleChat('Sala Principal')

        }


    })

    const mainChat = () => {

        chatActive && setChatActive(false)

    }

    const activemsg = (user : string) =>{

        const state = privateChat.find(element => element.user === user)

        if (state?.boolean) { return 'black' } return 'yellow'

    }

    const checkmsg = (user : string) => {

            const index = privateChat.findIndex(privateChat => privateChat.user === user)

            if(index===numberChat && chatActive) return false

            const userMsg = privateChat.find(privateChat => privateChat.user === user )

            return userMsg?.boolean

    }

    const checkChatActive = (chat : string) => {

        if (chat==='Sala Principal') {

            if(!chatActive) return true

        } else if (chat!=='Sala Principal') {

                const index = privateChat.findIndex(privateChat => privateChat.user === chat)

                if (index===numberChat && chatActive) return true 

                return false

        }        


    }

                return (

                            <div id='container-chatroom'>

                                    <div id='title-list'> <div>Chat App</div> </div>


                                    <div id='main-chat-title'>

                                        <div>{titleChat}</div>

                                    </div>


                                    <div id='list-users'>

                                        <List isActive={false} chatActive={checkChatActive('Sala Principal')} onClick={mainChat}>Sala Principal</List>

                                        {users.map((user) => {

                                            return <List chatActive={checkChatActive(user)} isActive={checkmsg(user)} id={user} onClick={() => {privateRoom(user)}}>
                                                        
                                                        {user}

                                                        </List>

                                        })}
                                

                                
                                
                                    </div>


                                       {!chatActive && <MainChat myUser={props.myUser} mainChat={chat}></MainChat>}

                                       {chatActive && <PrivateChat myUser={props.myUser} privateMsg={privateChat} setPrivateMsg={setPrivateChat} numberChat={numberChat}></PrivateChat>}


                                    

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