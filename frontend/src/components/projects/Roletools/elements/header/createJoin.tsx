import react, { Dispatch, SetStateAction, useState } from 'react'
import { useNavigation } from '../../navegation/navigationContext'
import { Button, Element, List } from './styled'



const CreateJoin = (props : {menuActive : any, setMenuActive : Dispatch<SetStateAction<any>>}) => {

    const { navigation, setNavigation } = useNavigation()!

    const activeMenu = () =>{

        props.setMenuActive({...props.menuActive, 
        
                                    crear: !props.menuActive.crear,
                                    amigos: false,
                                    perfil: false})
  
      }


    const desactiveMenus = () => {


        props.setMenuActive({...props.menuActive, 
        
            crear: false,
            amigos: false,
            perfil: false})

    }
    


    const changePage = (page : string) =>{

        setNavigation({...navigation, actualPage : page})

        desactiveMenus()


    }

    return (


        <div>

            <Button isActive={props.menuActive.crear} onClick={activeMenu}>Empezar</Button>

            <div>
                <List isActive={props.menuActive.crear}>

                    <Element onClick={() => changePage('Matches')}>Partida</Element>

                    <Element onClick={() => changePage('Pjs')}>Pjs</Element>

                </List>
            </div>

        </div>

    )

}


export default CreateJoin;