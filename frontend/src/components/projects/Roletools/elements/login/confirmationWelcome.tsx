import React from 'react'
import { verifyUser } from '../../service/roletoolsservice'
import { Link, RouteComponentProps } from "react-router-dom";
import './confirmationWelcome.css'


type TParams = { confirmation: string };


const Welcome = ({ match } : RouteComponentProps<TParams>) => {

    if(match.path === '/roletools/confirm/:confirmation'){

        verifyUser(match.params.confirmation)
    }


    return (
        <div id="container-confirmation">
          <div>
            <h3>
              <strong>¡Cuenta Confirmada!</strong>
            </h3>
          
            <div id='pretext-link'>
               ¡Ya puede &nbsp;  
               <Link id='link-login' to={"/roletools"}>
                 logearse!
               </Link>
            </div>
          </div>
        </div>
      );

}

export default Welcome;