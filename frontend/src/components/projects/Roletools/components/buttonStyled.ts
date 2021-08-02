import styled, { keyframes } from 'styled-components'


interface isLoading {
    readonly isLoading : boolean,

}
    

interface attr {
    readonly isLoading : boolean,
    readonly color : string,
    readonly background : string,
    readonly hover : string
}

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
}`


export const Button = styled.button<attr>`
                    position: relative;
                    color: ${({ color, isLoading, background }) => isLoading ? background : color};
                    border: none;
                    border-radius: 4px;
                    color: white;
                    margin: 12px;
                    width: fit-content;
                    height: fit-content;
                    cursor: ${({isLoading}) => isLoading ? 'normal' : 'pointer'};
                    cursor: ${({isLoading}) => isLoading ? 'normal' : 'hand'};
                    position: relative;
                    background-color: ${({ background, isLoading, hover}) => isLoading ? hover : background};   

                    &:hover{

                        background-color: ${({hover, isLoading}) => isLoading ? 'none' : hover}

                    }

                    
`

export const SpinnerLoad = styled.div<isLoading>`
            border: 4px solid gray;
            border-radius: 50%;
            border-top-color: black;
            opacity: ${({ isLoading }) => isLoading ? 1 : 0};
            position: absolute;
            left: 25%;
            right: 25%;
            top: 25%;
            bottom: 25%;
            margin: auto;
            width: 20px;
            height: 20px;
            transition: opacity 200ms;
            animation: ${rotate} 1s linear;
            animation-iteration-count: infinite;
            transition-delay: ${({ isLoading }) => isLoading ? '200ms' : '0ms'}

`

export const Text = styled.span<isLoading>`
            color: black;
            font-size: 20px;
            font-weight: bold;
            transition: opacity 200ms;
            transition-delay: ${({ isLoading }) => isLoading ? '0ms' : '200ms'};
            
            opacity: ${({ isLoading }) => isLoading ? 0 : 1};

`