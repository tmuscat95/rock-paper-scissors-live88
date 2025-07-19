import React from 'react'
import classes from '../styles/Game.module.scss';
import Square from './Square';
import Play from './Play';
import Messages from './Messages';
import { RockPaperScissors } from '../Enum';


const Game = () => {
  return (
    <>
    <div className={classes.game}>
      <Messages/>
      <div className={classes.squares}>
        <Square type={RockPaperScissors.ROCK} />
        <Square type={RockPaperScissors.PAPER} />
        <Square type={RockPaperScissors.SCISSORS} />
      </div>
      <Play />
    </div>
    </>
  )
}

export default Game