import React, { useEffect } from "react";
import C4Board from "./C4Board";
import useC4, { displayGame } from "../../hooks/useC4";

const offlinePlayers = [
  { name: "Player 1", value: "red", id: 0, score: 0 },
  { name: "Player 2", value: "yellow", id: 1, score: 0 }
];

const C4OfflinePage = () => {
  const game = useC4();

  const startGame = () => {
    console.log('hook called');
    game.start(offlinePlayers);
  };

  useEffect(startGame, []);

  const getGame = () => {
    if (!game.players) {
      return displayGame;
    }
    return game;
  };


  return (
    <div>
      <C4Board game={getGame()}/>
    </div>
  );
};

export default C4OfflinePage;
