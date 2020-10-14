import SnakeGame, { SnakeGameStatus } from "../gameLogic/Snake";
import useForceUpdate from "./useForceUpdate";
import { useEffect } from "react";

let firstRender = true;
let game = {};

const useSnake = (boardWidth, boardHeight, cooldown) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    firstRender = false;
  }, []);

  if (firstRender) {
    game = new SnakeGame(boardWidth, boardHeight, cooldown);
  }

  //Function is called here instead of in shiftSnake so board will be updated after snake is shifted.
  const moveLoop = () => {
    if (game.status !== SnakeGameStatus.inGame) {
      return;
    }
    game.shiftSnake();

    forceUpdate();
    setTimeout(() => {
      moveLoop();
    }, game.moveCoolDown);
    forceUpdate();
  };

  const start = (boardWidth, boardHeight, cooldown) => {
    game.start(boardWidth, boardHeight, cooldown);
    moveLoop();
    forceUpdate();
  };

  const turn = (x, y) => {
    game.turn(x, y);
    forceUpdate();
  };

  return {
    start,
    turn,

    position: game.position,
    status: game.status,
    board: game.board,
    score: game.score,
    food: game.food
  };
};

export default useSnake;
