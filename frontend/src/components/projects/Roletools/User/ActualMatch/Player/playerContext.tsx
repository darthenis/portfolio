import {createContext, useContext } from 'react'
import { playerStateContext } from './type'


const PlayerContext = createContext<playerStateContext | undefined>(undefined)

export const usePlayer = () => useContext(PlayerContext);

export default PlayerContext