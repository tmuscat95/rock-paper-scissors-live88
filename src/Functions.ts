import { Decimal } from "decimal.js";
import { Results, RockPaperScissorsOptions as RockPaperScissorsOptions } from "./Enum";

export const D = (n: Decimal.Value) => new Decimal(n);

export function doRockPaperScissors(playerChoice: RockPaperScissorsOptions, computerChoice: RockPaperScissorsOptions): Results {
  if (playerChoice === computerChoice) {
    return Results.DRAW;
  }

  switch (playerChoice) {
    case RockPaperScissorsOptions.ROCK:
      return computerChoice === RockPaperScissorsOptions.SCISSORS ? Results.WIN : Results.LOSE;
    case RockPaperScissorsOptions.PAPER:
      return computerChoice === RockPaperScissorsOptions.ROCK ? Results.WIN : Results.LOSE;
    case RockPaperScissorsOptions.SCISSORS:
      return computerChoice === RockPaperScissorsOptions.PAPER ? Results.WIN : Results.LOSE;
  }
} 

export function selectOptionRandom(): RockPaperScissorsOptions {
  const options = Object.values(RockPaperScissorsOptions);
  return options[Math.floor(Math.random() * options.length)]; //I know you can't use Math.random() in prod for iGaming applications.
}

export const sleep = (t:number) => new Promise(resolve => setTimeout(resolve, t));