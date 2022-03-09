import react, {useEffect, useRef} from 'react'


const MainChat = (props: {mainChat : any, myUser : string}) =>{


    const scrollref = useRef<HTMLDivElement>(null);


    useEffect(()=>{

        scrollref.current!==null && scrollref.current.scrollIntoView();

    }, [props.mainChat])


    const classChat = (user : string) => {

            if(user === 'Chat Room') { return 'system-chat'}
            else if (user !== props.myUser) {return 'users-chat'}
            return 'myuser-chat'
            
    }

    return (


        <div className='chat-box'>

                {props.mainChat.map((chat : any)=>{

                        return <div id={Math.random().toString()} className={classChat(chat.user)}>

                                {chat.user === props.myUser && <>{chat.message} </>}
                                {(chat.user !== props.myUser && chat.user !== 'Chat Room') && <>{chat.user} dice: {chat.message}</>}
                                {chat.user === 'Chat Room' && <>{chat.message}</>}
                                </div>
                        
                        })}

            <div ref={scrollref}/>


        </div>






    )

}

export default MainChat