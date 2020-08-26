import React, { useState } from "react";
import "../../styling/TTT/TicTacSelect.css";
import ErrorNotif from "../ErrorNotif";

const TicTacSelect = props => {
  const [currentNick, setCurrentNick] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [enableTimeOut, setEnableTimeOut] = useState(true);

  const renderError = () => {
    if (displayError === true) {
      if (enableTimeOut) {
        setEnableTimeOut(false);
        setTimeout(() => {
          setDisplayError(false);
          setEnableTimeOut(true);
        }, 5000);
      }
      return <ErrorNotif text="You must enter a nickname to play Online!" />;
    }
  };

  const onInputChange = event => {
    if (event.target.value.length < 12) {
      setCurrentNick(event.target.value);
    }
  };

  const onOnlineClick = () => {
    if (currentNick === "") {
      setDisplayError(true);
    } else {
      props.setOnlineNick(currentNick);
      props.setGameType("online");
    }
  };

  const onOfflineClick = () => {
    props.setGameType("offline");
  };

  return (
    <>
      {renderError()}
      <div className="ttt-pop-up">
        <div className="ttt-pop-up-container">
          <div className="ttt-pop-up-title">Tic-Tac-Toe</div>

          <div className="ttt-pop-up-center-block">
            <input
              value={currentNick}
              onChange={onInputChange}
              className="ttt-nickname"
              placeholder="Nick"
            />

            <div
              className="ttt-play"
              id="ttt-play-online"
              onClick={onOnlineClick}
            >
              Play Online
            </div>

            <div className="ttt-offline-container">
              or{" "}
              <div
                className="ttt-play"
                id="ttt-play-offline"
                onClick={onOfflineClick}
              >
                Play Offline
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicTacSelect;
