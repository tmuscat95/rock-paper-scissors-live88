import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Bet } from '../../Types';
import Decimal from 'decimal.js';
import { D } from '../../Functions';
import { GameState, RockPaperScissors } from '../../Enum';
import { BET_AMOUNT } from '../../Constants';

const betTypeSet = new Set(Object.values(RockPaperScissors));

export interface GameplayState {
  currentBet: Bet;
  currentBetTotal: Decimal;
  gameState: GameState
  balance: Decimal;
  currentWinnings: Decimal;
  totalWinnings: Decimal;
  currentWinner: RockPaperScissors | null; // Added to track the current winner
}
export const initialState: GameplayState = {
  currentBet: {
    [RockPaperScissors.ROCK]: D(0),
    [RockPaperScissors.PAPER]: D(0),
    [RockPaperScissors.SCISSORS]: D(0),
  },
  currentBetTotal: D(0), //never use number for money; floating point precision issues
  gameState: GameState.BETTING,
  balance: D(5000),
  currentWinnings: D(0),
  totalWinnings: D(0),
  currentWinner: null,
};
const gameplaySlice = createSlice({
  name: 'gameplay',
  initialState,
  reducers: {
    setBet(state, action: PayloadAction<Bet>) {
      state.currentBet = action.payload;
      state.currentBetTotal = D(action.payload[RockPaperScissors.ROCK]).plus(action.payload[RockPaperScissors.PAPER]).plus(action.payload[RockPaperScissors.SCISSORS]);
    },
    resetBet(state) {
      state.currentBet = initialState.currentBet;
      state.currentBetTotal = initialState.currentBetTotal;
    },
    addWinnings(state, action: PayloadAction<Decimal>) {
      state.currentWinnings = action.payload;
      state.totalWinnings = state.totalWinnings.plus(action.payload);
    },
    setGameState(state, action: PayloadAction<GameState>) {
      state.gameState = action.payload;
      if(action.payload === GameState.BETTING) {
        state.currentBet = initialState.currentBet;
        state.currentBetTotal = D(0);
        state.currentWinnings = D(0);
        state.currentWinner = null;
      }
    },
    setWinner(state, action: PayloadAction<RockPaperScissors | null>) {
      state.currentWinner = action.payload;
    },
    placeBet(state, action: PayloadAction<{ type: RockPaperScissors; amount: Decimal }>) {
      const { type, amount } = action.payload;
      const otherBetTypes = Object.values(RockPaperScissors).filter(t => t !== type);

      if(otherBetTypes.every((t) => state.currentBet[t].gt(0))){
        console.warn(`Cannot place bet on all 3 at once`);
        alert(`Cannot place bet on all 3 at once`);
        return;
      }
      /**
       * Maybe in the future you want to make Rock, Paper,Scissors, Lizard, Spock, or something, this way no need to rewrite this logic
       */
      if(otherBetTypes.every((t) => state.currentBet[t].gt(0))){
        console.warn(`Cannot place bet on all 3 at once`);
        alert(`Cannot place bet on all 3 at once`);
        return;
      } 

      if (state.balance.gte(amount)) {
        state.currentBet[type] = state.currentBet[type].plus(amount);
        state.balance = state.balance.minus(amount);
      }else {
        console.warn(`Insufficient balance`);
        alert(`Insufficient balance`);
        return;
      }
    },
    undoBet(state, action: PayloadAction<RockPaperScissors>) {
      if(state.currentBet[action.payload].eq(0)) return;
      state.currentBet[action.payload] = state.currentBet[action.payload].minus(BET_AMOUNT);
      if (state.currentBet[action.payload].lt(0)) {
        state.currentBet[action.payload] = D(0);
      }
      state.balance = state.balance.plus(BET_AMOUNT);
      state.currentBetTotal = D(state.currentBet[RockPaperScissors.ROCK])
        .plus(state.currentBet[RockPaperScissors.PAPER])
        .plus(state.currentBet[RockPaperScissors.SCISSORS]);
    }
  },
});

export const GamePlayActions = gameplaySlice.actions;
export default gameplaySlice.reducer;