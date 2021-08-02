import React, { Dispatch, SetStateAction } from 'react'
import { Button } from '../../components/button'





const PassUpdated = (props: {page : any, setPage : Dispatch<SetStateAction<any>>}) => {


    const backLogin = () => {

            props.setPage({...props.page, recovery : false, login : true})


    }



        return (

                <>

                    <h2>  Contraseña Actualizada </h2>

                    <Button className='back-login-recover' onClick={backLogin}>Logearse</Button>


                    </>



        )

}


export default PassUpdated