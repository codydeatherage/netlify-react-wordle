import React from 'react'
import styled, { keyframes, css } from 'styled-components'
const Card = styled.div`
    height: 58px;
    min-width: 58px;
    line-height: 58px;
    perspective: 1000px;
    div:nth-child(2){
        transform: rotateX(-180deg);
    }
`
const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 1.0s;
    transform-style: preserve-3d;
    transition-delay: ${props => props.delay};
    transform: ${props => props.flipped ? 'rotateX(-180deg)' : 'rotateX(0)'};
    div {
        position: absolute;
        backface-visibility: hidden; 
    }
`
const scale = keyframes`
    from{ 
        transform: scale(1.3);
    }
    to{
        transform: scale(1.0);
    }
`
/*https://styled-components.com/docs/basics*/
const animation = () => css`
    ${scale} 0.4s ease;
`
export const Tile = styled.div`
    height: 58px;
    outline: 2px solid #3A3A3C;
    width: 100%;
    color: white;
    font-size: 36px;
    animation: ${props => props.filled && animation};
    transition:  background-color 1.2s;
    outline-color: ${props => props.bg ? props.bg : '#3A3A3C'};
    font-weight: bold;
    background-color: ${props => props.bg}
`

export const FlippingTile = ({ value, flippedBg, isFlipped, index, shake }) => {
    const delay = `${index + 2 * index}00ms`;
    return (
        <Card>
            <Container flipped={isFlipped} bg={isFlipped ? flippedBg : 'none'} delay={delay}>
                <Tile filled={value !== '' && !shake}>{value}</Tile>
                <Tile bg={isFlipped ? flippedBg : 'none'}>{value}</Tile>
            </Container>
        </Card>
    )
}
