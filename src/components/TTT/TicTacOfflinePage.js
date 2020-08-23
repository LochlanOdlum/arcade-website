import React, {useEffect} from 'react';
import TicTacHeader from "./TicTacHeader";
import TicTacBoard from "./TicTacBoard";
import useTicTac, {displayGame} from "../../hooks/useTicTac";

const TicTacOfflinePage = () => {
  const game = useTicTac();

  const startGame = () => {
  game.start(displayGame.players);
  };

  useEffect(startGame, []);

  const renderGame = () => {
    if (game.status === undefined) {
      return displayGame;
    }
    return game;
  };


  const onSquareClick = (x,y) => {
    try {
      game.takeTurn(game.currentPlayer, [x,y])

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
     <TicTacHeader />
     <TicTacBoard game={renderGame()} onSquareClick={onSquareClick} />
    </>
  );
};

export default TicTacOfflinePage;