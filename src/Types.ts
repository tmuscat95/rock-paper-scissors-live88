import type Decimal from "decimal.js";
import type { RockPaperScissors } from "./Enum";

export type User = {
  id: string;
  name: string;
  email: string;
};


export type Bet = {
  [key in RockPaperScissors]: Decimal;
};