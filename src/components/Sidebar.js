import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { setCount, hintCount } = useSelector((state) => state.board);

  return (
    <div id="sidebar">
      <h4>
        <Link to="/rules">
          {/* <Link to="/rules" target="_blank"> */}
          Правила
        </Link>
      </h4>
      <h2>Счёт: {setCount}</h2>
      <h2>Подсказок: {hintCount}</h2>
    </div>
  );
};

export default Sidebar;
