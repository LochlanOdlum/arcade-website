import React from "react";
import TicTacButton from './TTT/TicTacButton';
import '../styling/GameSelection.css';

const GameSelection = () => {

  return (
    //TODO: Center all games within flex box container
    <div className="game-container">
        <TicTacButton />
        <TicTacButton />
        <TicTacButton />
        <TicTacButton />
        <TicTacButton />
    </div>
  );
};

export default GameSelection;
