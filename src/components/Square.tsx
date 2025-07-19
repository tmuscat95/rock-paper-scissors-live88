import React, { useCallback } from 'react'
import classes from '../styles/squares.module.scss';
import { useGameplaySelector } from '../app/store';
import { RockPaperScissors } from '../Enum';
import Chip from './Chip';
import { useDispatch } from 'react-redux';
import { GamePlayActions } from '../app/gameplay/gameplaySlice';
import { BET_AMOUNT } from '../Constants';
type Props = {}

//@ts-ignore


const Square = ({type}: {type: RockPaperScissors}) => {
  const [gameState, isWinner] = useGameplaySelector(gp => [gp.gameState,gp.currentWinner === type]);
  const bet = useGameplaySelector(gp => gp.currentBet[type]);
  const dispatch = useDispatch();

  const placeBet = (e: React.MouseEvent<HTMLDivElement>)=>{
    e.stopPropagation();
    e.preventDefault();
    if(e.ctrlKey) {
      if(!bet.greaterThan(0)) return;
      dispatch(GamePlayActions.undoBet(type));
    } else 
      dispatch(GamePlayActions.placeBet({ type, amount: BET_AMOUNT }));
  }

  return (
    <div onClick={gameState === 'BETTING' ? placeBet : undefined} className={`${classes.square} ${classes[type.toLowerCase()]} ${classes[gameState.toLowerCase()]} ${classes[isWinner ? 'winner' : '']}`}>{type.toUpperCase()}<Chip bet={bet} /></div>
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

