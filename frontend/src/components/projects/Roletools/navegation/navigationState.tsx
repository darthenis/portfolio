import react, { useEffect, useState } from 'react'
import NavigationContext from './navigationContext'


const initialNavigation = {
    actualPage: 'main',
    actualMatch: '',
    }

type Props={
        children : React.ReactNode
    }


const NavigationState = ({children} : Props) => {

    const [navigation, setNavigation] = useState(JSON.parse(sessionStorage.getItem('navigationRoleTools')!) || initialNavigation)


    useEffect(() => {

        window.sessionStorage.setItem('navigationRoleTools', JSON.stringify(navigation))

    },[navigation])


    return(

        <NavigationContext.Provider value={{navigation, setNavigation}}>
        {children}
        </NavigationContext.Provider>
    )


}


export default NavigationState;