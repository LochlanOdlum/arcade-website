import React from "react";
import "../../styling/General/GameButton.css";
import { Link } from "react-router-dom";

const SnakeButton = () => {
  return (
    <>
      <Link className="nostyle" to="/snake">
        <div className="game-button">
          <div className="icon">
            <img
              className="icon"
              src="/images/snake.png"
              alt="snake game"
            />
          </div>

          <div className="text">
            <h2 className="game-button-title">Snake</h2>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SnakeButton;
