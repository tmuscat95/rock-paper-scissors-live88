import type Decimal from "decimal.js";

export type User = {
  id: string;
  name: string;
  email: string;
};


export type Bet = {
  rock: Decimal;
  paper: Decimal;
  scissors: Decimal;
};