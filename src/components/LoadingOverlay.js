import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import GreyBackground from "./GreyBackground";
import '../styling/LoadingOverlay.css'

const LoadingOverlay = ({text}) => {
  return (
    <>
      <GreyBackground />
      <div className="loading-overlay-centre">
        <LoadingSpinner />
        <div className="loading-overlay-text">{text}</div>
      </div>
    </>
  );
};

export default LoadingOverlay;
