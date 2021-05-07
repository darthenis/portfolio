import axios from 'axios';
import {Player} from './trivia-interfaces-types'


export const addPlayer = async (data : Player) =>{

    return await axios.post('https://localhost:4000/addplayer', data)

}

export const getPlayers = async () =>{

   const data =  await axios.get('https://localhost:4000/getplayers');

   return data;


}