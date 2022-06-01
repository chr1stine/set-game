import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cardDeselected, cardSelected, wrongSetBlinked } from '../redux/boardSlice';

const Card = ({ selected, taken, hinted, wrong, card }) => {
  const dispatch = useDispatch();

  function drawCard() {
    const shapes = new Array(card.amount);
    for (let i = 1; i <= card.amount; i++) {
      shapes.push(
        <div
          key={`${card.shape} ${card.amount}_${i} ${card.shading} ${card.color}`}
          className={`shape ${card.shape} ${card.color}`}>
          <div className={`border_ ${card.shape} ${card.color} ${card.shading}`}></div>
        </div>
      );
    }
    return shapes;
  }

  useEffect(async () => {
    async function stopBlinkingAfterWait() {
      await setTimeout(() => dispatch(wrongSetBlinked(card)), 500);
    }
    if (wrong) stopBlinkingAfterWait();
  }, [wrong]);

  drawCard();

  return (
    <div
      onClick={() => {
        dispatch(selected ? cardDeselected({ card }) : cardSelected({ card }));
      }}
      className={`card_ ${taken ? 'taken' : ''} ${wrong ? 'wrong' : ''}`}>
      <div
        className={`card__clickable${selected ? ' selected' : ''}${wrong ? ' wrong' : ''}${
          hinted ? ' hinted' : ''
        }`}></div>

      <div className={`card__content`}>{drawCard()}</div>
    </div>
  );
};

export default Card;
