import React from "react";
import "../../styling/C4/C4PlayerBox.css";
import "../../styling/PlayerBox.css";

const TicTacPlayerBox = ({ side, name, game, id, value }) => {
  const borderClass = id === game.currentPlayer.id ? " player-box-border" : "";

  const renderMiniSquareValue = () => {
    if (value === "red") {
      return (
        <>
          <div className="ttt-player-box-value-container-cross">
            <div className="c4-mini-piece-red c4-mini-piece" />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="ttt-player-box-value-container-circle">
          <div className="c4-mini-piece-yellow c4-mini-piece" />
        </div>
      </>
    );
  };

  return (
    <span className={`C4 player-box-container ${side}${borderClass}`}>
      <span className="user-icon-circle">
        <img alt="user icon" src="/images/user-icon.svg"/>
      </span>
      <div className="player-box-name">{name}</div>
      {renderMiniSquareValue()}
    </span>
  );
};

export default TicTacPlayerBox;


