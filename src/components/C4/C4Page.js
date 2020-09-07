import React, { useState } from "react";
import C4SelectMode from "./C4SelectMode";
import C4OfflinePage from "./C4OfflinePage";
import C4OnlinePage from "./C4OnlinePage";
import '../../styling/C4/C4Page.css';

const C4Page = () => {
  const [gameType, setGameType] = useState(null);
  const [onlineNick, setOnlineNick] = useState("");

  if (!gameType) {
    return (
      <div className="C4-page">
        <C4SelectMode setGameType={setGameType} setOnlineNick={setOnlineNick} />
      </div>
    );
  } else if (gameType === "online") {
    return (
      <div className="C4-page">
        <C4OnlinePage name={onlineNick} />
      </div>
    );
  }
  return (
    <div className="C4-page">
      <C4OfflinePage />
    </div>
  );
};

export default C4Page;
