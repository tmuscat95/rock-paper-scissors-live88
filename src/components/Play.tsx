import React from 'react'
import classes from '../styles/playbutton.module.scss';
import { useGameplaySelector } from '../app/store';
import { GameState } from '../Enum';
import { useDispatch } from 'react-redux';
import { GamePlayActions } from '../app/gameplay/gameplaySlice';
import { D } from '../Functions';
type Props = {}

const Play = (props: Props) => {
  const [gameState, currentBetTotal] = useGameplaySelector(gp => [gp.gameState, gp.currentBetTotal]);
  const dispatch = useDispatch();
  const canPlay = gameState === GameState.BETTING && D(currentBetTotal).greaterThan(0);
  const canReset = gameState === GameState.WINNINGS;

  const startPlay = () => {
    dispatch(GamePlayActions.play());
  }

  const reset = () => {
    dispatch(GamePlayActions.setGameState(GameState.BETTING));
  }

  return (
    <div onClick={canPlay ? startPlay : canReset ? reset : undefined} className={`${classes.play} ${canPlay || canReset ? classes.active : ''}`}>
      <span>{canReset ? "Clear" : "Play" }</span>
    </div>
  )
}

export default Play