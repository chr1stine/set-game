import { isEqual } from 'lodash';
import { isValidSet, rules } from '../game/logic';
import { Deck } from '../game/deck';
import { combineReducers } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import boardReducer from './boardSlice';
import _ from 'lodash';

const reducer = combineReducers({
  game: gameReducer,
  board: boardReducer
});

function reducer1(state = intitalState, action) {
  // карты закончились
  if (action.type === 'cards/finished') {
    state.cardsFinished = true;
    console.log(`cards finidhed!`);
  }

  // игра закончилась
  if (action.type === 'game/finished') {
    state.gameFinished = true;
    state.timeEnd = action.payload.getTime();
    console.log(`game finished at ${state.timeEnd}`);
  }

  if (action.type === 'game/restart') {
    state = {
      selectedCards: [],
      takenCards: [],
      collectedSet: false,
      validSet: false,
      cardsFinished: false,
      gameFinished: false,
      gameStarted: false,
      extraCardsCount: 0,
      cardsInitialized: false,
      hint: null,
      setCount: 0,
      hintCount: 0,
      timeStart: null,
      timeEnd: null,
      deck: null,
      rules: rules
    };
  }

  return state;
}

export default reducer;
