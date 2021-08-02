import react, { Dispatch, SetStateAction, useState } from 'react'
import RecoveryCode from './recoveryCode'
import RecoveryEmail from './recoveryEmail'
import RecoveryPass from './recoveryPass'
import PassUpdated from './recoveryUpdated'
import './recoverAccount.css'




const Recovery = (props : {loadPage : any, setLoadPage : Dispatch<SetStateAction<any>>} ) => {

    const [recoverPages, setRecoverPages] = useState({

            email : true,
            code : false,
            pass : false,
            passUpdated : false
    })

    const [data, setData] = useState({
                                         email : ''
                                        
                                        })


    return (
        <div id='main-recoverAccount-roletools'>

             <div>

                {recoverPages.email && <RecoveryEmail input={data} setInput={setData} login={props.loadPage} setLogin={props.setLoadPage} page={recoverPages} setPage={setRecoverPages}></RecoveryEmail>}

                {recoverPages.code && <RecoveryCode page={recoverPages} setPage={setRecoverPages}></RecoveryCode>}
           
                {recoverPages.pass && <RecoveryPass email={data.email} page={recoverPages} setPage={setRecoverPages}></RecoveryPass>}

                {recoverPages.passUpdated && <PassUpdated page={props.loadPage} setPage={props.setLoadPage}></PassUpdated>}

            </div>

        </div>
)

}


export default Recovery