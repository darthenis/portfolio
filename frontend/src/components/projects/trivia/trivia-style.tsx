import styled, {css} from 'styled-components';

interface effectNext{
  readonly isactive : boolean | null
}


const Opciones = styled.div<effectNext>`

                width: 90%;
                margin: 0 auto;
                margin-bottom:1%;
                text-align: center;
                padding: 2%;
                border-radius: 10px;
                border: solid 2px black;

                ${props => !props.isactive && css `
                  &:hover{
                  box-shadow: 0px 0px 25px rgb(126, 250, 250);
                          -webkit-box-shadow: 0px 0px 25px rgb(126, 250, 250);
                          -moz-box-shadow: 0px 0px 25px rgb(126, 250, 250);
                  border: solid 2px blue;
                  }
                  `}

                @media (max-width: 840px){
                  font-size: 4em;
                }

`


const ButtonNext = styled.div<effectNext>`

          color: black;
          background-color: ${props => props.isactive ? 'rgb(124, 252, 0)' : 'gray'};
          border-radius: 10px;
          padding: 10% 20% 10% 20%;

          ${props=> props.isactive && css `

                    box-shadow: 0px 0px 25px rgb(126, 250, 250);
                          -webkit-box-shadow: 0px 0px 25px rgb(126, 250, 250);
                          -moz-box-shadow: 0px 0px 25px rgb(126, 250, 250);

                    &:hover{
                      background-color: #82E0AA;
                      color: black;
                      cursor: hand;
                      cursor: pointer;
                    }
            `}

            @media (max-width: 840px){

                font-size: 3em;
                margin-top: 100px
    
            }

`

const Button = styled.button`
                      color: black;
                      background-color: rgb(184, 247, 255);
                      border-radius: 10px;
                      font-family: Arial;
                      font-size: 1.5rem;
                      cursor: hand;
                      cursor: pointer;
                      padding: .4em;

                      

                      &:hover{
                      background-color: rgb(138, 187, 194);
                      box-shadow: 0px 0px 10px rgb(126, 250, 250);
                          -webkit-box-shadow: 0px 0px 10px rgb(126, 250, 250);
                          -moz-box-shadow: 0px 0px 10px rgb(126, 250, 250);
                      }

`


export {Opciones, ButtonNext, Button}
