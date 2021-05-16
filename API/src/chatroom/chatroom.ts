
import { user, chatroom, privateChat } from "./interface";


export let chatroomusers : chatroom [] = [] 


export const adduser = (newuser : user) => {

    if(chatroomusers.length===0){

        chatroomusers.push(newuser);

        return 'correct'

    } else{

    const actualUsers = chatroomusers.map(users => users.nombre)

    if(!actualUsers.includes(newuser.nombre)){

        chatroomusers.push(newuser);

        return 'correct'

    } else {

        return 'error'
    }


}

}


export const deleteUser = (username : string) => {

   let newUsers = chatroomusers.filter(user => {return user.nombre !== username})

    chatroomusers = newUsers

 }

