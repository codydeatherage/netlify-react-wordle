import React, { useContext } from 'react'
import styled from 'styled-components'
import { NavBar } from './NavBar';
import { KeyBoard } from './KeyBoard'
import { BoardRow } from './BoardRow';
import { GameContext } from './GameState'
import Snackbar from '@mui/material/Snackbar';
import GameArea from './GameArea'
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';

const Container = styled.div`
  background-color: #121213;
  height: calc(100vh - 65px);
  width: 100vw;
  margin: 0;
  padding: 0;
  padding-top: 65px;
  overflow: hidden;
  font-family:'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
`

const Board = styled.div`
  height: 420px;
  width: 330px;
  margin: auto;    
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  box-sizing: border-box;
`
function GrowTransition(props) {
  return <Grow {...props} />;
}

const App = () => {
  const { shake, currentGuess, flipped, modalOpen, dispatch, guesses } = useContext(GameContext);

  return (
    <Container>
      <NavBar />
      <Snackbar
        open={modalOpen}
        onClose={() => dispatch({ type: 'HIDE_MODAL' })}
        TransitionComponent={GrowTransition}
        message="I love snacks"
        key='Grow'
      />
      <GameArea>
        <Board>
          <p style={{ color: 'white' }}>Current Guess: {currentGuess}</p>
          {flipped.map((_, index) =>
            <BoardRow
              shake={index === (guesses.length || 0) ? shake : 0}
              rowIndex={index}
              key={index + shake}
            />
          )}
        </Board>
        <KeyBoard />
      </GameArea>
    </Container>
  );
}

export default App;
