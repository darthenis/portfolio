import styled from 'styled-components'

interface loading {

    readonly loadactive : boolean;
}



export const MotosDiv = styled.div<loading>`

        cursor: ${props => props.loadactive ? 'wait' : 'pointer'};
        cursor: ${props => props.loadactive ? 'wait' : 'hand'};


    `