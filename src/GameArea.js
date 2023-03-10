import React, { useEffect, useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import { GameContext } from './GameState'
import allowed from './allowed.txt'
import Grow from '@mui/material/Grow';

const GameContainer = styled.div`
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding-top: 8rem;
    margin: auto;
    text-align: center;
    align-items: center;
    justify-content: center;
`
function GrowTransition(props) {
    return <Grow {...props} />;
}

let allowedGuesses = '';
fetch(allowed)
    .then((res) => res.text())
    .then(text => { allowedGuesses = text.split(/\r?\n/) });

function binarySearch(arr, key) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] === key) {
            return mid;
        } else if (arr[mid] < key) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return -1;
}

const specialKeys = [
    'SHIFT',
    'CAPSLOCK',
    'DELETE',
    'CONTROL',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
    'INSERT',
    'DELETE',
    'END',
    'HOME',
    'PAGEUP',
    'PAGEDOWN',
    'TAB',
    'ALT',
    'NUMLOCK',
    'PAUSE',
    'SCROLLLOCK',
    'AUDIOVOLUMEUP',
    'AUDIOVOLUMEDOWN',
    'AUDIOVOLUMEMUTE',
    'MEDIASTOP',
    'LAUNCHMEDIAPLAYER',
    'LAUNCHAPPLICATION1',
    'LAUNCHAPPLICATION2'

]

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}

export const deleteGuess = (currentGuess, dispatch) => {
    if (currentGuess.length > 0) {
        dispatch({ type: 'DELETE_FROM_CURRENT_GUESS' })
    }
}

export const submitGuess = (currentGuess, answer, attempts, dispatch) => {
    if (currentGuess.length === 5) {//guess is 5 chars long
        if (currentGuess.join('').toString().toUpperCase() === answer) {//guess is correct
            dispatch({ type: 'SHOW_MODAL', value: 'Congratulations! You solved it!' });
            dispatch({ type: 'SHOW_DIALOG', value: 'win' })
        }
        const guess = currentGuess.join('').toString().toLowerCase();
        const guessCheck = binarySearch(allowedGuesses, guess);

        if (guessCheck > 0) {//guess is valid
            dispatch({ type: 'TOGGLE_FLIPPING', value: 1 });
            dispatch({ type: 'ADD_NEW_GUESS', value: currentGuess });
        }
        else {//guess is invalid
            dispatch({ type: 'SHAKE_ROW' })
            dispatch({ type: 'SHOW_MODAL', value: 'Invalid submission' })
        }
    }
    else {//guess is not long enough
        dispatch({ type: 'SHAKE_ROW' })
        dispatch({ type: 'SHOW_MODAL', value: 'Not enough letters' })
    }
}

export const addLetter = (input, currentGuess, dispatch) => {
    if (isLetter(input) && currentGuess.length < 5 && specialKeys.indexOf(input.toUpperCase()) === -1) {
        /*     console.log('A key was pressed', currentGuess.length, input); */
        dispatch({ type: 'ADD_TO_CURRENT_GUESS', value: input.toUpperCase() })
    }
}

const GameArea = ({ children }) => {
    const ref = useRef(null)
    const { answer, currentGuess, dispatch, attempts } = useContext(GameContext);

    const handleKeyDown = (event) => {
        switch (event.key.toUpperCase()) {
            case 'BACKSPACE': return deleteGuess(currentGuess, dispatch)
            case 'ENTER': return submitGuess(currentGuess, answer,attempts, dispatch)
            default: return addLetter(event.key, currentGuess, dispatch)
        }
    }

    useEffect(() => {
        ref.current.focus()
    }, [])

    return (
        <GameContainer
            ref={ref}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {children}
        </GameContainer>
    )
}

export default GameArea