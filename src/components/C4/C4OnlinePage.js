import React, { useEffect, useState } from 'react';
import C4Board from "./C4Board";
import io from 'socket.io-client';
import {displayGame} from "../../hooks/useC4";
import useC4 from "../../hooks/useC4";
import LoadingOverlay from "../LoadingOverlay";
import {GameStatus} from "../../gameLogic/game";
import SmallHeader from "../SmallHeader";

let socket = '';
const randomID = () => {
  return Math.floor(Math.random() * 100000000000000);
};
let playerSelf = { name: "", id: randomID(), value: "", score: 0 };
let playerOther = { name: "", id: "", value: "", score: 0 };


const C4OnlinePage = ({name}) => {
  const [connected, setConnected] = useState(false);
  const [matchFound, setMatchFound] = useState(false);

  const game = useC4();
  playerSelf.name = name;

  useEffect(() => {
    //Local  server port http://10.0.0.126:3005
    //Server URL https://lochlancc-backend.herokuapp.com/
    socket = io('https://lochlancc-backend.herokuapp.com/');

    socket.emit('C4-connect', playerSelf);
    socket.on('C4-connected', () => {
      setConnected(true)
    });
    socket.on('C4-match-found', (playersData) => {
      const updatedPlayerSelf =
        playersData[playersData.findIndex(p => p.id === playerSelf.id)];
      const updatedPlayerOther =
        playersData[playersData.findIndex(p => p.id !== playerSelf.id)];
      playerSelf.value = updatedPlayerSelf.value;
      playerOther = updatedPlayerOther;
      game.start(playersData);

      setMatchFound(true);
    });
    socket.on('C4-turn-taken', (x) => {
      game.takeTurn(playerOther, x);
    });

    socket.on('C4-playing-again', () => {
      game.playAgain();
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getGame = () => {
    if (!game.players) {
      return displayGame;
    }
    return game;
  };

  const onColumnClick = x => {
    if (game.status === GameStatus.draw || game.status === GameStatus.won) {
      socket.emit('C4-play-again', {playerOther});
      game.playAgain();
    } else {
      try {
        game.takeTurn(playerSelf, x);
        socket.emit('C4-take-turn', {x, playerOther})
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderLoading = () => {
    if (!connected) {
      return <LoadingOverlay text={"Connecting to server..."} />;
    }
    if (connected && !matchFound) {
      return (
        <LoadingOverlay text={"Joined queue. Searching for other players..."} />
      );
    }
  };

  return (
    <div>
      {renderLoading()}
      <SmallHeader/>
      <C4Board game={getGame()} onColumnClick={onColumnClick} myColour={playerSelf.value} />
    </div>
  )
};

export default C4OnlinePage;