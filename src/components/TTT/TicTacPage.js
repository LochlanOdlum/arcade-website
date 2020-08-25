import React, { useState } from "react";
import TicTacBoard from "./TicTacBoard";
import TicTacHeader from "./TicTacHeader";
import TicTacSelectPopUp from "./TicTacSelectPopUp";
import "../../styling/TTT/TicTacPage.css";
import { displayGame} from "../../hooks/useTicTac";
import TicTacOfflinePage from "./TicTacOfflinePage";
import TicTacOnlinePage from './TicTacOnlinePage';

const game = null;

const TicTacPage = () => {
  const [onlineNick, setOnlineNick] = useState("");
  const [gameType, setGameType] = useState();

  if (!gameType) {
    return (
      <>
        <div className="ttt-page">
        <TicTacHeader />
        <TicTacSelectPopUp
          onlineNick={onlineNick}
          setOnlineNick={setOnlineNick}
          setGameType={setGameType}
        />
        <TicTacBoard game={game || displayGame} />
        </div>
      </>
    );
  }

  if (gameType === "offline") {

    return (
      <>
        <div className="ttt-page">
        <TicTacOfflinePage/>
        </div>
      </>
    );
  }
  if (gameType === 'online') {
    return (
     <>
       <div className="ttt-page">
       <TicTacOnlinePage name={onlineNick}/>
       </div>
     </>
    )
  }
};

export default TicTacPage;
