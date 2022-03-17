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

                top: 100px;

            }

`
const slideOff = keyframes`
            from{
                
                top: 100px;
            
            }
            to{

                top:-1000px;

            }

`


export const Nav = styled.nav<activeEffect>`
        @media only screen and (max-width: 840px){
                position: fixed;
                background-color: rgb(10, 17, 31); 
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

    color: aqua;
    position: relative;
    height: fit-content;
    font-size: 15px;
    font-family: 'Lucida Sans';
    letter-spacing: 2px;
    border: none;
    padding: 10px 10px 0px 10px; ;
    outline: none;
    transition-duration: .5s;
    cursor: pointer;
    cursor: hand;

    &:after{

        display:block;
        content: '';
        margin-top: 10px;
        border-bottom: solid 3px #06deff;  
        transform: scaleX(${props => props.active ? '1' : '0'});  
        transition: transform 350ms ease-in-out;

    }    


    &:hover:after{
        transform: scaleX(1); 
    }


`

