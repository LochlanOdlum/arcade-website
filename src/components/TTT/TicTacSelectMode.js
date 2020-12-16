import React, { useState } from "react";
import "../../styling/TTT/TicTacSelectMode.css";
import ErrorNotif from "../General/ErrorNotif";


const TicTacSelectMode = props => {
  const [currentNick, setCurrentNick] = useState("");
  const [displayError, setDisplayError] = useState(false);


  const onInputChange = event => {
    if (event.target.value.length < 12) {
      setCurrentNick(event.target.value);
    }
  };

  const onOnlineClick = () => {

    if (!currentNick && !displayError) {
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 5000);
    } else if (!currentNick) {
    } else {
      props.setOnlineNick(currentNick);
      props.setGameType("online");
    }
  };

  const onOfflineFriendClick = () => {
    props.setGameType("offlineFriend");
  };
  const onOfflineBotClick = () => {
    props.setGameType("offlineBot");
  };

  const renderError = () => {
    if (displayError) {
      return <ErrorNotif text="You must enter a nickname to play Online!" />;
    }
  };

  return (
    <>
      {renderError()}
      <div className="ttt-pop-up">
        <div className="ttt-pop-up-container">
          <div className="ttt-pop-up-title">
            <span className="ttt-title-yellow">T</span><span className="ttt-title-red">I</span><span className="ttt-title-yellow">C</span>
            <span className="ttt-title-red"> T</span><span className="ttt-title-yellow">A</span><span className="ttt-title-red">C </span>
            <span className="ttt-title-yellow">T</span><span className="ttt-title-red">O</span><span className="ttt-title-yellow">E</span></div>

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
              Play Online!
            </div>

            <div className="ttt-offline-container">
              or{" "}
              <div
                className="ttt-play"
                id="ttt-play-offline"
                onClick={onOfflineFriendClick}
              >
                Offline vs Friend!
              </div>
            </div>

            <div className="ttt-offline-container">
              <div
                className="ttt-play"
                id="ttt-play-offlineBot"
                onClick={onOfflineBotClick}
              >
                Offline vs Bot!
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TicTacSelectMode;
