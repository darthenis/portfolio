import axios from 'axios';
import {Player} from './trivia-interfaces-types'


export const addPlayer = async (data : Player) =>{

    await axios.post('https://localhost:4000/addplayer', {data})

    return true;

}