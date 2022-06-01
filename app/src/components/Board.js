import React, { useEffect } from 'react';
import _ from 'lodash';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { cardsInitialized, correctSetBlinked } from '../redux/boardSlice';
import { gameFinished } from '../redux/gameSlice';

const Board = () => {
  const dispatch = useDispatch();
  const {
    selectedCards,
    hintedCards,
    wrongCards,
    takenCards,
    cardsOnTable,
    extraCardsCount,
    cardsFinished
  } = useSelector((state) => state.board);

  useEffect(() => {
    dispatch(cardsInitialized());
  }, []);

  useEffect(() => {
    async function removeCardsAfterBlinking() {
      await setTimeout(() => dispatch(correctSetBlinked()), 500);
    }
    if (takenCards.length > 0) removeCardsAfterBlinking();
  }, [takenCards]);

  useEffect(() => {
    if (cardsFinished) {
      dispatch(gameFinished({ datetime: new Date() }));
    }
  }, [cardsFinished]);

  return (
    <div id="board" className={`extra_${extraCardsCount}`}>
      {cardsOnTable.map((card) => {
        return (
          <Card
            hinted={_.includes(hintedCards, card)}
            key={JSON.stringify(card)}
            card={card}
            selected={selectedCards.some((c) => _.isEqual(c, card))}
            wrong={_.includes(wrongCards, card)}
            taken={takenCards.some((c) => _.isEqual(c, card))}
          />
        );
      })}
    </div>
  );
};

export default Board;
