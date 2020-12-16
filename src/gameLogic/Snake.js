//Functions needed;

//Functions for user input;
//Turn;

//Other Functions
//Create food
//Move snake
//Eat Food

export const SnakeGameStatus = {
  preGame: Symbol("preGame"),
  inGame: Symbol("inGame"),
  endedGame: Symbol("endedGame")
};

class SnakeGame {
  constructor(boardWidth, boardHeight, cooldown) {
    this.newGameSetup(boardWidth, boardHeight, cooldown);
    this.highScore = 0;
  }

  newGameSetup = (boardWidth, boardHeight, cooldown) => {
    this.direction = [0, -1];
    this.debouncedDirection = [0, -1];
    this.status = SnakeGameStatus.preGame;
    this.moveCoolDown = cooldown;
    this.score = 0;
    this.isPaused= false;
    //Board width and height must be odd so snake can start in middle.
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    //Array of positions of snake, from tail to head.
    this.position = [
      [(boardWidth - 1) / 2, (boardHeight + 3) / 2],
      [(boardWidth - 1) / 2, (boardHeight + 1) / 2],
      [(boardWidth - 1) / 2, (boardHeight - 1) / 2]
    ];
    //Board is just used for visual presentation of game. Not needed in logic.
    this.board = new Array(boardWidth)
      .fill(null)
      .map(() => new Array(boardHeight).fill(null));
    this.board[(boardWidth - 1) / 2][(boardHeight + 3) / 2] = "snake";
    this.board[(boardWidth - 1) / 2][(boardHeight + 1) / 2] = "snake";
    this.board[(boardWidth - 1) / 2][(boardHeight - 1) / 2] = "snake";
    this.food = [[null, null], this.generateID()];

    const startFood = this.newFoodPos();
    this.food[0] = startFood;
    this.board[startFood[0]][startFood[1]] = "food";
  };

  generateID = () => {
    return Math.floor(Math.random() * 10 ** 10);
  };

  shiftSnake = () => {
    const currentHead = this.position[this.position.length - 1];
    const newHead = [
      currentHead[0] + this.direction[0],
      currentHead[1] + this.direction[1]
    ];
    const currentTail = this.position[0];

    const foodX = this.food[0][0];
    const foodY = this.food[0][1];

    if (
      this.debouncedDirection[0] !== -this.direction[0] &&
      this.debouncedDirection[1] !== -this.direction[1]
    ) {
      this.direction = this.debouncedDirection;
    }

    //Detect game ending: Move outside board or onto own snake.
    if (
      newHead[0] >= this.boardWidth ||
      newHead[1] >= this.boardHeight ||
      newHead[0] < 0 ||
      newHead[1] < 0 ||
      (this.board[newHead[0]][newHead[1]] === "snake" &&
        !(newHead[0] === currentTail[0] && newHead[1] === currentTail[1]))
    ) {
      this.status = SnakeGameStatus.endedGame;
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }
      return;
    }

    //Removing tail. If there is food then it doesn't remove tail giving the effect of growing one back.
    if (newHead[0] === foodX && newHead[1] === foodY) {
      this.score += 5;
      //No clean up of old food needed, as new snake head overwrites the old food on board.
      const newFood = this.newFoodPos();
      this.food[0] = newFood;
      this.board[newFood[0]][newFood[1]] = "food";
    } else {
      this.board[currentTail[0]][[currentTail[1]]] = null;
      this.position.splice(0, 1);
    }

    //Shifting snake head - only runs if there is no error:
    this.position.push(newHead);
    this.board[newHead[0]][[newHead[1]]] = "snake";
  };


  newFoodPos = () => {
    const foodX = Math.floor(Math.random() * this.boardWidth);
    const foodY = Math.floor(Math.random() * this.boardHeight);

    if (this.board[foodX][foodY] !== null) {
      return this.newFoodPos();
    }
    return [foodX, foodY];
  };

  start = () => {
    this.status = SnakeGameStatus.inGame;
  };

  turn = (x, y) => {
    this.debouncedDirection = [x, y];
  };

  playAgain = () => {
    this.newGameSetup(this.boardWidth, this.boardHeight, this.moveCoolDown);
  };
}

export default SnakeGame;
