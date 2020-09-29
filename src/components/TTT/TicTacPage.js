import React, { useState } from "react";
import SmallHeader from "../SmallHeader";
import TicTacSelectMode from "./TicTacSelectMode";
import "../../styling/TTT/TicTacPage.css";
import TicTacOfflineFriendPage from "./TicTacOfflineFriendPage";
import TicTacOnlinePage from "./TicTacOnlinePage";
import TicTacOfflineBotPage from "./TicTacOfflineBotPage";

const TicTacPage = () => {
  const [onlineNick, setOnlineNick] = useState("");
  const [gameType, setGameType] = useState();

  if (!gameType) {
    return (
      <>
        <div className="ttt-page">
          <SmallHeader />
          {/*<ErrorNotif text={"testing hello 123"}/>*/}
          <TicTacSelectMode
            onlineNick={onlineNick}
            setOnlineNick={setOnlineNick}
            setGameType={setGameType}
          />
        </div>
      </>
    );
  }

  if (gameType === "offlineFriend") {
    return (
      <>
        <div className="ttt-page">
          <TicTacOfflineFriendPage />
        </div>
      </>
    );
  }
  if (gameType === "offlineBot") {
    return (
      <>
        <div className="ttt-page">
          <TicTacOfflineBotPage />
        </div>
      </>
    );
  }
  if (gameType === "online") {
    return (
      <>
        <div className="ttt-page">
          <TicTacOnlinePage name={onlineNick} />
        </div>
      </>
    );
  }
};

export default TicTacPage;
