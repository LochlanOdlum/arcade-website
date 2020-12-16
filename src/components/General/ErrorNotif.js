import React from "react";
import "../../styling/General/ErrorNotif.css";

const ErrorNotif = ({ text }) => {
  return (
    <div className="error-block">
      <div className="error-content">
        <span className="error-symbol">
          <div className="error-circle" />
          <div className="error-cross error-cross-up" />
          <div className="error-cross error-cross-down" />
        </span>

        <span className="error-text">
          <span className="ohno">Oh no!</span> {text}
        </span>
      </div>
    </div>
  );
};

export default ErrorNotif;
