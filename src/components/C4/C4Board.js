import React, { useEffect, useRef } from "react";
import useC4 from "../../hooks/useC4";
import "../../styling/C4/C4Board.css";

const players = [
  { id: "1", name: "Player 1", value: "red", score: 0 },
  { id: "0", name: "Player 2", value: "yellow", score: 0 }
];

const C4Board = ({game}) => {
  //Remove effect to start game once board starts, instead have seperate online and offline pages that will create
  //a game and pass game down to C4Board component.
console.log(game);

  const onColumnClick = x => {
    try {
      game.takeTurn(game.currentPlayer, x);
    } catch (error) {
      console.error(error);
    }
  };

  const renderBoard = () => {
    return game.board.map((column, x) => (
      <div
        onClick={() => {
          onColumnClick(x);
        }}
        key={x}
        className={`c4-column x:${x}`}
      >
        {column.map((id, y) => {
          return (
            <div
              className={`c4-tile x:${x} y:${y} ${renderTileValue([x, y])}`}
              key={`x:${x} y:${y}`}
              id={id}
            />
          );
        })}
      </div>
    ));
  };
  const renderTileValue = ([x, y]) => {
    const playerIDAtTile = game.board[x][y];
    const playerAtTile = game.players.find(p => p.id === playerIDAtTile);

    if (!playerAtTile) {
      return "";
    }
    return playerAtTile.value === "red" ? "c4-tile-red" : "c4-tile-yellow";
  };

  return (
    <div className="c4-board-block">
        <div className="c4-board">{renderBoard()}</div>
    </div>
  );
};

export default C4Board;
