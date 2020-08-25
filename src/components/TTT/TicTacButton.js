import React from "react";
import "../../styling/GameButton.css";
import {Link} from 'react-router-dom';

const TicTacButton = () => {

  return (
    <>
      <Link className="nostyle" to="/ttt">
        <div className="game-button">
          <div className="icon">
            <img className="icon" src="/images/ttt-board-invert.png" alt="tic tac toe board" />
          </div>

          <div className="text">
            <h2 className="game-button-title">Tic-Tac-Toe</h2>
          </div>
        </div>
      </Link>
    </>
  );
};

export default TicTacButton;
