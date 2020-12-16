import React, {useState} from 'react';
import {Link} from "react-router-dom";
import ErrorNotif from "../General/ErrorNotif";

const ChessButton = () => {
  const [displayError, setDisplayError] = useState(false);


  const onChessClick = () => {
    if (!displayError) {
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 5000);
    }
  };

  const renderError = () => {
    if (displayError) {
      return <ErrorNotif text="Chess is currently under development!" />;
    }
  };

  return (
    <>
      <Link className="nostyle" to="/">
        <div className="game-button">
          <div className="icon">
            <img onClick={onChessClick} className="icon" src="/images/chess12.png" alt="chess 4 board" />
            {renderError()}
          </div>

          <div className="text">
            <h2 className="game-button-title">Chess</h2>
          </div>
        </div>
      </Link>
    </>
  );
};


export default ChessButton;