import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { GameContext } from './GameState'
import { addLetter, deleteGuess, submitGuess } from './GameArea'

const Container = styled.div`
  height: 200px;
  width: 450px;
  margin: auto;
  margin-top: 5em;
  color: white;
`

const Row = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  gap: 5px;
  margin: 5px auto;
`

const LetterKey = styled.div`
  height: 100%;
  flex: 1;
  background-color: ${props => props.bg ? props.bg : '#818384'};
  border-radius: 5%;
  line-height: 58px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
`

const SpecialKey = styled(LetterKey)`
  min-width: 72px;
`

const Key = ({ val, colors }) => {
  const foundVal = colors.find((el) => el.val === val);
  const { currentGuess, answer, attempts, dispatch } = useContext(GameContext);

  return val === 'ENTER' || val === 'BACK' ?
    <SpecialKey
      bg='#818384'
      key={val}
      onClick={
        () => val === 'ENTER' ?
          submitGuess(currentGuess, answer, attempts, dispatch)
          :
          deleteGuess(currentGuess, dispatch)
      }
    >{val}</SpecialKey>
    :
    <LetterKey
      key={val}
      bg={(colors && foundVal) ? foundVal.color : '#818384'}
      onClick={() => addLetter(val, currentGuess, dispatch)}
    >{val}</LetterKey>
}

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
];

export const KeyBoard = () => {
  const { guesses, answer } = useContext(GameContext);

  const keyColors = useMemo(() => {
    const colors = [];
    for (let guess of guesses) {
      const newGuess = guess.map((letter, index) =>
        answer.includes(letter) ?
          answer[index] === letter ?
            { val: letter, color: '#538D4E' }//GREEN: #538D4E
            :
            { val: letter, color: '#B59F3B' }//YELLOW : #B59F3B
          :
          { val: letter, color: '#3A3A3C' }//GRAY: #3A3A3C
      )
      for (let ng of newGuess) {
        const valMatch = colors.find(el => el.val === ng.val);
        const colorMatch = colors.find(el => el.color === ng.color);
        if (valMatch && colorMatch) {
          valMatch.color = ng.color;
        }
        else {
          colors.push(ng);
        }
      }
    }
    return colors;
  }, [guesses, answer])

  return (
    <Container>
      {keys.map((keyRow, index) =>
        /*identify second row since it is slightly shorter*/
        <Row key={index} style={{ maxWidth: keyRow[0] === 'A' ? '95%' : '100%' }}>
          {keyRow.map((val) =>
            <Key
              key={val}
              colors={keyColors}
              val={val}
            />
          )}
        </Row>
      )}
    </Container>
  )
}



