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

  checkForWinAtPoint = (board, [x, y]) => {
    let currentWinningTiles = [[x,y], [null, null], [null, null], [null, null]];
    const searchDirections = [
      [-1, 0],
      [-1, -1],
      [0, -1],
      [-1, 1]
    ];

    const playerIDAtPoint = board[x][y];

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
        const winningTiles = currentWinningTiles
        return [true, winningTiles];
      }

    }
    const winningTiles = currentWinningTiles
    return [false, winningTiles];
  };

  bestMove = (playerSelf) => {
    if (this.status !== GameStatus.inGame) {
      throw new Error("Can't find best move of game if it isn't in progress")
    }
    if (this.currentPlayer.id !== playerSelf.id) {
      throw new Error("It isn't this players turn so cannot find their best move. Please wait your turn")
    }

    let bestMove = [null, null];
    // const playerOther = this.players.find((p) => p.id !== playerSelf.id);
    let bestScore = -Infinity;

    let boardClone = new Array(7).fill([]).map(() => [null, null, null, null, null, null]);
    //Loop to clone board to boardClone
    for (let x = 0; x<this.board.length; x++) {
      for (let y=0; y<this.board[x].length; y++) {
        boardClone[x][y] = this.board[x][y];
      }
    }
    //This loops through all possible moves and gets value of game from those moves using minimax function
    //Once done it will set best move to the move with the highest game value, if a tie then will chose first square
    //that it loops through of the ties.
    for (let x = 0; x<boardClone.length; x++) {
      // let lowestY = null;
      // for (let y = 0; y < this.board[x].length-1; y++) {
      //   if (this.board[x][y + 1] !== null) {
      //     lowestY = y;
      //     break;
      //   }
      // }

      for (let y=0; y<boardClone[x].length; y++) {
        //If top square is empty (so its a possible column to make move)
        if (boardClone[x][0] === null) {
          boardClone[x][y] = playerSelf.id;

          let score;
          if (this.checkForWinAtPoint(boardClone, [x,y])[0]) {
            score = 1;
          }
          else if (this.checkForDraw(boardClone)) {
            score = 0;
          } else {
            score = 0;
            // score = this.minimax(boardClone, false, 2, playerSelf, playerOther);
          }

          if (score>bestScore) {
            bestScore = score;
            bestMove = [x,y];
          }
          //Sets boardClone square to null after checking value of game by playing at that square, cleaning up.
          boardClone[x][y] = null;
        }
      }
    }
    return bestMove;
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

    console.log(this.bestMove(this.currentPlayer));


    if (!lowestY && lowestY !== 0) {
      lowestY = this.board[x].length-1;
    }
    this.board[x][lowestY] = player.id;
    const [isGameWon, winningTiles] = this.checkForWinAtPoint(this.board, [x,lowestY]);

    if (isGameWon) {
      this.status = GameStatus.won;
      const winningPlayer = this.players.find((p) => p.id === player.id);
      winningPlayer.score +=1;
      this.winner = winningPlayer;
      this.winningTiles = winningTiles;

      this.lastResults.push(this.winner);
      if (this.lastResults.length > this.lastResultsAmount) {
        this.lastResults.splice(0, this.lastResults.length-this.lastResultsAmount);
      }
    }
    this.checkForDraw();

    if (this.status === GameStatus.inGame) {
      this.goToNextPlayer();
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
