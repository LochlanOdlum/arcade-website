import React from "react";
import "../../styling/TTT/TicTacBoard.css";
import PlayerBox from "./PlayerBox";

const TicTacBoard = ({ game, onSquareClick }) => {
  const renderBoard = () => {
    if (!game.board) {
      return;
    }
    return game.board.map((column, x) => (
      <div key={`column-${x}`} className={`board-column ${x}`}>
        {column.map((id, y) => (
          <div
            key={`square-${y}`}
            className={`board-square ${squareWinClass(x, y)} x-${x} y-${y}`}
            onClick={() => onSquareClick(x, y)}
          >
            {squareValue(id, x, y)}
          </div>
        ))}
      </div>
    ));
  };

  const squareWinClass = (x, y) => {
    if (game.status === undefined) {
      return "";
    }
    for (const [winX, winY] of game.winningSquares) {
      if (x === winX && y === winY) {
        return "square-won";
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

  const highlightCurrentPlayer = ({ id }) => {
    if (id === game.currentPlayer.id) {
      return " highlightCurrentPlayer";
    } else return "";
  };

  return (
    <div className="ttt-board-block">
      <div className="board-container">
        <PlayerBox
          game={game}
          name={game.players[0].name}
          id={game.players[0].id}
          value={game.players[0].value}
          side="left"
        />
        <div className="break" />
        <div className="board">{renderBoard()}</div>
        <PlayerBox
          game={game}
          name={game.players[1].name}
          id={game.players[1].id}
          value={game.players[1].value}
          side="right"
        />
      </div>

      <div className="score-container">
        <div className="player1 score">
          <div className={`score-id${highlightCurrentPlayer(game.players[0])}`}>
            {game.players[0].name}: ({game.players[0].value})
          </div>
          <div className="score-value">{game.players[0].score}</div>
        </div>

        <div className="ties score">
          <div className="score-id">Tie</div>
          <div className="score-value">{game.ties}</div>
        </div>

        <div className="player2 score">
          <div className={`score-id${highlightCurrentPlayer(game.players[1])}`}>
            {game.players[1].name}: ({game.players[1].value})
          </div>
          <div className="score-value">{game.players[1].score}</div>
        </div>
      </div>
      {/*<div onClick={game.playAgain}>Play Again!</div>*/}
    </div>
  );
};

export default TicTacBoard;
