import React, { useState } from "react";
import "../../styling/TTT/TicTacSelectPopUp.css";
import GreyBackground from '../GreyBackground';

const TicTacSelectPopUp = props => {
  const [currentNick, setCurrentNick] = useState("");

  const onInputChange = (event) => {
    if (event.target.value.length < 12) {
      setCurrentNick(event.target.value);
    }
  };

  const onOnlineClick = () => {
    props.setOnlineNick(currentNick);
    props.setGameType('online');
  };

  const onOfflineClick = () => {
    props.setGameType('offline');
  };

  return (
    <GreyBackground>
      <div className="ttt-pop-up">
        <div className="ttt-pop-up-container">
          <i className="fas fa-cog fa-2x"></i>
          <div className="ttt-pop-up-title">Tic-Tac-Toe</div>

          <div className="ttt-pop-up-center-block">
            <input
              value={currentNick}
              onChange={onInputChange}
              className="ttt-nickname"
              placeholder="Nick"
            />

            <div className="ttt-play" id="ttt-play-online" onClick={onOnlineClick}>
              Play Online
            </div>

            <div className="ttt-offline-container">
              or{" "}
              <div className="ttt-play" id="ttt-play-offline" onClick={onOfflineClick}>
                Play Offline
              </div>
            </div>
          </div>
        </div>
      </div>
    </GreyBackground>
  );
};

export default TicTacSelectPopUp;
