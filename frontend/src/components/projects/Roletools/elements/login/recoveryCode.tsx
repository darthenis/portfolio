import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ButtonLoading from '../../components/buttonLoading'
import { checkingCode } from '../../service/roletoolsservice'



type code = {
    string : string,
    validation : boolean | null
}

const RecoveryCode = (props : {page : any, setPage : Dispatch<SetStateAction<any>>}) => {

    const [code, setCode] = useState<code>({
        string : '',
        validation : null
    })

    const [loading, setLoading] = useState(false)

    const [endLoading, setEndLoading] = useState(false)

    useEffect(() => {
        
        if(endLoading){
            setEndLoading(true)
            setLoading(true)
        }

    })


    const onChangeCode = (e : React.FormEvent<HTMLInputElement>) => {

        const newCode = e.currentTarget.value

        setCode({...code, string : newCode})

    }

    const checkCode = async () => {

        setLoading(true)

        const response = await checkingCode(code.string)

        setEndLoading(true)

        switch (response.data.message){
                 case 'valid':
                     setCode({...code, validation : true})
                     props.setPage({...props.page, code : false, pass : true })
                     break;
                 case 'invalid':
                     setCode({...code, validation : false})
        }

    }

    const backPage = () => {


        props.setPage({...props.page, code : false, email : true})

    }

    return(
        <>
                
                    <input type="text" value={code.string} placeholder='escriba el codigo' onChange={onChangeCode} />

                    
                    <ButtonLoading  isLoading={loading} 
                                                            insideText='Enviar' 
                                                            color='black' 
                                                            background='white' 
                                                            hover='#00F3FF' 
                                                            onClick={checkCode}/>



            
            <button className='back-login-recover' onClick={backPage}> volver </button>

            {code.validation===false && 'código inválido'}

        </>

    )


}


export default RecoveryCode