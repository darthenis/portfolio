
import { user, chatroom, privateChat } from "./interface";


export let chatroomusers : chatroom[]=[]


export const adduser = (newuser : user) => {

    if(chatroomusers.length===0){

        chatroomusers.push(newuser);

        console.log('usuarios: ',chatroomusers)

        return 'correct'

    } else{

    const actualUsers = chatroomusers.map(users => users.nombre)

    if(!actualUsers.includes(newuser.nombre)){

        chatroomusers.push(newuser);

        console.log('usuarios: ',chatroomusers)

        return 'correct'

    } else {

        return 'error'
    }

}

   

}

// export const deleteuser = (userid : string) => {

//     const index = chatroomusers.findIndex(x => x.id === userid)

//     chatroomusers.splice(index, 1);

// }


