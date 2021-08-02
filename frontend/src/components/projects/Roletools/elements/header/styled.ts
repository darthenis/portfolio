import styled, { css } from "styled-components";


interface Active{
    readonly isActive : boolean
}


export const List = styled.ul<Active>`

            display: ${props => props.isActive ? 'inline' : 'none'};
            background: white;
            color: black;
            position: absolute;
            white-space: nowrap;
            text-align: center;
            cursor: hand;
            cursor: pointer;
            margin: 0;


`

export const Element = styled.li`
                min-width:80px;
                padding: 5px;

                &:hover{
                    background: aqua;
                }

`


export const Button = styled.button<Active>`
                min-width: 80px;
                padding: 5px;
                text-align:center;
                font-size: 20px;
                cursor:hand;
                cursor:pointer;
                background:black;
                color:white;
                border-bottom: solid 2px black;

                ${props => !props.isActive && css`
                
                        &:hover{
                            border-bottom: solid 2px white;
                        }
                
                `}

                


`