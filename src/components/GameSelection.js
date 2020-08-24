import React from "react";
import TicTacButton from "./TTT/TicTacButton";
import "../styling/GameSelection.css";

const GameSelection = () => {
  return (
    <div className="game-block">
      <div className="game-grid-container">
        <TicTacButton />
        <TicTacButton />
        <TicTacButton />
        <TicTacButton />
        <TicTacButton />
      </div>
    </div>
  );
};

export default GameSelection;
