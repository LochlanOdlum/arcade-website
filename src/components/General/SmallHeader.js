import React from 'react';
import '../../styling/TTT/TicTacHeader.css';

const SmallHeader = () => {

  return (
    <div className="ttt-header">
              <span className="ttt-name">
                <a className="nostyle header-link" href='/'>Arcade || Lochlan.cc</a>
              </span>
    </div>
  );
};

export default SmallHeader;