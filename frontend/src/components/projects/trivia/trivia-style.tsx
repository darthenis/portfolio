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
                background-color: rgb(126, 250, 250);
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
                    }
            `}

`

const Button = styled.button`
                      color: black;
                      background-color: rgb(126, 252, 250);
                      border-radius: 10px;
                      

                      &:hover{
                      box-shadow: 0px 0px 25px rgb(126, 250, 250);
                          -webkit-box-shadow: 0px 0px 25px rgb(126, 250, 250);
                          -moz-box-shadow: 0px 0px 25px rgb(126, 250, 250);
                      }

`

export {Opciones, ButtonNext, Button}
