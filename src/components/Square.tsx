import React from 'react'
import classes from '../styles/squares.module.scss';
import { useGameplaySelector } from '../app/store';
import { RockPaperScissors } from '../Enum';
import Chip from './Chip';
type Props = {}

//@ts-ignore


const Square = ({type}: {type: RockPaperScissors}) => {
  const [gameState, isWinner] = useGameplaySelector(gp => [gp.gameState,gp.currentWinner === type]);
  const bet = useGameplaySelector(gp => gp.currentBet[type]);

  return (
    <div className={`${classes.square} ${classes[type.toLowerCase()]} ${classes[gameState.toLowerCase()]} ${classes[isWinner ? 'winner' : '']}`}>{type.toUpperCase()}<Chip bet={bet} /></div>
  )
}




const Squares = (props: Props) => {
  return (
    <div className={classes.squares}>
        <Square type={RockPaperScissors.ROCK} />
        <Square type={RockPaperScissors.PAPER} />
        <Square type={RockPaperScissors.SCISSORS} />
      </div>
  )
}

export default Squares;

