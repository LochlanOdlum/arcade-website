import React, { useEffect } from "react";
import SmallHeader from "../SmallHeader";
import TicTacBoard from "./TicTacBoard";
import useTicTac, { displayGame } from "../../hooks/useTicTac";
import { GameStatus } from "../../gameLogic/game";

const TicTacOfflineFriendPage = () => {
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

  const onSquareClick = (x, y) => {
    if (game.status === GameStatus.draw || game.status === GameStatus.won) {
      game.playAgain();
    } else {
      try {
        game.takeTurn(game.currentPlayer, [x, y]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <SmallHeader />
      <TicTacBoard game={renderGame()} onSquareClick={onSquareClick} myPlayer={game.currentPlayer} />
    </>
  );
};

export default TicTacOfflineFriendPage;
