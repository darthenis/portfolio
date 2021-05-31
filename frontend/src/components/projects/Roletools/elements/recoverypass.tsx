import react, { useState } from 'react'
import './login.css'
import FormEmail from './recoveryformemail'
import FormCode from './recoveryformcode'




const Recovery = () => {


const [stateRecover, setStateRecover] = useState({

        formEmail : true,
        formCode : false
})

    

    return(

            <div className='login-container'>


                {stateRecover.formEmail && <FormEmail stateRecover={stateRecover} setStateRecover={setStateRecover}/>}
                {stateRecover.formEmail && <FormCode/>}
                
                            
            </div>

    )

}


export default Recovery