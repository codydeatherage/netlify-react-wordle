import React, { useContext } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { GameContext } from './GameState'
import { FlippingTile, Tile } from './FlippingTile'
/*
YELLOW : #B59F3B
GRAY: #3A3A3C
GREEN: #538D4E
*/
const shake = keyframes`
    10%,
    90% {
        transform: translate(-2px, 0px);
    }
    20%,
    80% {
        transform: translate(4px, 0px);
    }
    30%,
    50%,
    70% {
        transform: translate(-8px, 0px);
    }
    40%,
    60% {
        transform: translate(8px, 0px);
    }
`
const shakeAnimation = () => css`
    ${shake} 600ms linear;
`
const Row = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
    width: 100%;
    animation: ${props => props.shake && shakeAnimation}
`

export const BoardRow = ({ rowIndex, shake }) => {
    const appContext = useContext(GameContext);
    const filledWord = [];
    const word = rowIndex === appContext.attempts ? appContext.currentGuess : appContext.guesses[rowIndex];
    for (let i = 0; i < 5; i++) {
        if (word && word[i]) {
            filledWord.push(word[i]);
        }
        else {
            filledWord.push('');
        }
    }
    return (
        <Row shake={shake}>
            {filledWord.map((letter, index) =>
                letter.length > 0 ?
                    <FlippingTile
                        key={index + letter}
                        isFlipped={appContext.flipped[rowIndex]}
                        value={letter}
                        shake={shake}
                        flippedBg={appContext.answer.includes(letter) ?
                            appContext.answer[index] === letter ? '#538D4E' : '#B59F3B' : '#3A3A3C'}
                        index={index}
                    />
                    :
                    <Tile key={index} />
            )}
        </Row>
    )
}
