import React from 'react'
import classes from '../styles/messages.module.scss';
import { useGameplaySelector } from '../app/store';
import { GameState } from '../Enum';
type Props = {}

const Messages = (props: Props) => {
  const [gameState] = useGameplaySelector(gp => [gp.gameState]);

  let message = <></>

  switch (gameState) {
    case GameState.BETTING:
      message = <div className={classes.betting}>Pick Your Positions</div>;
      break;
    case GameState.PLAYING:
      // message = <div>Game is in progress!</div>;
      break;
    case GameState.WINNINGS:
      // message = <div>Results are in!</div>;
      break;
    default:
      // message = <div>Welcome to the game!</div>;
      break;
  }

  return (
    <div className={`${classes.messages} ${classes[gameState]}`}>
      {message}
    </div>
  )
}

export default Messages