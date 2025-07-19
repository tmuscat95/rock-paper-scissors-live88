import React from 'react'
import classes from '../styles/Game.module.scss';
import Play from './Play';
import Messages from './Messages';
import Squares from './Square';


const Game = () => {
  return (
    <>
    <div className={classes.game}>
      <Messages/>
      <Squares/>
      <Play />
    </div>
    </>
  )
}

export default Game