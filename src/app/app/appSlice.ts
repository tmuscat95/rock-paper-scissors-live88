import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../Types';


export interface AppState {
  isAuthenticated: boolean;
  user?: User;
  name: string;
}

const initialState: AppState = {
  name: 'rock-paper-scissors',
  isAuthenticated: true, // Assuming default is true for the sake of example
  user: {
    id: '1',
    name: 'Timothy Muscat',
    email: 'timothy.muscat@example.com'
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = undefined;
    },
  },
});

export const AppActions = appSlice.actions;
export default appSlice.reducer;
