import React, { useState, useEffect } from "react";
import TicTacHeader from "./TicTacHeader";
import TicTacBoard from "./TicTacBoard";
import useTicTac, { displayGame } from "../../hooks/useTicTac";
import io from "socket.io-client";
import LoadingOverlay from "../LoadingOverlay";

const randomID = () => {
  return Math.floor(Math.random() * 100000000000000);
};
let playerSelf = { name: '', id: randomID(), value: "", score:0 };
let playerOther = { name: '', id: '', value: '', score: 0};
let socket = "";

const TicTacOnlinePage = ({ name }) => {
  const [connected, setConnected] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const game = useTicTac();

  useEffect(() => {

    playerSelf.name = name;
    //Local  server port http://10.0.0.118:3005
    socket = io.connect("https://lochlancc-backend.herokuapp.com/");

    //Check if connected, wait for response. 'Ping'
    socket.emit("ttt-connect", playerSelf);
    //'Pong', once response from server, we know connection is started
    socket.on("ttt-connected", () => {
      setConnected(true);
    });
    //Once another player joins queue, match will be found.
    socket.on('match-found', (players) => {
      setMatchFound(true);
      const updatedPlayerSelf = players[players.findIndex((p) => p.id === playerSelf.id)];
      const updatedPlayerOther = players[players.findIndex((p) => p.id !== playerSelf.id)];
      playerSelf.value = updatedPlayerSelf.value;
      playerOther = updatedPlayerOther;


      startOnlineGame([playerSelf, updatedPlayerOther]);
    });

    socket.on('turn-taken', ({x,y}) => {
      game.takeTurn(playerOther, [x,y]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const renderGame = () => {
    //game.status is only defined once game is started, so render display game if no game started yet.
    if (game.status === undefined) {
      return( displayGame);
    }
    return game;
  };

  const renderLoading = () => {
    if (!connected) { 
      return  <LoadingOverlay text={'Connecting to server...'}/>;
    }
    if (connected && !matchFound) {
      return <LoadingOverlay text={'Joined queue. Searching for other players...'}/>
    }
  };

  //Perhaps create hook for online game functions?
  const startOnlineGame = (playerSelf, playerOther) => {
    game.start(playerSelf, playerOther);
  };

  const onSquareClick = (x,y) => {
    try {
      game.takeTurn(playerSelf, [x,y]);

      //If no error from take turn, code below to server is executed
      socket.emit('take-turn', {playerSelf, playerOther, coords: {x,y}});
    } catch (error) {
      console.error(error);
    }

  };


  return (
    <>
      {renderLoading()}
      <TicTacHeader />
      <TicTacBoard game={renderGame()} onSquareClick={onSquareClick} />
    </>
  );
};

export default TicTacOnlinePage;
