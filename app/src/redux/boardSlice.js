import { createSlice } from '@reduxjs/toolkit';
import { isValidSet, findSet } from '../game/logic';
import { Deck } from '../game/deck';

const slice = createSlice({
  name: 'board',
  initialState: {
    selectedCards: [],
    takenCards: [],
    wrongCards: [],
    cardsOnTable: [],
    hintedCards: [],
    deck: null,
    cardsFinished: false,
    extraCardsCount: 0,
    setCount: 0,
    hintCount: 0
  },
  reducers: {
    cardsInitialized: (state, action) => {
      state.deck = new Deck();
      state.cardsOnTable = state.deck.cards.splice(0, 12);
    },
    cardSelected: (state, action) => {
      const { card } = action.payload;
      if (state.selectedCards.length > 2) {
        throw Error('4th card selected');
      }
      state.selectedCards = [...state.selectedCards, card];

      if (state.selectedCards.length === 3) {
        if (isValidSet(state.selectedCards)) {
          state.takenCards = state.selectedCards;
          state.selectedCards = [];
        } else {
          state.wrongCards = state.selectedCards;
          state.selectedCards = [];
        }
      }
    },
    cardDeselected: (state, action) => {
      const { card } = action.payload;
      state.selectedCards = state.selectedCards.filter((c) => c != card);
    },
    extraCardsRequested: (state, action) => {
      if (state.extraCardsCount === 6) {
        throw Error('max extra cards exceeded');
      }

      if (state.cardsFinished) {
        throw Error('not enough cards to pull extra');
      }

      state.extraCardsCount += 3;

      state.cardsOnTable = [...state.cardsOnTable, ...state.deck.cards.splice(0, 3)];
      if (state.deck.cards.length === 0) state.cardsFinished = true;
    },
    hintRequested: (state, action) => {
      state.hintCount += 1;
      const { cards } = action.payload;
      state.hintedCards = findSet(cards); // подсказка, что среди выложенных карт нет сета
    },
    wrongSetBlinked: (state, action) => {
      state.wrongCards = [];
    },
    correctSetBlinked: (state, action) => {
      state.cardsOnTable = state.cardsOnTable.filter((c) => !_.includes(state.takenCards, c));
      if (state.extraCardsCount === 0) {
        const newCards = state.deck.cards.splice(0, 3);
        if (state.deck.cards.length === 0) state.cardsFinished = true;
        state.cardsOnTable = [...state.cardsOnTable, ...newCards];
      }
      state.takenCards = [];
    }
  }
});

export const {
  hintRequested,
  extraCardsRequested,
  cardSelected,
  cardDeselected,
  wrongSetBlinked,
  correctSetBlinked,
  cardsInitialized
} = slice.actions;

export default slice.reducer;
