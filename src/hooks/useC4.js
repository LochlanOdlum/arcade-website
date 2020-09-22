import useForceUpdate from "./useForceUpdate";
import C4 from "../gameLogic/C4";

export const displayGame = {
  board: new Array(7).fill([]).map(() => [null, null, null, null, null, null]),
  players: [
    { name: "Player 1", value: "red", id: 1, score: 0 },
    { name: "Player 2", value: "yellow", id: 2, score: 0 }
  ],
  ties: 0,
  get currentPlayer() {
    return this.players[0];
  }
};

let game = {};

const useC4 = () => {
  const forceUpdate = useForceUpdate();

  const start = players => {
    let g = new C4(players);
    g.start();
    game = g;
    forceUpdate();
  };

  const takeTurn = (player, x) => {
    game.takeTurn(player, x);
    forceUpdate();
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
    playAgain,
    leave,

    winningTiles: game?.winningTiles,
    lastResults: game?.lastResults,
    ties: game?.ties,
    board: game?.board,
    players: game?.players,
    winner: game?.winner,
    status: game?.status,
    currentPlayer: game?.currentPlayer
  };
};

export default useC4;
