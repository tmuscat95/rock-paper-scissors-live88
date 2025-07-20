import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Bet } from "../../Types";
import Decimal from "decimal.js";
import { D, doRockPaperScissors, selectOptionRandom } from "../../Functions";
import { GameState, Results, RockPaperScissorsOptions } from "../../Enum";
import {
  BET_AMOUNT,
  PAYOUT_MULTIPLIER_1_BET,
  PAYOUT_MULTIPLIER_2_BETS,
} from "../../Constants";

export interface GameplayState {
  currentBet: Bet;
  currentBetTotal: string;
  gameState: GameState;
  balance: string;
  currentWinnings: string;
  totalWinnings: string;
  roundWinningChoice?: RockPaperScissorsOptions;
  computerChoice?: RockPaperScissorsOptions;
  playerDidWin?: boolean;
}
export const initialState: GameplayState = {
  currentBet: {
    [RockPaperScissorsOptions.ROCK]: D(0).toString(),
    [RockPaperScissorsOptions.PAPER]: D(0).toString(),
    [RockPaperScissorsOptions.SCISSORS]: D(0).toString(),
  },
  currentBetTotal: D(0).toString(), //never use number for money; floating point precision issues
  gameState: GameState.BETTING,
  balance: D(5000).toString(),
  currentWinnings: D(0).toString(),
  totalWinnings: D(0).toString(),
  roundWinningChoice: undefined,
  computerChoice: undefined,
  playerDidWin: undefined,
};
const gameplaySlice = createSlice({
  name: "gameplay",
  initialState,
  reducers: {
    setBet(state, action: PayloadAction<Bet>) {
      state.currentBet = action.payload;
      state.currentBetTotal = D(action.payload[RockPaperScissorsOptions.ROCK])
        .plus(action.payload[RockPaperScissorsOptions.PAPER])
        .plus(action.payload[RockPaperScissorsOptions.SCISSORS])
        .toString();
    },
    resetBet(state) {
      state.currentBet = initialState.currentBet;
      state.currentBetTotal = initialState.currentBetTotal;
    },
    addWinnings(state, action: PayloadAction<Decimal>) {
      state.currentWinnings = action.payload.toString();
      state.totalWinnings = D(state.totalWinnings)
        .plus(action.payload)
        .toString();
    },
    setGameState(state, action: PayloadAction<GameState>) {
      if (action.payload === GameState.BETTING) {
        state.playerDidWin = undefined;
        state.balance = D(state.balance).plus(state.currentWinnings).toString();
        state.currentWinnings = D(0).toString();
        state.currentBet = initialState.currentBet;
        state.currentBetTotal = D(0).toString();
        state.roundWinningChoice = undefined;
        state.computerChoice = undefined;
      }
      if (action.payload === GameState.WINNINGS) {
        let numberOfBets = Object.values(state.currentBet).filter((bet) =>
          D(bet).gt(0),
        ).length;
        if (numberOfBets === 0) return;

        let returnAmount = D(0);
        let win = false;
        let result = Results.LOSE;
        for (const [key, bet] of Object.entries(state.currentBet)) {
          if (D(bet).gt(0)) {
            result = doRockPaperScissors(
              key as RockPaperScissorsOptions,
              state.computerChoice!,
            );
            if (result === Results.WIN) {
              win = true;
              state.roundWinningChoice = key as RockPaperScissorsOptions;
              break;
            } else {
              state.roundWinningChoice = state.computerChoice!;
            }
          }
        }

        if (win) {
          if (numberOfBets === 1) {
            returnAmount = D(state.currentBetTotal).times(
              PAYOUT_MULTIPLIER_1_BET,
            );
          } else if (numberOfBets === 2) {
            returnAmount = D(state.currentBetTotal).times(
              PAYOUT_MULTIPLIER_2_BETS,
            );
          }
        } else if (numberOfBets === 1 && result === Results.DRAW) {
          returnAmount = D(state.currentBetTotal);
        }
        state.playerDidWin = win;
        state.currentWinnings = returnAmount.toString();
        state.totalWinnings = D(state.totalWinnings)
          .plus(returnAmount)
          .toString();
      }

      state.gameState = action.payload;
    },

    placeBet(
      state,
      action: PayloadAction<{ type: RockPaperScissorsOptions; amount: string }>,
    ) {
      if (D(action.payload.amount).lte(0)) {
        return;
      }
      const { type, amount } = action.payload;
      const otherBetTypes = Object.values(RockPaperScissorsOptions).filter(
        (t) => t !== type,
      );

      /**
       * Maybe in the future you want to make Rock, Paper,Scissors, Lizard, Spock, or something, this way no need to rewrite this logic just adjust the enum.
       */
      if (otherBetTypes.every((t) => D(state.currentBet[t]).gt(0))) {
        console.warn(`Cannot place bet on all 3 at once`);
        alert(`Cannot place bet on all 3 at once`);
        return;
      }

      if (D(state.balance).gte(amount)) {
        state.currentBet[type] = D(state.currentBet[type])
          .plus(amount)
          .toString();
        state.balance = D(state.balance).minus(amount).toString();
        state.currentBetTotal = D(
          state.currentBet[RockPaperScissorsOptions.ROCK],
        )
          .plus(state.currentBet[RockPaperScissorsOptions.PAPER])
          .plus(state.currentBet[RockPaperScissorsOptions.SCISSORS])
          .toString();
      } else {
        console.warn(`Insufficient balance`);
        alert(`Insufficient balance`);
        return;
      }
    },
    undoBet(state, action: PayloadAction<RockPaperScissorsOptions>) {
      if (D(state.currentBet[action.payload]).eq(0)) return;
      state.currentBet[action.payload] = D(state.currentBet[action.payload])
        .minus(BET_AMOUNT)
        .toString();
      if (D(state.currentBet[action.payload]).lt(0)) {
        state.currentBet[action.payload] = D(0).toString();
      }
      state.balance = D(state.balance).plus(BET_AMOUNT).toString();
      state.currentBetTotal = D(state.currentBet[RockPaperScissorsOptions.ROCK])
        .plus(state.currentBet[RockPaperScissorsOptions.PAPER])
        .plus(state.currentBet[RockPaperScissorsOptions.SCISSORS])
        .toString();
    },
    play(state) {
      if (D(state.currentBetTotal).eq(0)) return;
      state.computerChoice = selectOptionRandom();
      state.gameState = GameState.PLAYING;
    },
  },
});

export const GamePlayActions = gameplaySlice.actions;
export default gameplaySlice.reducer;
