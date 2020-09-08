import React, { useState } from "react";
import SmallHeader from "../SmallHeader";
import TicTacSelectMode from "./TicTacSelectMode";
import "../../styling/TTT/TicTacPage.css";
import TicTacOfflinePage from "./TicTacOfflinePage";
import TicTacOnlinePage from "./TicTacOnlinePage";

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

  if (gameType === "offline") {
    return (
      <>
        <div className="ttt-page">
          <TicTacOfflinePage />
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
