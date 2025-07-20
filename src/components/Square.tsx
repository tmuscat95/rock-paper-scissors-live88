import React from "react";
import classes from "../styles/squares.module.scss";
import { useGameplaySelector } from "../app/store";
import { RockPaperScissorsOptions } from "../Enum";
import Chip from "./Chip";
import { useDispatch } from "react-redux";
import { GamePlayActions } from "../app/gameplay/gameplaySlice";
import { BET_AMOUNT } from "../Constants";
import { D } from "../Functions";

const Square = ({ type }: { type: RockPaperScissorsOptions }) => {
  const [gameState, isWinner] = useGameplaySelector((gp) => [
    gp.gameState,
    gp.roundWinningChoice === type,
  ]);
  const _bet = useGameplaySelector((gp) => gp.currentBet[type]);
  const dispatch = useDispatch();
  const bet = D(_bet);
  const placeBet = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.ctrlKey) {
      if (!bet.greaterThan(0)) return;
      dispatch(GamePlayActions.undoBet(type));
    } else
      dispatch(
        GamePlayActions.placeBet({ type, amount: BET_AMOUNT.toString() }),
      );
  };

  return (
    <div
      onClick={gameState === "BETTING" ? placeBet : undefined}
      className={`${classes.square} ${classes[type.toLowerCase()]} ${classes[gameState.toLowerCase()]} ${classes[isWinner ? "winner" : ""]}`}
    >
      {type.toUpperCase()}
      <Chip bet={bet} />
    </div>
  );
};

const Squares = () => {
  return (
    <div className={classes.squares}>
      <Square type={RockPaperScissorsOptions.ROCK} />
      <Square type={RockPaperScissorsOptions.PAPER} />
      <Square type={RockPaperScissorsOptions.SCISSORS} />
    </div>
  );
};

export default Squares;
