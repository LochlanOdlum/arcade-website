import React from "react";
import TicTacButton from "./TTT/TicTacButton";
import C4Button from "./C4/C4Button";
import "../styling/GameSelection.css";

const GameSelection = () => {
  return (
    <div className="game-block">
      <div className="game-grid-container">
        <TicTacButton />
        <C4Button/>
        <TicTacButton />
        <C4Button/>
        <TicTacButton />
      </div>
    </div>
  );
};

export default GameSelection;
