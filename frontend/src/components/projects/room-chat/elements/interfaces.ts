


export interface messagesUser {

            user : string,
            message : string
}


export interface privateMessages{

            user : string,
            messages : [{ user : string, message: string }],
            boolean : boolean
            

}