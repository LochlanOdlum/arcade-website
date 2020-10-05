import React from "react";
import TicTacButton from "./TTT/TicTacButton";
import C4Button from "./C4/C4Button";
import "../styling/GameSelection.css";
import SnakeButton from "./Snake/SnakeButton";

const GameSelection = () => {
  return (
    <div className="game-block">
      <div className="game-grid-container">
        <TicTacButton />
        <C4Button/>
        <SnakeButton />
        <C4Button/>
        <TicTacButton />
      </div>
    </div>
  );
};

export default GameSelection;
