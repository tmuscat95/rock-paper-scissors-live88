import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/appSlice";
import gameplayReducer from "./gameplay/gameplaySlice";
import { useSelector as baseUseSelector } from "react-redux";

import type { AppState } from "./app/appSlice";
import type { GameplayState } from "./gameplay/gameplaySlice";

export const store = configureStore({
  reducer: {
    gameplay: gameplayReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = <T>(selector: (state: AppState) => T) => {
  const app = baseUseSelector((state: RootState) => state.app);
  return selector(app);
};

export const useGameplaySelector = <T>(
  selector: (state: GameplayState) => T,
) => {
  const gameplay = baseUseSelector((state: RootState) => state.gameplay);
  return selector(gameplay);
};
