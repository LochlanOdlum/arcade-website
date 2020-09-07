import React, { useEffect } from "react";
import C4Board from "./C4Board";
import useC4, { displayGame } from "../../hooks/useC4";
import SmallHeader from "../SmallHeader";

const offlinePlayers = [
  { name: "Player 1", value: "red", id: 1, score: 0 },
  { name: "Player 2", value: "yellow", id: 2, score: 0 }
];

const C4OfflinePage = () => {
  const game = useC4();

  const startGame = () => {
    game.start(offlinePlayers);
  };

  useEffect(startGame, []);

  const getGame = () => {
    if (!game.players) {
      return displayGame;
    }
    return game;
  };

  const onColumnClick = x => {
    try {
      game.takeTurn(game.currentPlayer, x);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <SmallHeader/>
      <C4Board game={getGame()} onColumnClick={onColumnClick} myColour={game.currentPlayer?.value}/>
    </>
  );
};

export default C4OfflinePage;
