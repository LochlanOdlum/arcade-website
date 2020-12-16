import React, { useState, useEffect } from "react";
import useSnake from "../../hooks/useSnake";
import useSnakeSwipeArrowTurn from "../../hooks/useSnakeSwipeArrowTurn";
import "../../styling/Snake/SnakeBoard.css";
import { SnakeGameStatus } from "../../gameLogic/Snake";

const SnakeBoard = () => {
  const countdownLength = 3;
  let [gameStarting, setGameStarting] = useState(false);
  //Set countdown duration by changing starting value below
  let [countdown, setCountdown] = useState(countdownLength);

  let game = useSnake(21, 15, 140);
  useSnakeSwipeArrowTurn(game);

  const isPreGame = game.status === SnakeGameStatus.preGame;
  const isGameOver = game.status === SnakeGameStatus.endedGame;
  const isInGame = game.status === SnakeGameStatus.inGame;
  // console.log(game.isPaused);
  const snakeClass = isGameOver || game.isPaused ? 's-grey' : '';

  useEffect(() => {
    if (gameStarting) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 600);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarting]);

  useEffect(() => {
    if (gameStarting) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 600);
    }

    if (countdown <= 0 && isPreGame) {
      setGameStarting(false);

      try {
        game.start();
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  //This event listener allows user to use enter or spacebar to navigate through menu
  document.body.onkeyup = function(e){
    if(e.code === 'Space' || e.code === 'Enter'){
      if (isPreGame) {
        setGameStarting(true);
      }
      else if (isGameOver) {
        handleBoardClick()
      }
      else if (isInGame) {
        game.togglePause();
      }

    }
  };

  const renderBoard = () => {
    return game.board.map((columnx, indexX) => (
      <div key={`${indexX}`} className="s-column">
        {columnx.map((celly, indexY) => {
          if (celly === "snake" && !isPreGame) {
            return (
              <div
                key={`${indexX} ${indexY}`}
                className={`s-cell-snake s-cell ${snakeClass}`}
              />
            );
          }
          if (celly === "food" && !isPreGame) {
            return (
              <img
                key={game.food[1]}
                className={`s-cherry`}
                alt="cherry"
                src="/images/snake-cherry.svg"
              />
            );
          }

          return (
            <div key={`${indexX} ${indexY}`} className="s-cell-empty s-cell" />
          );
        })}
      </div>
    ));
  };

  const renderMenu = () => {
    if (!gameStarting && game.status === SnakeGameStatus.preGame) {
      return (
        <div
          onClick={() => {
            setGameStarting(true);
          }}
          className="s-center-text"
        >
          Start!
        </div>
      );
    }

    if (isGameOver) {
      return (
        <>
          <div className="s-center-text">Game Over!</div>
        </>
      );
    }
  };

  const renderCountDown = () => {
    if (gameStarting === true && game.status === SnakeGameStatus.preGame) {
      return <div className="s-center-text">{countdown}</div>;
    }
  };

  const handleBoardClick = () => {
    if (isGameOver) {
      setCountdown(countdownLength);
      game.playAgain()
    }
  };

  return (
    <>
      <div onClick={handleBoardClick} className="s-board-box">
        <div className="s-menu-container">
          {renderMenu()}
          {renderCountDown()}
        </div>

        <div className="s-board">{renderBoard()}</div>
      </div>
      <div className="s-score">
        <span className="s-left-score">{`Score: ${game.score}`}</span>
        <span className="s-right-score">{`High Score: ${game.highScore}`}</span>
      </div>
    </>
  );
};

export default SnakeBoard;
