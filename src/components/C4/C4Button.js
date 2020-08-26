import React from 'react';
import {Link} from "react-router-dom";

const C4Button = () => {
  return (
    <>
      <Link className="nostyle" to="/connect4">
        <div className="game-button">
          <div className="icon">
            <img className="icon" src="/images/connect4.png" alt="Connect 4" />
          </div>

          <div className="text">
            <h2 className="game-button-title">Connect 4</h2>
          </div>
        </div>
      </Link>
    </>
  );
};


export default C4Button;