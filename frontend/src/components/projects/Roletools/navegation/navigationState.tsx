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

    const [navigation, setNavigation] = useState(initialNavigation)

    useEffect(()=>{


        const data = window.sessionStorage.getItem('navigationRoleTools')

        if (data){

                 setNavigation({...JSON.parse(data)})

        }

   
    }, [])


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