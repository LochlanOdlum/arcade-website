import React, { useEffect } from "react";
import C4Board from "./C4Board";
import useC4, { displayGame } from "../../hooks/useC4";
import SmallHeader from "../General/SmallHeader";
import { GameStatus } from "../../gameLogic/game";

const botGameConfig = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  ties: 0,
  players: [
    { id: "1", name: "You", value: "red", score: 0, playerType: "user" },
    { id: "0", name: "Bot", value: "yellow", score: 0, playerType: "bot" }
  ],
  get currentPlayer() {
    return this.players[0];
  }
};

const C4OfflineBotPage = () => {
  const game = useC4();

  const startGame = () => {
    game.start(botGameConfig.players);
  };

  useEffect(startGame, []);

  const getGame = () => {
    if (!game.players) {
      return displayGame;
    }
    return game;
  };

  const onColumnClick = x => {
    if (game.status === GameStatus.draw || game.status === GameStatus.won) {
      game.playAgain();
      try {
        const bestMove = game.bestMove(botGameConfig.players[1]);
        game.takeTurn(botGameConfig.players[1], bestMove);
      } catch (error) {
        console.log(error);
      }
    } else {
      if (game.board[x][0] !== null) {
        console.error("Column is full!");
        return;
      }

      try {
        game.takeTurn(botGameConfig.players[0], x);
      } catch (error) {
        console.error(error);
      }
      try {
        const bestMove = game.bestMove(botGameConfig.players[1]);
        console.log(bestMove);
        game.takeTurn(botGameConfig.players[1], bestMove);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <SmallHeader />
      <C4Board
        game={getGame()}
        onColumnClick={onColumnClick}
        myPlayer={game.currentPlayer}
      />
      {/*<div style={{backgroundColor: 'Red'}} onClick={() => console.log(game.bestMove(game.currentPlayer))}> Click me! </div>*/}
    </>
  );
};

export default C4OfflineBotPage;
