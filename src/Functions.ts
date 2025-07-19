import { Decimal } from "decimal.js";
import { Results, RockPaperScissors } from "./Enum";

export const D = (n: Decimal.Value) => new Decimal(n);

export function doRockPaperScissors(player1: RockPaperScissors, player2: RockPaperScissors): Results {
  if (player1 === player2) {
    return Results.DRAW;
  }

  switch (player1) {
    case RockPaperScissors.ROCK:
      return player2 === RockPaperScissors.SCISSORS ? Results.WIN : Results.LOSE;
    case RockPaperScissors.PAPER:
      return player2 === RockPaperScissors.ROCK ? Results.WIN : Results.LOSE;
    case RockPaperScissors.SCISSORS:
      return player2 === RockPaperScissors.PAPER ? Results.WIN : Results.LOSE;
  }
} 