import React, { useState } from "react";
import "../../styling/C4/C4SelectMode.css";
import SmallHeader from "../General/SmallHeader";
import ErrorNotif from "../General/ErrorNotif";

const C4SelectMode = ({ setGameType, setOnlineNick }) => {
  const [currentNick, setCurrentNick] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const onNickChange = nick => {
    setCurrentNick(nick);
  };

  const onOfflineClick = () => {
    setGameType("offline");
  };

  const onOfflineBotClick = () => {
    setGameType('offlineBot')
  };

  const onOnlineClick = () => {
    if (!currentNick && !displayError) {
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 5000);
    } else if (!currentNick) {
    } else {
      setGameType("online");
      setOnlineNick(currentNick);
    }
  };

  const renderError = () => {
    if (displayError) {
      return <ErrorNotif text="You must enter a nickname to play Online!" />;
    }
  };

  return (
    <>
      {renderError()}
      <SmallHeader />
      <div className="C4-select-container">
        <div className="C4-select-text">
          <div className="C4-title-yellow">C</div>
          <div className="C4-title-red">O</div>
          <div className="C4-title-yellow">N</div>
          <div className="C4-title-red">N</div>
          <div className="C4-title-yellow">E</div>
          <div className="C4-title-red">C</div>
          <div className="C4-title-yellow">T </div>
          <div className="C4-title-red">4</div>
        </div>
        <input
          className="C4-nick-input"
          placeholder="Nick"
          type="text"
          value={currentNick}
          onChange={e => onNickChange(e.target.value)}
        />
        <div className="C4-play C4-play-online" onClick={onOnlineClick}>
          Play Online!
        </div>
        <div className="C4-or-text">or</div>
        <div className="C4-play C4-play-offline" onClick={onOfflineClick}>
          Offline vs Friend!
        </div>
        <div className="C4-play C4-play-offlineBot" onClick={onOfflineBotClick}>
          Offline vs Bot!
        </div>
      </div>
    </>
  );
};

export default C4SelectMode;
