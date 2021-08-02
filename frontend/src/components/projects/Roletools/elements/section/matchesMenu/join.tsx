import React from 'react'
import react, { useState } from 'react'
import { useNavigation } from '../../../navegation/navigationContext'
import { useProfile } from '../../../User/userContext'
import { seekMatch } from '../../../service/roletoolsservice'



const JoinMatch = () =>{

    const {navigation, setNavigation} = useNavigation()!

    const {profile} = useProfile()!

    const [passRequired, setPassRequired] = useState(false)

    const [match, setMatch] = useState({

        name: '',
        pass: ''
    })

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {

        setMatch({...match, [e.target.name] : e.target.value })



    }

    const lookForMatch = async () => {

         const response = await seekMatch(profile, match)

         if(response.data.message==='pass'){

                setPassRequired(true)

         } else if (response.data.message==='done'){

                if(profile.matchesCreated.includes(match.name)){

                            setNavigation({...navigation,   actualPage : 'Master',
                    
                                                            actualMatch : match.name })


                        } else {
                        
                                    setNavigation({...navigation,  actualPage : 'Player',
                            
                                    actualMatch : match.name })


                        }

                

         }



    }




    return(


                <div className='container-Match'>


                    <form onSubmit={lookForMatch}>  

                        {!passRequired && 

                                    <>
                                        <label>Nombre de partida</label>
                                        <input type="text" name='name' onChange={onChange}/>
                                    </>}


                        {passRequired && 
                                    <>
                                        <label>Contraseña requerida</label>
                                        <input type="text" name='pass' onChange={onChange}/>
                                    </>}

                        <input type="submit"/>

                    </form>

                </div>

    )
}



export default JoinMatch