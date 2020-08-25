import Game,{ GameStatus } from "./game";

export default class TicTacGame extends Game {
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  ties = 0;
  winningSquares = [[null, null], [null, null], [null, null]];

  constructor(players) {
    if (players.length > 2) {
      throw new Error("You have too many friends");
    }

    super(players);
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
      for (const squareID of column) {
        if (squareID === null) {
          nullCount += 1;
        }
      }
    }
    if (nullCount === 0) {
      this.ties += 1;
      this.status = GameStatus.draw;
    }
  };

  checkForWinAtPoint = ([x, y]) => {
    const searchDirections = [
      [-1, 0],
      [-1, -1],
      [0, -1],
      [-1, 1]
    ];
    let currentWinningSquares = [[x, y], [null, null], [null, null]];

    const playerIDAtPoint = this.board[x][y];

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
          currentX < this.board.length &&
          currentY >= 0 &&
          currentY < this.board[0].length &&
          this.board[currentX][currentY] === playerIDAtPoint
          ) {
          currentWinningSquares[matchCount] = [currentX, currentY];
          matchCount += 1;

          currentX += direction[0] * directionMagnitude;
          currentY += direction[1] * directionMagnitude;
        }
      }

      if (matchCount >= 3) {
        //For loop increases score of player who won, by 1
        for (const index in this.players) {
          if (this.players[index].id === playerIDAtPoint) {
            this.players[index].score += 1;
          }
        }

        this.status = GameStatus.won;
        this.winner = this.players.find(p => p.id === playerIDAtPoint);
        this.winningSquares = currentWinningSquares;
        return;
      } else {
        //Set current winning squares to blank...
      }
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

    this.checkForWinAtPoint([x,y]);
    this.checkForDraw();
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
    const swapValue = (player) => {
      if (player.value === 'x') {
        player.value = 'o';
      } else {
        player.value = 'x';
      }
    }

    swapValue(this.currentPlayer);
    swapValue(otherPlayer);
    this.setCurrentPlayer(otherPlayer);
  };

}
