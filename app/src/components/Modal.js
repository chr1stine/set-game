import React from 'react';
import { useSelector } from 'react-redux';
import { gameRestarted } from '../redux/gameSlice';

const Modal = () => {
  const { timeEnd, timeStart } = useSelector((state) => state.game);
  const { setCount, hintCount } = useSelector((state) => state.board);
  console.log('sdfsdf');
  function computePlayTime(timeStart, timeEnd) {
    let timeSpent = (timeEnd - timeStart) / 1000; // в секундах
    let hh = timeSpent > 3600 ? timeSpent / 3600 : 0;
    timeSpent %= 3600;
    let mm = timeSpent > 60 ? timeSpent / 60 : 0;
    timeSpent %= 60;
    let ss = timeSpent;
    return `${hh != 0 ? `${hh}ч ` : '' + mm != 0 ? `${mm}м ` : '' + `${ss}с`}`;
  }

  return (
    <div id="modal">
      <div className="modal__content">
        <h3>Игра пройдена!</h3>
        <p>{`Счёт: ${setCount}`}</p>
        <p>{`Подсказок запрошено: ${hintCount}`}</p>
        <p>{`Времени пройдено: ${timeEnd != null ? computePlayTime(timeStart, timeEnd) : ''}`}</p>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(gameRestarted());
          }}>
          Ещё раз
        </button>
      </div>
    </div>
  );
};

export default Modal;
