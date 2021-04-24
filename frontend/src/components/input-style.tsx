import styled, {css} from 'styled-components'



interface effecterror{
    readonly isActive : boolean | null;
}

interface effectempty {
    readonly isEmpty : boolean | null;
}

export const Inputs = styled.input<effecterror>`

        border: solid 3px transparent;

        &:focus{
            outline:none;
        }

        ${props => !props.isActive && css `
        
            border: solid 3px red; !important`}
            
`

export const Messageinvalid = styled.span<effecterror>`
            position: relative;
            font-size:1em;        
            color: red;
            display: ${props => !props.isActive ? 'block' : 'none'};

`

export const Messageempty = styled.span<effectempty>`
                position: relative;
                font-size:1em;
                color: red;
                display: ${props => props.isEmpty ? 'block' : 'none'}

`


