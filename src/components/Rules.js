import React from 'react';
import { rules } from '../game/logic';

const Rules = () => {
  return (
    <div className="container">
      <div
        style={{
          top: 200,
          width: 400
        }}>
        <h1>Правила игры "Сет"</h1>
        <p>{rules}</p>
      </div>
    </div>
  );
};

export default Rules;
