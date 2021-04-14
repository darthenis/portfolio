import styled, { keyframes, css } from 'styled-components'

interface activeEffect{
    readonly active : boolean;
    readonly disactive : boolean;
}

interface menuActive{
    readonly active : boolean;
}

const slideIn = keyframes`

            from{ 
                
                top: -1000px;

            }
            to{

                top: 110px;

            }

`
const slideOff = keyframes`
            from{
                
                top: 110px;
            
            }
            to{

                top:-1000px;

            }

`


export const Nav = styled.nav<activeEffect>`
        @media only screen and (max-width: 840px){
                position: absolute;
                width: 100%;
                z-index:-1;
                top:-1000px;
                flex-direction: column;
                ${props => props.active && css `
                            animation-name: ${slideIn};
                            animation-duration: 1s;
                            animation-fill-mode: forwards;

                        `

                }

                ${props => props.disactive && css `
                        
                        animation-name: ${slideOff};
                        animation-duration: 1s;
                        animation-fill-mode: forwards;

                
                `}

        }
            

    `

export const ButtonNav = styled.button<menuActive>`

    background-color:  rgb(0, 26, 32);
    color: aqua;
    position: relative;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin: 1rem;
    height: fit-content;
    font-size: calc(.1rem + .7vw);
    letter-spacing: 2px;
    border: none;
    border-bottom: solid 2px ${props => props.active ? 'aqua' : 'rgb(0, 26, 32)'};
    outline: none;
    transition-duration: .5s;
    cursor: pointer;
    cursor: hand;



    &:hover {
        border-bottom: solid 2px aqua;
    }
}



`

