import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { NavBar } from './NavBar'
import { KeyBoard } from './KeyBoard'
import { BoardRow } from './BoardRow'
import { GameContext } from './GameState'
import { Snackbar, Dialog, Box, Button } from '@mui/material'
import GameArea from './GameArea'
import Grow from '@mui/material/Grow'

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
  const { shake, answer, flipped, modalOpen, dispatch, guesses, modalMsg, attempts, dialogOpen, dialogType } = useContext(GameContext);

  useEffect(() => {
    if (attempts === 6) {
      dispatch({ type: 'SHOW_DIALOG', value: 'lose' })
    }
  }, [attempts])
  return (
    <Container>
      <NavBar />
      <Dialog
        open={dialogOpen}

      >{
          dialogType !== '' &&
          <Box sx={{ height: '200px', width: '200px', backgroundColor: '#121213', textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {dialogType === 'lose' &&
              <>
                <h4 style={{ color: 'white' }}>{'The correct answer was:'}</h4>
                <h1 style={{ color: 'white', marginTop: 0 }}>{answer}</h1>
              </>
            }

            <Button variant='outlined' sx={{ marginTop:  dialogType === 'win' ? '40%' : 0 }} onClick={() => dispatch({ type: 'RESET_GAME' })}>
              {(dialogType === 'win' && 'New game?') || (dialogType === 'lose' && 'Try again?')}
            </Button>
          </Box>
        }


      </Dialog>
      <Snackbar
        open={modalOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => dispatch({ type: 'HIDE_MODAL' })}
        TransitionComponent={GrowTransition}
        message={modalMsg}
        key='Grow'
        sx={{ textAlign: 'center', width: '100%', marginTop: '6vh', '& .MuiPaper-root': { minWidth: 0, backgroundColor: 'white', color: 'black', fontWeight: 'bold' } }}
      />
      <GameArea>
        <Board>
          {/* <p style={{ color: 'white' }}>Current Guess: {currentGuess}</p> */}
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
