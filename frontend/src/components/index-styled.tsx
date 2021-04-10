import styled, { keyframes, css } from 'styled-components'

interface activeEffect{
    readonly active : boolean;
    readonly disactive : boolean;
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


