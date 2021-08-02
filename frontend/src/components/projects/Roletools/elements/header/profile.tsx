import react, { Dispatch, SetStateAction } from 'react'
import { Button, Element, List } from './styled'





const ProfileOptions = (props : {menuActive : any, setMenuActive : Dispatch<SetStateAction<any>>}) => {


    const activeMenu = () =>{


        props.setMenuActive({...props.menuActive, 
        
                                    crear: false,
                                    amigos: false,
                                    perfil: !props.menuActive.perfil})
  

    }


        return (

            <div>

                <Button isActive={props.menuActive.perfil} onClick={activeMenu}>Perfil</Button>
                <div>
                    <List isActive={props.menuActive.perfil}>

                        <Element>Cuenta</Element>

                        <Element>Salir</Element>

                    </List>
                </div>


            </div>


        )


}

export default ProfileOptions