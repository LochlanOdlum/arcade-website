import React from "react";
import "../../styling/TTT/PlayerBox.css";

const PlayerBox = ({ side, name, game, id, value }) => {
  const borderClass = id === game.currentPlayer.id ? " player-box-border" : "";
  const renderMiniSquareValue = () => {
    if (value === "x") {
      return (
        <>
          <div className="ttt-player-box-value-container-cross">
            <div className="mini-cross mini-cross-up" />
            <div className="mini-cross mini-cross-down" />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="ttt-player-box-value-container-circle">
          <div className="mini-circle mini-circle-inner" />
          <div className="mini-circle mini-circle-outer" />
        </div>
      </>
    );
  };

  return (
    <span className={`player-box-container ${side}${borderClass}`}>
      <span className="ttt-user-icon-circle">
        <i className="fas fa-user fa-3x ttt-user-icon" />
      </span>
      <div className="ttt-player-box-name">{name}</div>
      {renderMiniSquareValue()}
    </span>
  );
};

export default PlayerBox;
