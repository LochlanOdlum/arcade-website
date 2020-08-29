import React, { useState } from "react";

const C4SelectMode = ({ setGameType, setOnlineNick }) => {
  const [currentNick, setCurrentNick] = useState('');

  const onNickChange = (nick) => {
    setCurrentNick(nick);
  };

  const onOfflineClick = () => {
    setGameType('offline')
  };

  const onOnlineClick = () => {
    setGameType('online');
    setOnlineNick(currentNick);
  };


  return (
    <div className="C4-select-container">
      <div className="C4-select-text">Connect 4!</div>
      <input
        placeholder="Nick"
        type="text"
        value={currentNick}
        onChange={(e) => onNickChange(e.target.value)}
      />
      <div className="C4-play C4-play-online" onClick={onOnlineClick}>
        Play Online!
      </div>
      or
      <div className="C4-play C4-play-offline" onClick={onOfflineClick}>
        Play offline!
      </div>
    </div>
  );
};

export default C4SelectMode;
