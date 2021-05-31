import React, { HTMLFactory } from 'react'
import react, { useState } from 'react'
import { checkCodeRecovery } from './roletoolsservice'




const FormCode = () => {

    const [code, setCode] = useState<number>(0)

    const changeCode = (e : React.FormEvent<HTMLInputElement>) => {

       const num = parseInt(e.currentTarget.value)

       setCode(num)

    }

    const checkCode = async () => {

        const reponse = await checkCodeRecovery(code)

        if(reponse) {}

    }


    return(


            <form onSubmit={checkCode}>

                    <input type="number" value={code} onChange={changeCode}/>

                    <input type="submit" value='Enviar' />

            </form>



    )
}

export default FormCode;