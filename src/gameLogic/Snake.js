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
  //Position is stored as an array of (x,y) values for each part.
  //Direction is x,y. Where (0,0) is top left. Default up.
  direction = [0, -1];
  debouncedDirection = [0, -1];
  status = SnakeGameStatus.preGame;

  constructor(boardWidth, boardHeight, cooldown) {
    this.moveCoolDown = cooldown;
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
    this.food = [null, null];
  }

  shiftSnake = () => {
    if (
      !(
        this.debouncedDirection[0] === -this.direction[0] &&
        this.debouncedDirection[1] === -this.direction[1]
      )
    ) {
      this.direction = this.debouncedDirection;
    }

    const headPosition = [
      this.position[this.position.length - 1][0],
      this.position[this.position.length - 1][1]
    ];
    const newHead = [
      headPosition[0] + this.direction[0],
      headPosition[1] + this.direction[1]
    ];

    if (newHead[0] === this.food[0] && newHead[1] === this.food[1]) {
      this.eatFood();
    }

    for (let [x, y] of this.position) {
      if (x === newHead[0] && y === newHead[1]) {
        console.log("snake hit itself");
        // this.board[this.position[this.position.length - 1][0]][
        //   this.position[this.position.length - 1][1]
        // ] = null;
        // this.position.splice(this.position.length - 1, 1);
        this.status = SnakeGameStatus.endedGame;
        console.log(this.board[10]);
        return;
      }
    }
    if (
      newHead[0] > this.boardWidth - 1 ||
      newHead[0] < 0 ||
      newHead[1] > this.boardHeight - 1 ||
      newHead[1] < 0
    ) {
      this.status = SnakeGameStatus.endedGame;

      return;
    }
    //Shifts snake along in board
    this.board[newHead[0]][newHead[1]] = "snake";
    this.board[this.position[0][0]][this.position[0][1]] = null;

    //Shifts snake in position
    this.position.push(newHead);
    this.position.splice(0, 1);
  };

  moveLoop = () => {
    this.shiftSnake();
    if (this.status !== SnakeGameStatus.inGame) {
      this.status = SnakeGameStatus.inGame;
      return;
    }

    setTimeout(() => {
      this.moveLoop();
    }, this.moveCoolDown);
  };

  createFood = () => {
    const foodX = Math.floor(Math.random()*this.boardWidth);
    const foodY = Math.floor(Math.random()*this.boardHeight);

    if (!this.board[foodX][foodY]) {
      this.food = [foodX, foodY];
      this.board[foodX][foodY] = 'food';
    }
    else {
      this.createFood();
    }
  };

  eatFood = () => {
    const tailX = this.position[0][0];
    const tailY = this.position[0][1];
    const oneBehindTailX = this.position[1][0];
    const oneBehindTailY = this.position[1][1];

    const newTailX = 2*tailX - oneBehindTailX;
    const newTailY = 2*tailY - oneBehindTailY;

    this.position.unshift([[newTailX], [newTailY]]);
    this.createFood();
  };

  start = () => {
    this.status = SnakeGameStatus.inGame;
    this.createFood();
  };

  turn = (x, y) => {
    this.debouncedDirection = [x, y];
  };
}

export default SnakeGame;
