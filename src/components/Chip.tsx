import React from 'react'
import classes from '../styles/chip.module.scss';
import type { RockPaperScissors } from '../Enum';
import { useGameplaySelector } from '../app/store';
import type Decimal from 'decimal.js';


const Chip = ({bet}: {bet: Decimal}) => {
  return (
    <>
      {bet && bet.greaterThan(0) && <div className={classes.chip}>{bet.toString()}</div>}
    </>
  )
}

export default Chip