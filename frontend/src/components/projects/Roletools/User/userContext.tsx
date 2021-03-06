import {createContext, useContext} from 'react'
import { userStateContext } from './types';


const UserContext = createContext<userStateContext | undefined>(undefined)

export const useProfile = () => useContext(UserContext);

export default UserContext