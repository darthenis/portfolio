import {createContext, useContext} from 'react'
import { navigationContext } from './types';


const NavigationContext = createContext<navigationContext | undefined>(undefined)

export const useNavigation = () => useContext(NavigationContext)

export default NavigationContext