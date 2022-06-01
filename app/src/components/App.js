import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from './Board';
import { gameFinished } from '../redux/gameSlice';
import { Modal } from './Modal';
import Sidebar from './Sidebar';
import ControlPanel from './ControlPanel';

const App = () => {
  // вытягивает из колоды следующие amount карт
  function pullNewCards(amount) {
    let cards = [];
    while (deck.cards.length > 0 && cards.length < amount) {
      cards.push(deck.cards.pop());
    }

    if (deck.cards.length === 0) {
      dispatch({ type: 'cards/finished' });
    }

    return cards;
  }

  const dispatch = useDispatch();
  const { deck, isGameOn, showModal } = useSelector((state) => state.game);
  //   const [cardsOnTable, setCardsOnTable] = useState([]); // выложенные на стол

  //   if (isGameOn) {
  //     // первичное выкладывание карт
  //     if (!cardsInitialized) {
  //       setCardsOnTable(pullNewCards(12));
  //       dispatch({ type: 'cards/initialized' });
  //     } else if (!gameFinished) {
  //       // убирание правильного сета, если собран, и выкладывание новых карт по надобности
  //       if (takenCards.length > 0) {
  //         let newCards = cardsOnTable.filter((c) => {
  //           return !_.includes(takenCards, c);
  //         });

  //         setCardsOnTable(newCards);

  //         dispatch({ type: 'set/taken' });
  //       }

  //       // доложить новых карт, если требуется и возможно
  //       if (cardsOnTable.length < 12 + extraCardsCount && !cardsFinished) {
  //         setCardsOnTable([...cardsOnTable, ...pullNewCards(3)]);
  //       }

  //       if (cardsOnTable.length === 0) {
  //         dispatch({ type: 'game/finished', payload: new Date() });
  //       }
  //     } else {
  //       // игра окончена
  //       dispatch({ type: 'game/finished', payload: new Date() });
  //     }
  //   }

  return (
    <div id="container">
      {showModal && <Modal />}
      {isGameOn && <Sidebar />}
      {isGameOn && <Board />}
      <ControlPanel />
    </div>
  );
};

export default App;
