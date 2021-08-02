import react, { Dispatch, SetStateAction, useState } from 'react'
import { useNavigation } from '../../navegation/navigationContext'
import { useProfile } from '../../User/userContext'
import { Button, Element, List } from './styled'



const Friends = (props : {menuActive : any, setMenuActive : Dispatch<SetStateAction<any>>}) => {

    const {profile} = useProfile()!
    
    const { navigation, setNavigation } = useNavigation()!


    const activeMenu = () =>{


        props.setMenuActive({...props.menuActive, 
        
                                    crear: false,
                                    amigos: !props.menuActive.amigos,
                                    perfil: false})
  

    }


    return (

          <div>

            <Button isActive={props.menuActive.amigos} onClick={activeMenu}>
                
              Amigos

            </Button>

            <div>
                <List isActive={props.menuActive.amigos}>

                    <Element>Agregar</Element>

                    <Element>Eliminar</Element>

                </List>
            </div>

          </div>


    )


}

export default Friends