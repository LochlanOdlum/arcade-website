import React, { useEffect } from 'react';
import C4Board from "./C4Board";
import io from 'socket.io-client';
import {displayGame} from "../../hooks/useC4";
import useC4 from "../../hooks/useC4";

let socket = '';
const randomID = () => {
  return Math.floor(Math.random() * 100000000000000);
};
let playerSelf = { name: "", id: randomID(), value: "", score: 0 };
let playerOther = { name: "", id: "", value: "", score: 0 };


const C4OnlinePage = ({name}) => {
  const game = useC4();
  playerSelf.name = name;

  useEffect(() => {
    //Local  server port http://10.0.0.126:3005
    //Server URL https://lochlancc-backend.herokuapp.com/
    socket = io('https://lochlancc-backend.herokuapp.com/');

    socket.emit('C4-connect', playerSelf);
    socket.on('C4-connected', () => {
    });
    socket.on('C4-match-found', (playersData) => {
      const updatedPlayerSelf =
        playersData[playersData.findIndex(p => p.id === playerSelf.id)];
      const updatedPlayerOther =
        playersData[playersData.findIndex(p => p.id !== playerSelf.id)];
      playerSelf.value = updatedPlayerSelf.value;
      playerOther = updatedPlayerOther;
      game.start(playersData);
    });
    socket.on('C4-turn-taken', (x) => {
      game.takeTurn(playerOther, x);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getGame = () => {
    if (!game.players) {
      return displayGame;
    }
    return game;
  };

  const onColumnClick = x => {
    try {
      game.takeTurn(playerSelf, x);
      socket.emit('C4-take-turn', {x, playerOther})
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <C4Board game={getGame()} onColumnClick={onColumnClick} myColour={playerSelf.value} />
    </div>
  )
};

export default C4OnlinePage;