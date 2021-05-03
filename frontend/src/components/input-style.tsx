import styled, {css} from 'styled-components'

//que alpedo ese doble interface jajaja corregier ESTO

interface effectError{
    readonly isActive : boolean | null;
}

export const Inputs = styled.input<effectError>`

        border: solid 3px transparent;

        &:focus{
            outline:none;
        }

        ${props => !props.isActive && css `
        
            border: solid 3px red; !important`}
            
`

export const Messageinvalid = styled.span<effectError>`
            position: relative;
            font-size:1em;        
            color: red;
            display: ${props => !props.isActive ? 'block' : 'none'};

`

export const Messageempty = styled.span<effectError>`
                position: relative;
                font-size:1em;
                color: red;
                display: ${props => props.isActive ? 'block' : 'none'}

`


