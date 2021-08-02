import react from 'react'
import Main from './main'
import { useNavigation } from '../../navegation/navigationContext'
import Friends from './friends'
import CreateMatch from './matchesMenu/create'
import './section.css'
import Matches from './matchesMenu/list'
import JoinMatch from './matchesMenu/join'
import Player from './match/playerinterface/player'
import Master from './match/masterinterface/master'



const Section = () => {


    const { navigation } = useNavigation()!

        return (


                <section id='container-section'>

                    {navigation.actualPage==='Main' && <Main/>}
                    {navigation.actualPage==='Friends' && <Friends/>}
                    {navigation.actualPage==='Matches' && <Matches/>}
                    {navigation.actualPage==='CreateMatch' && <CreateMatch/>}
                    {navigation.actualPage==='JoinMatch' && <JoinMatch/>}
                    {navigation.actualPage==='Player' && <Player/>}
                    {navigation.actualPage==='Master' && <Master/>}
                    
                    


                </section>


        )



}


export default Section