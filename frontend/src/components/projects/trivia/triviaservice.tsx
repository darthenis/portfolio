import axios from 'axios';
import {Player} from './trivia-interfaces-types'
import config from '../../../config';


export const addPlayer = async (data : Player) =>{

    return await axios.post(config.APIURL+'/addplayer', data)

}

export const getPlayers = async () =>{

   const data =  await axios.get(config.APIURL+'/getplayers');

   return data;


}