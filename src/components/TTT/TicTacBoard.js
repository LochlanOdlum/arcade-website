import React, { useState, useEffect } from "react";
import "../../styling/TTT/TicTacBoard.css";
import TicTacPlayerBox from "./TicTacPlayerBox";
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

const TicTacBoard = ({ game, onSquareClick, myPlayer }) => {
  console.log(game.lastResults);
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

  const renderConfettiLogic = (x, y) => {
    const isSquareWinning = () => {
      for (let coords of game.winningSquares) {
        if (coords[0] === x && coords[1] === y) {
          return true;
        }
      }
    };

    if (shouldRenderConfetti && isSquareWinning()) {
      return true;
    }
    return false;
  };

  const renderBoard = () => {
    if (game.board) {
      return game.board.map((column, x) => (
        <div key={`column-${x}`} className={`board-column ${x}`}>
          {column.map((id, y) => (
            <div
              key={`square-${y}`}
              className={`board-square ${squareWinClass(x, y)} x-${x} y-${y}`}
              onClick={() => onSquareClick(x, y)}
            >
              <Confetti
                active={renderConfettiLogic(x, y)}
                config={confettiConfig}
              />
              {squareValue(id, x, y)}
            </div>
          ))}
        </div>
      ));
    }
  };

  const squareWinClass = (x, y) => {
    if (game.status === undefined) {
      return "";
    }
    for (const [winX, winY] of game.winningSquares) {
      if (x === winX && y === winY) {
        if (game.winner.value === myPlayer.value) {
          return "square-won";
        }
        return "square-loss";
      }
    }
    return "";
  };

  const squareValue = (id, x, y) => {
    if (!id) {
      return;
    }
    const playerOfSquare = game.players.find(p => p.id === id);

    if (playerOfSquare.value === "x") {
      return (
        <>
          <div className={`cross cross-up cross-${squareWinClass(x, y)}`} />
          <div className={`cross cross-down cross-${squareWinClass(x, y)}`} />
        </>
      );
    }
    if (playerOfSquare.value === "o") {
      return (
        <>
          <div
            className={`circle circle-inner circle-${squareWinClass(x, y)}`}
          />
          <div
            className={`circle circle-outer circle-${squareWinClass(x, y)}`}
          />
        </>
      );
    }
  };

  const renderScore = () => {
    return game.lastResults?.map(result => {
      if (result === "tie") {
        return "";
      }
      if (result.value === "x") {
        return (
            <img className="ttt-score-icon ttt-score-cross" alt="small red cross" src="/images/ttt-cross.svg" />

        );
      }
      return (
          <img className="ttt-score-icon ttt-score-circle" alt="small yellow circle" src="/images/ttt-circle.svg" />
      );
    });
  };

  return (
    <div className="ttt-board-block">
      <div className="board-container">
        <TicTacPlayerBox
          game={game}
          name={game.players[0].name}
          id={game.players[0].id}
          value={game.players[0].value}
          side="left"
        />
        <div className="break" />
        <div className="board">{renderBoard()}</div>
        <TicTacPlayerBox
          game={game}
          name={game.players[1].name}
          id={game.players[1].id}
          value={game.players[1].value}
          side="right"
        />
      </div>

      <div className="score-container">
        {renderScore()}
        {/*<div className="player1 score">*/}
        {/*  <div className={`score-id${highlightCurrentPlayer(game.players[0])}`}>*/}
        {/*    {game.players[0].name}: ({game.players[0].value})*/}
        {/*  </div>*/}
        {/*  <div className="score-value">{game.players[0].score}</div>*/}
        {/*</div>*/}

        {/*<div className="ties score">*/}
        {/*  <div className="score-id">Tie</div>*/}
        {/*  <div className="score-value">{game.ties}</div>*/}
        {/*</div>*/}

        {/*<div className="player2 score">*/}
        {/*  <div className={`score-id${highlightCurrentPlayer(game.players[1])}`}>*/}
        {/*    {game.players[1].name}: ({game.players[1].value})*/}
        {/*  </div>*/}
        {/*  <div className="score-value">{game.players[1].score}</div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default TicTacBoard;
