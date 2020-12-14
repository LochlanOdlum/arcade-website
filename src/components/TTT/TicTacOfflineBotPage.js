import React, { useEffect } from "react";
import SmallHeader from "../SmallHeader";
import TicTacBoard from "./TicTacBoard";
import useTicTac from "../../hooks/useTicTac";
import { GameStatus } from "../../gameLogic/game";

const botGameConfig = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  ties: 0,
  players: [
    { id: "1", name: "You", value: "x", score: 0, playerType: 'user' },
    { id: "0", name: "Bot", value: "o", score: 0, playerType: 'bot' }
  ],
  get currentPlayer() {
    return this.players[0];
  }
};

const TicTacOfflineBotPage = () => {
  const game = useTicTac();

  const startGame = () => {
    game.start(botGameConfig.players);
  };

  useEffect(startGame, []);

  const renderGame = () => {
    if (game.status === undefined) {
      return botGameConfig;
    }
    return game;
  };

  const onSquareClick = (x, y) => {
    if (game.status === GameStatus.draw || game.status === GameStatus.won) {
      console.log('Game restarting');
      console.log(game);
      game.playAgain();

      if (game.startingPlayer.id === botGameConfig.players[0].id) {
        game.takeTurn(botGameConfig.players[1], game.bestMove(botGameConfig.players[1]));
      }
    } else {
      try {
        if (game.currentPlayer.id === botGameConfig.players[0].id) {
          game.takeTurn(game.currentPlayer, [x, y]);
          const bestBotMove = game.bestMove(botGameConfig.players[1]);
          game.takeTurn(botGameConfig.players[1], bestBotMove);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <SmallHeader />
      <TicTacBoard game={renderGame()} onSquareClick={onSquareClick} myPlayer={botGameConfig.players[0]}/>
    </>
  );
};

export default TicTacOfflineBotPage;
