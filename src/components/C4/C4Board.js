import React from "react";
import "../../styling/C4/C4Board.css";
import C4PlayerBox from "./C4PlayerBox";
import { GameStatus } from "../../gameLogic/game";

const C4Board = ({ game, onColumnClick, myColour}) => {
  const renderTileValue = ([x, y]) => {
    const playerIDAtTile = game.board[x][y];
    const playerAtTile = game.players.find(p => p.id === playerIDAtTile);

    if (playerAtTile) {
      return playerAtTile.value === "red" ? "c4-tile-red" : "c4-tile-yellow";
    }

    if (
      game.status === GameStatus.inGame &&
      myColour === game.currentPlayer?.value &&
      (y >= game.board[x].length - 1 || game.board[x][y + 1])
    ) {
      return game.currentPlayer.value === "red"
        ? "c4-next-active-tile-red"
        : "c4-next-active-tile-yellow";
    }

    return "";
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

  return (
    <div className="c4-board-block">
      <C4PlayerBox
        game={game}
        name={game.players[0].name}
        id={game.players[0].id}
        value={game.players[0].value}
        side="left"
      />
        <div className="break" />
      <div className="c4-board">{renderBoard()}</div>
      <C4PlayerBox
        game={game}
        name={game.players[1].name}
        id={game.players[1].id}
        value={game.players[1].value}
        side="right"
      />
    </div>
  );
};

export default C4Board;
