import React, { useState } from 'react';
import C4SelectMode from './C4SelectMode'
import C4OfflinePage from './C4OfflinePage';
import C4OnlinePage from './C4OnlinePage';

//First bring up component to select online or offline

//If offline, go to offline c4 page which creates a game with useC4 hook and feeds game to c4board.
//Create onTileClick function to pass down to C4Board which is essentially just onTurn function from useC4.

//If online, go to online c4 page, 1. create ID and game, connect to server. 2.Server responds with 'connected',
//Server adds you to queue. Load 'Joined queue' loading component. 3.Once server gets another player, server sends both player ID's
//and names to each player. Server also removes players from queue.... 4. Client works out otherPlayer ID, creates
//game with playerSelf and playerOther.

const C4Page = () => {
  const [gameType, setGameType] = useState(null);
  const [onlineNick, setOnlineNick] = useState('');

  if (!gameType) {
    return <C4SelectMode setGameType={setGameType} setOnlineNick={setOnlineNick}/>
  }

  else if (gameType === 'online') {
    return (
      <C4OnlinePage name={onlineNick}/>
    );
  }
    return <C4OfflinePage/>;
};

export default C4Page;