import React, { createContext, useEffect, useReducer } from 'react'
import allowed from './allowed.txt'

const initialState = {
    answer: '',
    guesses: [],
    currentGuess: [],
    flipped: [false, false, false, false, false, false],
    shake: 0,
    keys: [],
    modalOpen: false,
    attempts: 0
}

export const GameContext = createContext(initialState);

function reducer(state, action) {
    const { value, type } = action;
    switch (type) {
        case 'ADD_ANSWER': return { ...state, answer: value }
        case 'ADD_TO_CURRENT_GUESS': return { ...state, currentGuess: [...state.currentGuess, value] , shake: 0}
        case 'DELETE_FROM_CURRENT_GUESS': return { ...state, currentGuess: state.currentGuess.filter((curr, i) => i !== state.currentGuess.length - 1), shake: 0}
        case 'ADD_NEW_GUESS': return { ...state, guesses: [...state.guesses, value], shake: false }
        case 'TOGGLE_FLIPPING': return { ...state, flipped: state.flipped.map((f, index) => index === state.attempts ? !f : f), attempts: state.attempts + value, currentGuess: [] }
        case 'SHAKE_ROW': return {...state, shake: state.shake + 1}
        case 'SHOW_MODAL': return { ...state, modalOpen: true }
        case 'HIDE_MODAL': return { ...state, modalOpen: false }
        default: return state;
    }
}

const GameState = ({ children }) => {
    const [gameInfo, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchWords = async () => {
            let allowedGuesses = '';
            await fetch(allowed)
                .then((res) => res.text())
                .then(text => { allowedGuesses = text.split(/\r?\n/) });
            getNewAnswer(allowedGuesses)
        }

        const getNewAnswer = (arr) => {
            const rand = Math.floor(Math.random() * arr.length)
            console.log('New Answer', arr[rand].toUpperCase())
            dispatch({ type: 'ADD_ANSWER', value: arr[rand].toUpperCase() })
        }
        if (!gameInfo.answer) {
            fetchWords();
        }
    }, [gameInfo.answer])

    return (
        <GameContext.Provider value={{ dispatch, shake: gameInfo.shake, modalOpen: gameInfo.modalOpen, currentGuess: gameInfo.currentGuess, guesses: gameInfo.guesses, answer: gameInfo.answer, flipped: gameInfo.flipped, attempts: gameInfo.attempts, shakeRow: gameInfo.shakeRow }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameState