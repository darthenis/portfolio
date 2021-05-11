import { getLineAndCharacterOfPosition } from "typescript";
import { user, chatroom } from "./interface";


let chatroom : chatroom[]=[]


export const adduser = (newuser : user) => {

    if(chatroom.length===0){

        chatroom.push(newuser);

        console.log('usuarios: ',chatroom)

        return 'correct'

    } else{

    const actualUsers = chatroom.map(users => users.nombre)

    if(!actualUsers.includes(newuser.nombre)){

        chatroom.push(newuser);

        console.log('usuarios: ',chatroom)

        return 'correct'

    } else {

        return 'el nombre ya existe'
    }

}

   

}

// export const deleteuser = (userid : string) => {

//     const index = chatroom.findIndex(x => x.id === userid)

//     chatroom.splice(index, 1);

// }


