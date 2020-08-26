import React, { useState } from "react";
import TicTacHeader from "./TicTacHeader";
import TicTacSelect from "./TicTacSelect";
import "../../styling/TTT/TicTacPage.css";
import TicTacOfflinePage from "./TicTacOfflinePage";
import TicTacOnlinePage from './TicTacOnlinePage';
import ErrorNotif from "../ErrorNotif";

const TicTacPage = () => {
  const [onlineNick, setOnlineNick] = useState("");
  const [gameType, setGameType] = useState();

  if (!gameType) {
    return (
      <>
        <div className="ttt-page">
        <TicTacHeader />
          {/*<ErrorNotif text={"testing hello 123"}/>*/}
        <TicTacSelect
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
