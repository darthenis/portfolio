import axios from 'axios';
import {Player} from './trivia-interfaces-types'


export const addPlayer = async (data : Player) =>{

    return await axios.post('https://personalwebapi.herokuapp.com/addplayer', data)

}

export const getPlayers = async () =>{

   const data =  await axios.get('https://personalwebapi.herokuapp.com/getplayers');

   return data;


}