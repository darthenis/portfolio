import styled, { css } from 'styled-components'


interface isActive{
    readonly isActive : boolean;
    readonly isRolled? : boolean;
    readonly isFirst? : boolean
}

interface active{
    readonly isActive : boolean;
}


export const UnitInit = styled.div<isActive>`
            display: flex;
            justify-content: space-around;
            background-color: ${props => props.isFirst ? '#00767C' : props.isActive ? '#00BDC7' : '#c8d6e5'};
            color: ${props => props.isFirst ? 'white' : 'black'};
            padding: 10px;
            height: 70px;
            margin-bottom: 5px;
            text-align: center;
            font-weight: bold;
            font-size: 15px;
            

            & > div {
                display:flex;
                height: 100%;
                width: 50%;
                flex-direction: column;
                justify-content: space-around;


                & > div > i {
                    color : ${props => props.isFirst ? 'white' : 'black'};
                    font-size: 20px;
                    cursor: hand;
                    cursor: pointer;
                    border-radius: 100%;
                    box-shadow: 1px 0px 5px rgb(0, 0, 0);

                    &:hover{
                        color : blue
                    }

                    &:active{

                        font-size:19px

                    }
                  
                }
            }

`


export const MonsterListDiv = styled.div<isActive>`

            border: solid 2px black;
            padding-top: 5px;
            display: flex;
            flex-direction: column;
            text-align: center;
            align-items: center;
            background-color: ${props => props.isActive ? '#00BDC7' : '#7f8c8d'};
            cursor: hand;
            cursor: pointer;

`

export const ButtonMonster = styled.button<active>`

                background-color: ${props => props.isActive ? 'white' : 'rgb(187, 187, 187)' };
                width: fit-content;
                height: fit-content;
                align-self: center;
                justify-self: center;
                padding: 5px;
                font-size: 20px;
                font-weight: bold;
                ${props => props.isActive && 'box-shadow: 1px 0px 5px rgb(0, 0, 0)'};
                

                ${props => props.isActive ? css`
                    cursor: hand;
                    cursor: pointer;
                    &:active{

                    font-size:19px;
                }

                ` : css`
                
                    color: gray;
                    `}

`