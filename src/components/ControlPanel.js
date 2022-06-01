import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { extraCardsRequested, hintRequested } from '../redux/boardSlice';
import { gameStarted } from '../redux/gameSlice';

const ControlPanel = () => {
  const dispatch = useDispatch();
  const { isGameOn } = useSelector((state) => state.game);
  const { cardsFinished, hintedCards, extraCardsCount, cardsOnTable } = useSelector(
    (state) => state.board
  );
  return (
    <div id="buttons">
      <button
        className="btn btn-outline-primary"
        disabled={isGameOn}
        onClick={() => {
          dispatch(gameStarted({ datetime: new Date() }));
        }}
        id="start_game">
        Начать игру
      </button>

      <button
        className={
          hintedCards?.length == 0 && !cardsFinished ? 'btn btn-primary' : 'btn btn-outline-primary'
        }
        disabled={extraCardsCount === 6 || !isGameOn || cardsFinished}
        onClick={() => {
          dispatch(extraCardsRequested());
        }}
        id="pull_extra_cards">
        Выложить три карты
      </button>

      <button
        className="btn btn-outline-primary"
        disabled={!isGameOn}
        onClick={() => {
          if (cardsFinished) {
            dispatch(gameFinished({ datetime: new Date() }));
          } else {
            //   dispatch({ type: 'hint', payload: cardsOnTable });
            dispatch(hintRequested({ cards: cardsOnTable }));
          }
        }}>
        Подсказка
      </button>
    </div>
  );
};

export default ControlPanel;
