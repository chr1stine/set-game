import reducer from './rootReducer';
import { createStore } from 'redux';

const store = createStore(reducer);

store.subscribe(() => {
  let state = store.getState();
  if (state.collectedSet) {
    store.dispatch({ type: 'set' });
  }
});

export default store;
