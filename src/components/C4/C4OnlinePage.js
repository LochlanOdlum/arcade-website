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


const C4OnlinePage = (name) => {
  const game = useC4();
  playerSelf.name = name;

  useEffect(() => {
    //Local  server port http://10.0.0.126:3005
    //Server URL https://lochlancc-backend.herokuapp.com/
    socket = io('http://10.0.0.126:3005');

    socket.emit('C4-connect', playerSelf);
  },[]);

  const getGame = () => {
    if (!game.players) {
      return displayGame;
    }
    return game;
  };


  return (
    <div>
      <C4Board game={getGame()} />
    </div>
  )
};

export default C4OnlinePage;