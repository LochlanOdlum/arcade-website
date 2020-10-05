import Game,{ GameStatus } from "./game";

export default class TicTacGame extends Game {
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  ties = 0;
  winningSquares = [[null, null], [null, null], [null, null]];
  lastResults = [];
  lastResultsAmount = 7;

  constructor(players) {
    if (players.length > 2) {
      throw new Error("You have too many friends");
    }

    super(players);

    const startingPlayer = this.players.find(
      p => p.value === "x"
    );
    this.setCurrentPlayer(startingPlayer);
  }

  start = () => {
    this.status = GameStatus.inGame;
  };

   checkForDraw = (board) => {
     if (this.status === GameStatus.won) {
       return false;
     }
    let nullCount = 0;

    for (const column of board) {
      for (const squareID of column) {
        if (squareID === null) {
          nullCount += 1;
        }
      }
    }
    return nullCount === 0;

  };

  checkForWinAtPoint = (board, [x, y]) => {
    const searchDirections = [
      [-1, 0],
      [-1, -1],
      [0, -1],
      [-1, 1]
    ];
    let currentWinningSquares = [[x, y], [null, null], [null, null]];

    const playerIDAtPoint = board[x][y];

    if (!playerIDAtPoint) {
      return [false, [[null,null], [null, null], [null, null]]];
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
          currentY < board[0].length &&
          board[currentX][currentY] === playerIDAtPoint
          ) {
          currentWinningSquares[matchCount] = [currentX, currentY];
          matchCount += 1;

          currentX += direction[0] * directionMagnitude;
          currentY += direction[1] * directionMagnitude;
        }
      }

      if (matchCount >= 3) {
        return [true, currentWinningSquares];
      }
    }
    return [false, [[null,null], [null, null], [null, null]]];
  };

  bestMove = (playerSelf) => {
    if (this.status !== GameStatus.inGame) {
      throw new Error("Can't find best move of game if it isn't in progress")
    }
    if (this.currentPlayer.id !== playerSelf.id) {
      throw new Error("It isn't this players turn so cannot find their best move. Please wait your turn")
    }

    let bestMove = [null, null];
    const playerOther = this.players.find((p) => p.id !== playerSelf.id);
    let bestScore = -Infinity;

    let boardClone = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
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
      for (let y=0; y<boardClone[x].length; y++) {
        //If square is empty (so its a possible move)
        if (boardClone[x][y] === null) {
          boardClone[x][y] = playerSelf.id;

          let score;
          if (this.checkForWinAtPoint(boardClone, [x,y])[0]) {
            score = 1;
          }
          else if (this.checkForDraw(boardClone)) {
            score = 0;
          } else {
          score = this.minimax(boardClone, false, 2, playerSelf, playerOther);
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
    console.log(bestScore);
    return bestMove;
  };

  minimax = (board, isMaximising, depth, playerSelf, playerOther) => {
   //isMaximising means it's playerSelf's turn to move, trying to get largest value of game (as value = gain)
    if (isMaximising) {
      let bestScore = -Infinity;
      for (let x = 0; x<board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
          if (board[x][y] === null) {
            board[x][y] = playerSelf.id;

            let score;
            if (this.checkForWinAtPoint(board, [x, y])[0]) {
              score = 10-depth;
            } else if (this.checkForDraw(board)) {
              score = 0;
            } else {
              score = this.minimax(board, false, depth + 1, playerSelf, playerOther);
            }

            if (score > bestScore) {
              bestScore = score;
            }
            board[x][y] = null;
          }
        }
      }
      return bestScore;
    }
    if (!isMaximising) {
      let bestScore = Infinity;
      for (let x = 0; x<board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
          if (board[x][y] === null) {
            board[x][y] = playerOther.id;

            let score;
            if (this.checkForWinAtPoint(board, [x, y])[0]) {
              //If there is a win after playerOther takes turn then it must be a loss for playerSelf, so -1.
              score = -10+depth;
            } else if (this.checkForDraw(board)) {
              score = 0;
            } else {
              score = this.minimax(board, true, depth + 1, playerSelf, playerOther);
            }

            if (score < bestScore) {
              bestScore = score;
            }
            board[x][y] = null;
          }
        }
      }
      return bestScore;
    }

  };

  takeTurn = (player, [x, y]) => {

    if (this.status !== GameStatus.inGame) {
      throw new Error("The game is not currently active")
    }

    if (player.id !== this.currentPlayer.id) {
      throw new Error("Whoops! It's not your turn yet");
    }

    if (this.board[x][y]) {
      throw new Error("Someone has already moved there");
    }

    this.board[x][y] = player.id;

    const [isGameWon, winningSquares] = this.checkForWinAtPoint(this.board, [x,y]);

    if (isGameWon) {
      player.score+=1;

      this.winner = player;
      this.status = GameStatus.won;
      this.winningSquares = winningSquares;

      this.lastResults.push(this.winner);
      if (this.lastResults.length > this.lastResultsAmount) {
        this.lastResults.splice(0, this.lastResults.length-this.lastResultsAmount);
      }
    }

    const isGameDrawn = this.checkForDraw(this.board);
    if (isGameDrawn) {
      this.ties += 1;
      this.status = GameStatus.draw;

      this.lastResults.push('tie');
      if (this.lastResults.length > this.lastResultsAmount) {
        this.lastResults.splice(0, this.lastResults.length-this.lastResultsAmount);
      }
    }

    //Prevents going to next player if game is won or drawn
    if (this.status === GameStatus.won || this.status === GameStatus.draw) {
      return;
    }


    this.goToNextPlayer();
  };

  playAgain = () => {
    this.winningSquares = [[null, null], [null, null], [null, null]];
    this.winner = null;
    this.status = GameStatus.inGame;
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    const otherPlayer = this.players.find((p) => p.id !== this.currentPlayer.id);

    this.setCurrentPlayer(otherPlayer);
  };

}
