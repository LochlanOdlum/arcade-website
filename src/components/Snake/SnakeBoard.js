import React from "react";
import useSnake from "../../hooks/useSnake";
import useSnakeSwipeArrowTurn from '../../hooks/useSnakeSwipeArrowTurn'
import "../../styling/Snake/SnakeBoard.css";
import {SnakeGameStatus} from "../../gameLogic/Snake";

const SnakeBoard = () => {
  let game = useSnake(21, 15, 140);
  useSnakeSwipeArrowTurn(game);

  const isPreGame = game.status === SnakeGameStatus.preGame;

  const startGame = () => {
    try {
      game.start();
    } catch (error) {
      console.log(error);
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
                className={`s-cell-snake s-cell`}
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
    console.log(game);
    if (game.status === SnakeGameStatus.preGame) {
      return (
        <div onClick={startGame} className="s-button-start">
          Start!
        </div>
      );
    }
  };


  return (
    <>
      <div className="s-board-box">
        <div className="s-menu-container">
          {renderMenu()}
        </div>

        <div className="s-board">{renderBoard()}</div>
      </div>
      <div className="s-score"> {`Score: ${game.score}`} </div>
    </>
  );
};

export default SnakeBoard;
