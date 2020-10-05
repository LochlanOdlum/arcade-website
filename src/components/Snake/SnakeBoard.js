import React, { useEffect } from "react";
import useSnake from "../../hooks/useSnake";
import '../../styling/Snake/SnakeBoard.css';


const SnakeBoard = () => {
  let game = useSnake(21, 15, 150);


  const startGame = () => {
    document.addEventListener("keydown", event => {
      if (event.keyCode === 38) {
        game.turn(0,-1);
      }
      else if (event.keyCode === 40) {
        game.turn(0,1);
      }
      else if (event.keyCode === 37) {
        game.turn(-1,0);
      }
      else if (event.keyCode === 39) {
        game.turn(1,0);
      }
    });
    try {
      game.start();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(startGame, []);

  const renderBoard = () => {
    return game.board.map((columnx, indexX) => (
      <div key={`${indexX}`} className="s-column">
        {columnx.map((celly, indexY) => {
          if (celly === "snake") {
            return <div key={`${indexX} ${indexY}`} className="s-cell-snake s-cell"/>
          }
          if (celly === "food") {
            return <div key={`${indexX} ${indexY}`} className="s-cell-food s-cell"/>
          }

          return <div key={`${indexX} ${indexY}`} className="s-cell-empty s-cell"/>;
        })}
      </div>
    ));
  };

  return <div> {renderBoard()} </div>;
};

export default SnakeBoard;
