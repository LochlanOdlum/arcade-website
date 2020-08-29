import { useState, useEffect } from "react";
import { GameStatus } from "../gameLogic/game";

export const displayGame = {
  board: new Array(7).fill([]).map(() => [null, null, null, null, null, null]),
  players: [
    { name: "Player 1", value: "red", id: 0, score: 0 },
    { name: "Player 2", value: "yellow", id: 1, score: 0 }
  ],
  ties: 0,
  get currentPlayer() {
    return this.players[0]
  }
};


const useC4 = () => {
  const [board, setBoard] = useState(
    new Array(7).fill([]).map(() => [null, null, null, null, null, null])
  );
  const [players, setPlayers] = useState();
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [winner, setWinner] = useState({});
  const [status, setStatus] = useState(GameStatus.preGame);
  const [ties, setTies] = useState();
  const [winningTiles, setWinningTiles] = useState([]);

  useEffect(() => {
    if (players) {
      setCurrentPlayer(players[0]);
    }
  }, [players]);

  const start = players => {
    setStatus(GameStatus.inGame);
    setPlayers(players);
  };
  const goToNextPlayer = () => {
    const currentPlayerIndex = players.indexOf(currentPlayer);
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayer(players[nextPlayerIndex]);
  };

  const takeTurn = (player, x) => {
    if (status !== GameStatus.inGame) {
      throw new Error("The game is not currently active");
    }

    if (player.id !== currentPlayer.id) {
      throw new Error("Whoops! It's not your turn yet");
    }
    if (board[x][0]) {
      throw new Error("Column is full");
    }

    let lowestY = null;
    for (let y = 0; y < board[x].length; y++) {
      if (board[x][y + 1]) {
        lowestY = y;
        break;
      }
    }

    if (!lowestY && lowestY !== 0) {
      lowestY = board[x].length-1;
    }

    const boardClone = [...board];
    for (const column of board) {
      let columnIndex = board.indexOf(column);
      boardClone[columnIndex] = column;
    }
    boardClone[x][lowestY] = player.id;
    setBoard(boardClone);

    checkForWinAtPoint([x, lowestY]);
    checkForDraw();
    goToNextPlayer();
  };

  const checkForDraw = () => {
    if (status === GameStatus.won) {
      return
    }
    let nullCount = 0;
    for (const column of board) {
      for (const tileID of column) {
        if (!tileID) {
          nullCount += 1;
        }
      }
    }
    if (nullCount === 0) {
      setTies(ties+1);
      setStatus(GameStatus.draw);
    }
  };

  const checkForWinAtPoint = ([x, y]) => {
    let currentWinningTiles = [[x,y], [null, null], [null, null], [null, null]];
    const searchDirections = [
      [-1, 0],
      [-1, -1],
      [0, -1],
      [-1, -1]
    ];

    const playerIDAtPoint = board[x][y];

    if (!playerIDAtPoint) {
      return;
    }

    for (const direction of searchDirections) {
      let matchCount = 1;

      for (const directionMagnitude of [1, -1]) {
        let currentX = x + direction[0] * directionMagnitude;
        let currentY = y + direction[1] * directionMagnitude;

        while (
          currentX >= 0 &&
          currentX < board.length &&
          currentY >= 0 &&
          currentY < board[x].length &&
          board[currentX][currentY] === playerIDAtPoint
        ) {
          matchCount += 1;

          currentWinningTiles[matchCount -1] = [currentX, currentY];
          currentX += direction[0] * directionMagnitude;
          currentY += direction[1] * directionMagnitude;
        }
      }

      if (matchCount >= 4) {
        setStatus(GameStatus.won);
        const winningPlayer = players.find((p) => p.id === playerIDAtPoint);
        winningPlayer.score +=1;
        setWinner(winningPlayer);
        setWinningTiles(currentWinningTiles);
        return;
      }

    }
  };

  return {
    //Functions
    start,
    takeTurn,
    setWinner,
    setCurrentPlayer,
    setTies,
    setWinningTiles,

    //Variables
    currentPlayer,
    board,
    players,
    status,
    ties,
    winner,
    winningTiles
  };
};

export default useC4;
