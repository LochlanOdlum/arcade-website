import React from 'react';
import '../../styling/TTT/TicTacHeader.css';

const TicTacHeader = () => {

  return (
    <div className="ttt-header">
              <span className="ttt-name">
                <a className="nostyle header-link" href="http://arcade.lochlan.cc">Arcade ||</a>
                <a className="nostyle header-link" href="http://lochlan.cc"> Lochlan.cc</a>
              </span>
    </div>
  );
};

export default TicTacHeader;