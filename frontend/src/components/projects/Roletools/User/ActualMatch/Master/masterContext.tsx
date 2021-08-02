import {createContext, useContext } from 'react'
import { masterStateContext } from './type'


const MasterContext = createContext<masterStateContext | undefined>(undefined)

export const useMaster = () => useContext(MasterContext);

export default MasterContext