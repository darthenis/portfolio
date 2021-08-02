import React from 'react'
import react, { useState } from 'react'
import { useProfile } from '../../../User/userContext'
import { newMatch } from '../../../service/roletoolsservice'





const CreateMatch = () => {

    const {profile} = useProfile()!

    const [match, setMatch] = useState({

        name : '',
        pass : '',
        creator : profile.user

    })

    const [pass, setPass] = useState(false)

    const [empty, setEmpty] = useState(false)

    const [disable, setDisable] = useState(false)

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {


        setMatch({...match,
            
                            [e.target.name] : e.target.value })


    }

    const createMatch = async (e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if(!match.name){

            setEmpty(true)

        } else {

           const response = await newMatch(profile, match)

           if(response.data.message==='name already exist') {

                    alert('el nombre de sala ya existe')
           } else{

                //pasar a página de sala

           }

        }


    }

    const passActive = () =>{

        setPass(pass!)

    }

    return(

        

        <div className='container-Match'>

            <form onSubmit={createMatch}>

                    <label>Nombre de Sala</label>
                    <input type="text" name='name' placeholder='nombre de sala' maxLength={10} value={match.name} onChange={onChange}/>

                    <label>Contraseña (opcional)</label>
                    <input type="text" name='pass' placeholder='contraseña' maxLength={10} value={match.pass} disabled={disable}  onChange={onChange}/>

                    {empty && 'No puede crear sala si no completa los datos necesarios'}

                    <input type="submit" value='crear'/>

            </form>
            
           
        </div>


    )


}

export default CreateMatch