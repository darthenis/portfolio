import react, { useEffect } from 'react'
import { useNavigation } from '../../../navegation/navigationContext'
import { useProfile } from '../../../User/userContext'
import { myMatch } from '../../../service/roletoolsservice'
import { useMaster } from '../../../User/ActualMatch/Master/masterContext'
import socket from '../../../service/socket'



const Matches = () => {

    const {navigation, setNavigation} = useNavigation()! 

    const { profile, getProfile } = useProfile()!

    const { resetMatchesSession } = useMaster()!

    useEffect(() => {
       
        getProfile()

    }, [])


    const loadPage = (page : string) =>{


        setNavigation({...navigation, actualPage : page})


    }


    const lookForMatch = async (nameMatch : string) => {

        const result = await myMatch(profile, nameMatch)

        switch(result.data.message){
            case 'done':

                resetMatchesSession()
                
                if(profile.matchesCreated.includes(nameMatch)){

                        setNavigation({...navigation,   actualPage : 'Master',
                                                        actualMatch : nameMatch})
                        socket.emit('joinMatch', nameMatch)
                } else {

                        setNavigation({...navigation,   actualPage : 'Player',
                                                        actualMatch : nameMatch})
                        socket.emit('joinMatch', nameMatch)
                    }
                break;
            case 'invalid':
                alert('No perteneces a esa partida')
        }

    }




    return (


            <div id='container-match-list'>

                
                <div id='list-matches-created'>

                        <div className='matchesList-title'>Partidas Creadas</div>
                        
                        {profile.matchesCreated ? profile.matchesCreated.map( (match) => { return <div className='matchName' onClick={() => lookForMatch(match)}> {match} </div> })
                                                
                                                : 'No hay partidas creadas' }
                </div>

                <div id='list-matches-joined'>

                        <div className='matchesList-title'>Partidas</div>
                        
                        {profile.matchesJoined ? profile.matchesJoined.map( (match) => { return <div className='matchName' onClick={() => lookForMatch(match)}> {match} </div> })
                                                    
                                                : 'No hay partidas' }
                                                
                </div>

                <div id='container-buttons-joinmatch'>

                <button className='new-join-match' onClick={()=>loadPage('CreateMatch')}>Crear partida nueva</button>
                <button className='new-join-match' onClick={()=>loadPage('JoinMatch')}>Unirse a partida nueva</button>

                </div>
                
                
            </div>

    )


}



export default Matches