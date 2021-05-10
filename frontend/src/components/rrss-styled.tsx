import styled, {css, keyframes} from 'styled-components'

interface sendEmail {
    readonly emailSend : boolean
}

const movemail = keyframes`
                        0% {transform: rotate(0deg);}
                        25% {transform: rotate(-5deg);}
                        50% {transform: rotate(5deg);}
                        75% {transform: rotate(-5deg)}
                        100% {transform: rotate(0deg);}
                    `



export const Contact = styled.div<sendEmail>`


                ${props => props.emailSend && css`
                
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items:space-round;
                `}

`

export const Form = styled.form<sendEmail>`

            display: ${props => props.emailSend ? 'none' : 'grid' };
            grid-gap: .5rem;
            grid-template-columns: 50% 50%;
            grid-template-rows: 1fr 1fr 1fr;
            width: 80%;
            text-align: center;
            margin: 0 auto;
            margin-top: 2%;

            @media (max-width: 600px){
                display: flex;
                flex-direction: column;
            }


`

export const SendMail = styled.div<sendEmail>`

                display: ${props => props.emailSend ? 'block' :'none'};
                font-size: 2.5em;
                font-weight: bold;
                padding: 20%;
                color: rgb(82, 253, 125);;
                margin: o auto;
                

`

export const MessageSending = styled.div<sendEmail>`



                        & > i{

                            margin-top: 1%;
                            margin-bottom: 2%;
                            font-size: 3em;
                            color: ${props => props.emailSend ? 'yellow' : 'green'};
                            animation: ${props => props.emailSend ? 'none' : movemail} 1.2s infinite;;

                        }




`

