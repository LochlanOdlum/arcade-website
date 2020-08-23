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
        <TicTacHeader />
        <TicTacSelectPopUp
          onlineNick={onlineNick}
          setOnlineNick={setOnlineNick}
          setGameType={setGameType}
        />
        <TicTacBoard game={game || displayGame} />
      </>
    );
  }

  if (gameType === "offline") {

    return (
      <>
        <TicTacOfflinePage/>
      </>
    );
  }
  if (gameType === 'online') {
    return (
     <>
       <TicTacOnlinePage name={onlineNick}/>
     </>
    )
  }
};

export default TicTacPage;
