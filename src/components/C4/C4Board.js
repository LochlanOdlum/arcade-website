import React from "react";
import "../../styling/C4/C4Board.css";
import C4PlayerBox from "./C4PlayerBox";
import { GameStatus } from "../../gameLogic/game";

const C4Board = ({ game, onColumnClick, myPlayer}) => {
  console.log(game.winningTiles);
  const renderTileValue = ([x, y]) => {
    const playerIDAtTile = game.board[x][y];
    const playerAtTile = game.players.find(p => p.id === playerIDAtTile);

    if (playerAtTile) {
      return playerAtTile.value === "red" ? "c4-tile-red" : "c4-tile-yellow";
    }

    if (
      game.status === GameStatus.inGame &&
      myPlayer.value === game.currentPlayer?.value &&
      (y >= game.board[x].length - 1 || game.board[x][y + 1])
    ) {
      return game.currentPlayer.value === "red"
        ? "c4-next-active-tile-red"
        : "c4-next-active-tile-yellow";
    }

    return "";
  };

  const squareWinClass = (x, y) => {
    if (game.status === GameStatus.won) {
      for (const [winX, winY] of game.winningTiles) {
        if (x === winX && y === winY) {
          if (game.winner?.value === myPlayer.value) {
            return "c4-tile-won";
          }
          return "c4-tile-loss";
        }
      }
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
              className={`c4-tile x:${x} y:${y} ${renderTileValue([x, y])} ${squareWinClass(x,y)}`}
              key={`x:${x} y:${y}`}
              id={id}
            />
          );
        })}
      </div>
    ));
  };

  const renderScore = () => {
    console.log(game.winningTiles);
    return game.lastResults?.map((result, index) => {
      if (result === "tie") {
        return <img key={index} className="c4-tie-icon c4-score-icon" alt="small tie" src="/images/tie.svg" />;
      }
      if (result.value === "red") {
        return (
           <div key={index} className="c4-score-icon c4-score-icon-red"/>
        );
      }
      return (
          <div key={index} className="c4-score-icon c4-score-icon-yellow"/>
      );
    });
  };


  return (
    <>
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

      <div className="c4-score-container">
      {renderScore()}
    </div>

    </>
  );
};

export default C4Board;
