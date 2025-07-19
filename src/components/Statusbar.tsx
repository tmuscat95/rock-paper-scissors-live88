import React from 'react'
import classes from '../styles/statusbar.module.scss';
import { useGameplaySelector } from '../app/store';
type Props = {}

const Statusbar = (props: Props) => {
  const [balance, currentBetTotal] = useGameplaySelector(gp => [gp.balance, gp.currentBetTotal]);
  return (
    <div className={classes.statusBar}>
      <div className={classes.balance}>Balance: ${balance.toString()}</div>
      <div className={classes.currentBetTotal}>Current Bet: ${currentBetTotal.toString()}</div>
    </div>
  )
}

export default Statusbar