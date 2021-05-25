import styled, { keyframes, css } from 'styled-components'

interface activeMsg{
    readonly isActive : boolean | undefined,
    readonly chatActive : boolean | undefined
}

interface activemenu{
    readonly isActive : boolean,
    readonly isOff    : boolean
}


const newMsg = keyframes`
                        0% {background-color: rgb(0, 247, 255)}
                        100% {background-color: none}
`

const deslizarin = keyframes`

                        from {left: -1000px}

                        to {left: 0px}
`

const deslizaroff = keyframes`

                        from {left: opx}

                        to {left: -1000px}

`


export const List = styled.div<activeMsg>`

                cursor: hand;
                cursor: pointer;
                background-color: ${props => props.chatActive ? 'rgb(173, 173, 173)' : 'none' };
                color: ${props => props.chatActive ? 'black' : 'white'};
                margin: 5px 0px 5px 0px;
                padding: 5px 0px 5px 0px;
                animation: ${props => props.isActive ? newMsg : 'none' } .5s infinite;

                &:hover{
                    background: rgb(173, 173, 173);
                    color: black;
                }

`


export const ListUsers = styled.div<activemenu>`

                ${props => props.isActive && css`
                        animation-name: ${deslizarin};
                        animation-duration: 1s;
                        animation-fill-mode: forwards;
                        
                `}
                ${props => props.isOff && css`
                
                        animation-name: ${deslizaroff};
                        animation-duration: 1s;
                        animation-fill-mode: forwards;
                        
                        `}

`