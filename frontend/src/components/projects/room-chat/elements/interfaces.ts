

export interface MyUserMessages {

        user : string,
        message : string,

}

export interface messagesMainChat {

            user : string,
            message : string
}


export interface Users{

            user : string,
            privateChat : { user : string, message: string }[],
            newMsg : boolean,
            state : boolean
            

}


export interface ChatState {

    users : Users[],
    messages : messagesMainChat[],
    chatActive : number

}