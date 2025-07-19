import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Bet } from '../../Types';
import Decimal from 'decimal.js';
import { D } from '../../Functions';
import { GameState, RockPaperScissors } from '../../Enum';

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
    rock: D(0),
    paper: D(0),
    scissors: D(0),
  },
  currentBetTotal: D(0),
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
      state.currentBetTotal = D(action.payload.rock).plus(action.payload.paper).plus(action.payload.scissors);
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
    }
  },
});

export const GamePlayActions = gameplaySlice.actions;
export default gameplaySlice.reducer;