import { getLineAndCharacterOfPosition } from "typescript";
import { user, chatroom } from "./interface";


let chatroom : chatroom[]=[]


export const adduser = (newuser : user) => {

    if(chatroom.length===0){

        chatroom.push(newuser);

        console.log('usuarios: ',chatroom)

        return 'correct'

    } else{

    const users = chatroom.map(users => users.nombre)

    if(!users.includes(newuser.nombre)){

        chatroom.push(newuser);

        console.log('usuarios: ',chatroom)

        return 'correct'

    } else {

        return 'error'
    }

}

   

}

// export const deleteuser = (userid : string) => {

//     const index = chatroom.findIndex(x => x.id === userid)

//     chatroom.splice(index, 1);

// }


