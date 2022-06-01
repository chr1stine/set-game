import { createSlice } from '@reduxjs/toolkit';
import { rules } from '../game/logic';
import { Deck } from '../game/deck';

const initialState = {
  timeStart: null,
  timeEnd: null,
  rules: rules,
  isGameOn: false,
  showModal: false
};

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    gameStarted: (state, action) => {
      state.isGameOn = true;
      const { datetime } = action.payload;
      state.timeStart = datetime.getTime();
      console.log(`game sarted at ${state.timeStart}`);
    },
    gameFinished: (state, action) => {
      state.isGameOn = false;
      const { datetime } = action.payload;
      state.timeEnd = datetime.getTime();
      state.showModal = true;
      console.log(`game finished at ${state.timeEnd}`);
    },
    gameRestarted: (state, action) => {
      return initialState;
    }
  }
});
export const { gameStarted, gameFinished, gameRestarted } = slice.actions;

export default slice.reducer;
