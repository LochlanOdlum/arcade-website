import React from "react";
import "../../styling/TTT/TicTacPlayerBox.css";
import "../../styling/General/PlayerBox.css";

const TicTacPlayerBox = ({ side, name, game, id, value, playerType }) => {
  const iconName = playerType === 'user' ? '/images/user-icon.svg' : '/images/bot-icon.svg';
  const iconClassName = playerType === 'user' ? 'user' : 'bot';

  const borderClass = id === game.currentPlayer.id ? " player-box-border" : "";
  const renderMiniSquareValue = () => {
    if (value === "x") {
      return (
        <img
          className="ttt-player-box-icon"
          alt="small red cross"
          src="/images/ttt-cross.svg"
        />
      );
    }

    return (
      <img
        className="ttt-player-box-icon"
        alt="small yellow circle"
        src="/images/ttt-circle.svg"
      />
    );
  };

  return (
    <span className={`ttt player-box-container ${side}${borderClass}`}>
      <span className={`${iconClassName}-icon-circle`}>
        <img className={`svg-${iconClassName}-icon`} alt="user icon" src={iconName} />
      </span>
      <div className="player-box-name">{name}</div>
      {renderMiniSquareValue()}
    </span>
  );
};

export default TicTacPlayerBox;
