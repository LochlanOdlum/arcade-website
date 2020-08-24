import React from "react";
import "../../styling/TTT/TicTacBoard.css";


const TicTacBoard = ({game, onSquareClick}) => {

  const renderBoard = () => {
    if (!game.board) {
      return;
    }
    return game.board.map((column, x) => (
      <div key={`column-${x}`} className={`board-column ${x}`} >
        {column.map((id, y) => (
          <div key={`square-${y}`} className={`board-square ${y}`} onClick={() => onSquareClick(x,y) }>
            {squareValue(id)}
          </div>
        ))}
      </div>
    ));
  };

  const squareValue = (id) => {
    if (!id) {
      return
    }

    const playerOfSquare = game.players.find((p) => p.id === id);
    // return playerOfSquare.value;
    if (playerOfSquare.value === 'x') {
      return (
        <>
          <div className="cross cross-up"></div>
          <div className="cross cross-down"></div>
        </>
      )
    }
    if (playerOfSquare.value === 'o') {
      return (
        <>
          <div className="circle circle-inner"></div>
          <div className="circle circle-outer"></div>
        </>
      )
    }
  };

  const highlightCurrentPlayer = ({id}) => {
    if (id === game.currentPlayer.id) {
      return ' highlightCurrentPlayer'
    }
    else return '';
  };


  return (
      <div className="board-container">

        <div className="board">
          {renderBoard()}
        </div>

        <div className="score-container">
          <div className="player1 score">
            <div className={`score-id${highlightCurrentPlayer(game.players[0])}`}>{game.players[0].name}: ({game.players[0].value})</div>
            <div className="score-value">{game.players[0].score}</div>
          </div>

          <div className="ties score">
            <div className="score-id">Tie</div>
            <div className="score-value">{game.ties}</div>
          </div>

          <div className="player2 score">
            <div className={`score-id${highlightCurrentPlayer(game.players[1])}`}>{game.players[1].name}: ({game.players[1].value})</div>
            <div className="score-value">{game.players[1].score}</div>
          </div>
        </div>
        {/*<div onClick={game.playAgain}>Play Again!</div>*/}
      </div>
  );
};

export default TicTacBoard;
