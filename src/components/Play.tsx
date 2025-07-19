import React from 'react'
import classes from '../styles/playbutton.module.scss';
import { useGameplaySelector } from '../app/store';
import { GameState } from '../Enum';
type Props = {}

const Play = (props: Props) => {
  const [gameState, currentBetTotal] = useGameplaySelector(gp => [gp.gameState, gp.currentBetTotal]);
  return (
    <div className={`${classes.play} ${gameState === GameState.BETTING && currentBetTotal.greaterThan(0) ? classes.active : ''}`}>
      <span>Play</span>
    </div>
  )
}

export default Play