import TicTac from "../gameLogic/TicTac";
import useForceUpdate from "./useForceUpdate";

export const displayGame = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  ties: 0,
  players: [
    { id: "1", name: "Player 1", value: "x", score: 0, playerType: 'user' },
    { id: "0", name: "Player 2", value: "o", score: 0, playerType: 'user'}
  ],
  get currentPlayer() {
    return this.players[0];
  }
};

let game = {};

const useTicTac = () => {

  const forceUpdate = useForceUpdate();

  const setCurrentPlayer = player => {
    game.setCurrentPlayer(player);
    forceUpdate();
  };

  const start = players => {
    let g = new TicTac(players);
    g.start();
    game = g;
    forceUpdate();
  };

  const takeTurn = (player, [x, y]) => {
    game.takeTurn(player, [x, y]);
    forceUpdate();
  };

  const bestMove = (player) => {
    return game.bestMove(player);
  };

  const leave = player => {
    game.leave(player);
    forceUpdate();
  };

  const playAgain = () => {
    game.playAgain();
    forceUpdate();
  };

  return {
    start,
    takeTurn,
    bestMove,
    setCurrentPlayer,
    leave,
    playAgain,
    winningSquares: game?.winningSquares,
    lastResults: game?.lastResults,
    ties: game?.ties,
    board: game?.board,
    players: game?.players,
    winner: game?.winner,
    status: game?.status,
    currentPlayer: game?.currentPlayer
  };
};

export default useTicTac;
