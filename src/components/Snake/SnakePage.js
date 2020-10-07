import React from "react";
import SnakeBoard from "./SnakeBoard";
import SmallHeader from "../SmallHeader";
import '../../styling/Snake/SnakePage.css'


const SnakePage = () => {
  return (
    <div className="snake-page">
      <SmallHeader />
      <div className="s-board-container">
        <SnakeBoard />
      </div>
    </div>
  );
};

export default SnakePage;
