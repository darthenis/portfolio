


export interface messagesUser {

            user : string,
            message : string
}


export interface Users{

            user : string,
            privateChat : { user : string, message: string }[],
            newMsg : boolean,
            state : boolean
            

}