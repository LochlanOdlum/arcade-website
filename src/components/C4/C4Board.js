 import React, { useEffect, useState } from "react";
import "../../styling/C4/C4Board.css";
import C4PlayerBox from "./C4PlayerBox";
import { GameStatus } from "../../gameLogic/game";
import Confetti from "react-dom-confetti";

const confettiConfig = {
  angle: 90,
  spread: "360",
  startVelocity: "35",
  elementCount: "70",
  dragFriction: 0.12,
  duration: 3000,
  stagger: "1",
  width: "13px",
  height: "13px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

const C4Board = ({ game, onColumnClick, myPlayer }) => {
  const [shouldRenderConfetti, setShouldRenderConfetti] = useState(false);

  useEffect(() => {
    if (
      game.status === GameStatus.won &&
      myPlayer?.value === game.winner.value
    ) {
      setShouldRenderConfetti(true);
    }
    if (game.status === GameStatus.inGame) {
      setShouldRenderConfetti(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.status]);

  const renderTileValue = ([x, y]) => {
    const playerIDAtTile = game.board[x][y];
    const playerAtTile = game.players.find(p => p.id === playerIDAtTile);

    if (playerAtTile) {
      return playerAtTile.value === "red" ? "c4-tile-red" : "c4-tile-yellow";
    }

    if (
      game.status === GameStatus.inGame &&
      myPlayer?.value === game.currentPlayer?.value &&
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
  const renderConfettiLogic = (x, y) => {
    const isSquareWinning = () => {
      for (let coords of game.winningTiles) {
        if (coords[0] === x && coords[1] === y) {
          return true;
        }
      }
    };

    return shouldRenderConfetti && isSquareWinning();
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
              className={`c4-tile x:${x} y:${y} ${renderTileValue([
                x,
                y
              ])} ${squareWinClass(x, y)}`}
              key={`x:${x} y:${y}`}
              id={id}
            >
              <Confetti
                active={renderConfettiLogic(x, y)}
                config={confettiConfig}
              />
              <div className="c4-tile-inner" />
            </div>
          );
        })}
      </div>
    ));
  };

  const renderScore = () => {
    return game.lastResults?.map((result, index) => {
      if (result === "tie") {
        return (
          <img
            key={index}
            className="c4-tie-icon c4-score-icon"
            alt="small tie"
            src="/images/tie.svg"
          />
        );
      }
      if (result.value === "red") {
        return <div key={index} className="c4-score-icon c4-score-icon-red" />;
      }
      return <div key={index} className="c4-score-icon c4-score-icon-yellow" />;
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

      <div className="c4-score-container">{renderScore()}</div>
    </>
  );
};

export default C4Board;
