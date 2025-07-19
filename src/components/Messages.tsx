import React, { useEffect, useLayoutEffect, useRef } from 'react'
import classes from '../styles/messages.module.scss';
import { useGameplaySelector } from '../app/store';
import { GameState } from '../Enum';
import gsap from 'gsap';
import { D, selectOptionRandom, sleep } from '../Functions';
import 'animate.css';
import { useDispatch } from 'react-redux';
import { GamePlayActions } from '../app/gameplay/gameplaySlice';

type Props = {}

const Messages = (props: Props) => {
  const [gameState, currentBet, computerChoice, roundWinningChoice, currentWinnings, playerDidWin] = useGameplaySelector(gp => [gp.gameState, gp.currentBet, gp.computerChoice, gp.roundWinningChoice, gp.currentWinnings, gp.playerDidWin]);
  const computerChoiceSpanRef = useRef<HTMLSpanElement>(null)
  const computerChoiceDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  let message = <></>

  switch (gameState) {
    case GameState.BETTING:
      message = <div className={classes.betting}>Pick Your Positions</div>;
      break;
    case GameState.PLAYING:
      message = <div className={classes.playing}>
        <div ref={computerChoiceDivRef} className={classes.computerChoice}><span ref={computerChoiceSpanRef}></span></div>
        <div className={classes.vs}>VS</div>
        <div className={classes.playerChoices}>
          {Object.entries(currentBet).filter(([key, value]) => (D(value).gt(0))).map(([key, value]) => (
            <div key={key} className={classes.playerChoice}>
              <span>{key.toUpperCase()}</span> 
            </div>
          ))}
        </div>
      </div>;
      break;
    case GameState.WINNINGS:
      message = <div className={classes.winnings}>
        <div className={`${classes.won}`}>{`${roundWinningChoice?.toUpperCase()} WON`}</div>
        {playerDidWin && currentWinnings && D(currentWinnings).gt(0) && <div className={`${classes.amountWon}`}><span>YOU WIN: </span>{currentWinnings.toString()}</div>}
      </div>;
      break;
    default:
      break;
  }

  useLayoutEffect(() => {
    if(gameState === GameState.PLAYING && computerChoice && computerChoiceSpanRef.current) {
      gsap.to(computerChoiceSpanRef.current, {
        duration: 2.5,
        ease:'linear',
        gap: 0.40,
        onUpdate: () => {
          computerChoiceSpanRef.current!.textContent = selectOptionRandom();
        },
        onComplete: () => {
          computerChoiceSpanRef.current!.textContent = computerChoice;
          computerChoiceDivRef.current!.classList.add('animate__animated', 'animate__pulse');
          sleep(2500).then(() => {
            dispatch(GamePlayActions.setGameState(GameState.WINNINGS));
          });
        }
      });
    }
  }, [gameState, computerChoice]);
  return (
    <div className={`${classes.messages} ${classes[gameState]}`}>
      {message}
    </div>
  )
}

export default Messages