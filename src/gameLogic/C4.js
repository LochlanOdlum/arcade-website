import Game, { GameStatus } from "../gameLogic/game";

export default class C4Game extends Game {
  board = new Array(7).fill([]).map(() => [null, null, null, null, null, null]);
  ties = 0;
  winningTiles = [];
  lastResults = [];
  lastResultsAmount = 7;

  constructor(players) {
    if (players.length > 2) {
      throw new Error("You have too many friends");
    }
    super(players);

    const startingPlayer = this.players.find(
      p => p.value === "red"
    );
    this.setCurrentPlayer(startingPlayer);
  }

  start = () => {
    this.status = GameStatus.inGame;
  };

  takeTurn = (player, x) => {
    if (this.status !== GameStatus.inGame) {
      throw new Error("The game is not currently active");
    }

    if (player.id !== this.currentPlayer.id) {
      throw new Error("Whoops! It's not your turn yet");
    }
    if (this.board[x][0]) {
      throw new Error("Column is full");
    }

    let lowestY = null;
    for (let y = 0; y < this.board[x].length-1; y++) {
      if (this.board[x][y + 1] !== null) {
        lowestY = y;
        break;
      }
    }

    if (!lowestY && lowestY !== 0) {
      lowestY = this.board[x].length-1;
    }

    this.board[x][lowestY] = player.id;

    this.checkForWinAtPoint([x, lowestY]);
    this.checkForDraw();

    if (this.status === GameStatus.inGame) {
      this.goToNextPlayer();
    }
  };

  checkForDraw = () => {
    if (this.status === GameStatus.won) {
      return;
    }
    let nullCount = 0;
    for (const column of this.board) {
      for (const tileID of column) {
        if (!tileID) {
          nullCount += 1;
        }
      }
    }
    if (nullCount === 0) {
      this.ties += 1;
      this.status = GameStatus.draw;

      this.lastResults.push('tie');
      if (this.lastResults.length > this.lastResultsAmount) {
        this.lastResults.splice(0, this.lastResults.length-this.lastResultsAmount);
      }
    }
  };

  checkForWinAtPoint = ([x, y]) => {
    let currentWinningTiles = [[x,y], [null, null], [null, null], [null, null]];
    const searchDirections = [
      [-1, 0],
      [-1, -1],
      [0, -1],
      [-1, 1]
    ];

    const playerIDAtPoint = this.board[x][y];

    if (playerIDAtPoint === null) {
      return;
    }

    for (const direction of searchDirections) {
      let matchCount = 1;

      for (const directionMagnitude of [1, -1]) {
        let currentX = x + direction[0] * directionMagnitude;
        let currentY = y + direction[1] * directionMagnitude;
        while (
          currentX >= 0 &&
          currentX < this.board.length &&
          currentY >= 0 &&
          currentY < this.board[x].length &&
          this.board[currentX][currentY] === playerIDAtPoint
          ) {
          matchCount += 1;

          currentWinningTiles[matchCount -1] = [currentX, currentY];
          currentX += direction[0] * directionMagnitude;
          currentY += direction[1] * directionMagnitude;
        }
      }
      if (matchCount >= 4) {
        this.status = GameStatus.won;
        const winningPlayer = this.players.find((p) => p.id === playerIDAtPoint);
        winningPlayer.score +=1;
        this.winner = winningPlayer;
        this.winningTiles = currentWinningTiles;

        this.lastResults.push(this.winner);
        if (this.lastResults.length > this.lastResultsAmount) {
          this.lastResults.splice(0, this.lastResults.length-this.lastResultsAmount);
        }

        return;
      }

    }
  };

  playAgain = () => {
    this.winningSquares = [[null, null], [null, null], [null, null], [null, null]];
    this.winner = null;
    this.status = GameStatus.inGame;
    this.board = new Array(7).fill([]).map(() => [null, null, null, null, null, null]);

    const otherPlayer = this.players.find((p) => p.id !== this.currentPlayer.id);

    this.setCurrentPlayer(otherPlayer);
  };

}
